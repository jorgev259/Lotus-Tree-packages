import { Op, fn, col, where } from 'sequelize'
import getUrls from 'get-urls'
import getVGMDB from '@sittingonclouds/vgmdb-parser'

import { holdRequest, completeRequest, rejectRequest, getPendingCount, checkLockChannel, catchErr } from './util.js'

const commands = {
  pending: {
    desc: 'Shows how many pending requests you have.',
    async execute (globals, { message: msg }) {
      const { localConfig, sequelize } = globals
      const { socdb } = localConfig

      const requests = await socdb.models.request.findAll({
        attributes: ['state', [sequelize.fn('COUNT', '*'), 'count']],
        where: { userID: msg.author.id },
        group: 'state'
      })

      const count = { pending: 0, complete: 0, hold: 0 }
      requests.forEach(row => { count[row.state] = row.count })

      msg.reply(`Pending: ${count.pending}\nOn Hold: ${count.hold}\nCompleted: ${count.complete}`)
    }
  },

  hold: {
    desc: 'Marks a request as ON HOLD.',
    usage: 'hold [id] [reason]',
    async execute (globals, { message: msg }) {
      const { param, localConfig } = globals
      const { socdb, guild } = localConfig

      if (!param[2]) return msg.reply('Incomplete command.')

      const request = await socdb.models.request.findByPk(param[1])
      if (!request) return msg.reply('Request not found')
      if (request.state === 'hold') return msg.reply('Request already on hold')

      const reason = param.slice(2).join(' ')
      await holdRequest(socdb, guild, request, reason)
    }
  },

  request: {
    desc: 'Request a soundtrack',
    usage: 'request [url or name]',
    async execute (globals, { message: msg }) {
      const { param, localConfig } = globals
      const { socdb } = localConfig

      if (!param[1]) return msg.channel.send('Please provide a url or name')

      const donator = msg.member.roles.cache.some(r => r.name === 'Donators')
      const owner = msg.member.roles.cache.some(r => r.name === 'Owner')

      const talkChannel = msg.guild.channels.cache.find(c => c.name === 'request-talk')
      if (!(donator || owner)) {
        const pending = await socdb.models.request.findOne({ where: { userID: msg.author.id, state: 'pending' } })
        if (pending) return talkChannel.send(`The request '${pending.title} ${pending.url ? `(${pending.url})` : ''}' is still on place. Wait until its fulfilled or rejected ${msg.author}`)

        const countPending = await getPendingCount(socdb)
        if (countPending >= 20) {
          await msg.channel.send('There are too many open requests right now. Wait until slots are opened.')
          await checkLockChannel(socdb, msg.guild)

          return
        }
      }

      if(donator){
        const pending = await socdb.models.request.count({ where: { userID: msg.author.id, state: 'pending' } })
        if (pending >= 5) return talkChannel.send(`You already reached your pending request limit. Wait until one fulfilled, rejected or put On Hold ${msg.author}`)
      }

      let title = param.slice(1).join(' ')

      const urls = Array.from(getUrls(title, { normalizeProtocol: false, stripWWW: false, removeTrailingSlash: false, sortQueryParameters: false }))
      if (urls.length > 1) return msg.channel.send('You can only specify one url per request.')

      const link = urls[0]

      if (link) {
        const checkUrl = await socdb.models.request.findOne({ where: { link } })
        if (checkUrl) return talkChannel.send(`This soundtrack has already been requested: ${link}`)

        title = title.replace(link, '')
        if (link.includes('vgmdb.net')) {
          const info = await getVGMDB(link)
          if (info?.title) title = info.title
        }
      }

      const request = { title: title.trim(), link, userID: msg.author.id, donator, state: 'pending' }

      await socdb.models.request.create(request)
      .then(() => checkLockChannel(socdb, msg.guild))
      .catch(err => catchErr(msg.guild, err))

      await msg.reply('Request submitted')
    }
  },

  complete: {
    desc: 'Marks a request as completed.',
    usage: 'complete [id]',
    async execute (globals, { message: msg }) {
      const { param, localConfig } = globals
      const { socdb, guild } = localConfig

      if (!param[1]) return msg.reply('Incomplete command.')

      const request = await socdb.models.request.findByPk(param[1])
      if (!request) return msg.reply('Request not found')
      if (request.state === 'complete') return msg.reply('Request already complete')

      await completeRequest(socdb, guild, request)
    }
  },

  reject: {
    desc: 'Marks a request as rejected',
    usage: 'reject [id] [reason]',
    async execute (globals, { message: msg }) {
      const { param, localConfig } = globals
      const { socdb, guild } = localConfig

      if (!param[2]) return msg.reply('Incomplete command.')

      const request = await socdb.models.request.findByPk(param[1])
      if (!request) return msg.reply('Request not found')

      const reason = param.slice(2).join(' ')

      await rejectRequest(socdb, guild, request, reason)
    }
  },

  check: {
    desc: 'Checks for existing requests',
    usage: 'check [url or title]',
    async execute (globals, { message: msg }) {
      const { param, localConfig } = globals
      const { socdb } = localConfig

      if (!param[1]) return msg.reply('Incomplete command.')

      function sendRequests (list) {
        try {
          const output = `Found requests: \`\`\`${list.map(r => `• ${r.title ? `${r.title} - ` : ''}${r.link ? `${r.link} - ` : ''}${r.state} - ${r.user || 'Unknown User'}`).join('\n')}\`\`\``
          if (output.length >= 2000) {
            const outputError = msg.author.id === '350059361789280277' ? 'Bitch :bingus:' : 'Result list was too big, be more specific or use the Requests section in the website'
            return msg.reply(outputError)
          } else {
            return msg.reply(output)
          }
        } catch (err) {
          msg.reply('Something went wrong')
        }
      }

      const urlSearch = param[1]

      const album = await socdb.models.album.findOne({ where: { vgmdb: urlSearch } })
      if (album) return await msg.reply(`https://sittingonclouds.net/album/${album.id}`)

      const request = await socdb.models.request.findOne({ where: { link: urlSearch } })
      if (request) return await sendRequests([request])

      const titleSearch = param.slice(1).join(' ').toLowerCase()
      const requests = await socdb.models.request.findAll({ where: where(fn('LOWER', col('title')), { [Op.like]: `%${titleSearch}%` }) })
      if (requests.length > 0) await sendRequests(requests)
      else await msg.reply('No requests found')
    }
  }
}

export default commands