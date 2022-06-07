// const moment = require('moment')
import { Op } from 'sequelize'
import { get } from 'axios'
import getUrls from 'get-urls'

async function setLockChannel (msg, value) {
  await msg.guild.channels.cache.find(c => c.name === 'request-submission')
    .permissionOverwrites.edit(msg.guild.roles.cache.find(r => r.name === 'Members'), { SEND_MESSAGES: value })
}

const getPendingCount = socdb => socdb.models.request.count({ where: { state: 'pending', donator: false } })

module.exports = {
  refresh: {
    desc: 'Reposts all open requests.',
    usage: 'refresh',
    async execute ({ socdb }, { message }) {
      const requests = await socdb.models.request.findAll({ where: { state: { [Op.not]: 'complete' } } })
      let request = requests.shift()

      while (request) {
        if (!request) return

        await sendEmbed(message, request)
        request = requests.shift()
      }
    }
  },

  pending: {
    desc: 'Shows how many pending requests you have.',
    async execute ({ sequelize, configFile, socdb }, { message: msg }) {
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
    async execute ({ param, socdb }, { message: msg }) {
      if (!param[2]) return msg.reply('Incomplete command.')

      const request = await socdb.models.request.findByPk(param[1])
      if (!request) return msg.reply('Request not found')
      if (request.state === 'hold') return msg.reply('Request already on hold')

      socdb.transaction(async transaction => {
        const talkChannel = msg.guild.channels.cache.find(c => c.name === 'requests-talk')

        request.reason = param.slice(2).join(' ')
        await request.save()
        await talkChannel.send(`"${request.title}${request.link ? ` (${request.link})` : ''}" has been put ON HOLD.\nReason: ${request.reason} <@${request.userID}>`)

        if (request.message) await editEmbed(msg, request)
      })
        .then(async () => {
          try {
            const member = await msg.guild.members.fetch(request.userID)
            const donator = member.roles.cache.some(r => r.name === 'Donators')

            if (donator) return

            const countPending = await getPendingCount(socdb)
            if (countPending < 20) {
              msg.guild.channels.cache.find(c => c.name === 'request-submission').send('Requests open')
              setLockChannel(msg, true)
            }
          } catch (err) {
            catchErr(msg, err)
          }
        })
        .catch(err => {
          catchErr(msg, err)
        })
    }
  },

  request: {
    desc: 'Request a soundtrack',
    usage: 'request [url or name]',
    async execute ({ param, socdb }, { message: msg }) {
      if (!param[1]) return msg.channel.send('Please provide a url or name')

      const donator = msg.member.roles.cache.some(r => r.name === 'Donators')
      const owner = msg.member.roles.cache.some(r => r.name === 'Owner')

      const talkChannel = msg.guild.channels.cache.find(c => c.name === 'requests-talk')
      if (!(donator || owner)) {
        const pending = await socdb.models.request.findOne({ where: { userID: msg.author.id, state: 'pending' } })
        if (pending) return talkChannel.send(`The request '${pending.title} ${pending.url ? `(${pending.url})` : ''}' is still on place. Wait until its fulfilled or rejected ${msg.author}`)

        const countPending = await getPendingCount(socdb)
        if (countPending >= 20) {
          await setLockChannel(msg, false)
          return msg.channel.send('There are too many open requests right now. Wait until slots are opened.')
        }
      }

      let title = param.slice(1).join(' ')

      const urls = Array.from(getUrls(title, { normalizeProtocol: false, stripWWW: false, removeTrailingSlash: false, sortQueryParameters: false }))
      if (urls.length > 1) return msg.channel.send('You can only specify one url per request.')

      const link = urls[0]

      if (urls.length > 0) {
        const checkUrl = await socdb.models.request.findOne({ where: { link } })
        if (checkUrl) return talkChannel.send(`This soundtrack has already been requested: ${link}`)

        title = title.replace(link, '')
        if (link.includes('vgmdb.net')) {
          const info = await getVGMDB(link)
          if (info) title = info.name
        }
      }

      const request = { title: title.trim(), link, user: msg.author.tag, userID: msg.author.id, donator, state: 'pending' }

      socdb.transaction(async transaction => {
        const row = await socdb.models.request.create(request, { transaction })
        await sendEmbed(msg, row)
        msg.reply('Request submitted')
      })
        .then(async () => {
          if (donator) return

          const countPending = await getPendingCount(socdb)
          if (countPending >= 20) {
            msg.guild.channels.cache.find(c => c.name === 'request-submission').send('Requests closed')
            setLockChannel(msg, false)
          }
        })
        .catch(err => {
          catchErr(msg, err)
        })
    }
  },

  complete: {
    desc: 'Marks a request as completed.',
    usage: 'complete [id]',
    async execute ({ param, socdb }, { message: msg }) {
      if (!param[1]) return msg.reply('Incomplete command.')

      const request = await socdb.models.request.findByPk(param[1])
      if (!request) return msg.reply('Request not found')
      if (request.state === 'complete') return msg.reply('Request already complete')

      socdb.transaction(async transaction => {
        const reqMsg = await msg.guild.channels.cache.find(c => c.name === 'open-requests').messages.fetch(request.message)
        await reqMsg.delete()

        request.state = 'complete'
        await request.save()
      })
        .then(async () => {
          try {
            const member = await msg.guild.members.fetch(request.userID)
            const donator = member.roles.cache.some(r => r.name === 'Donators')

            if (donator) return

            const countPending = await getPendingCount(socdb)
            if (countPending < 20) {
              msg.guild.channels.cache.find(c => c.name === 'request-submission').send('Requests open')
              setLockChannel(msg, true)
            }
          } catch (err) {
            catchErr(msg, err)
          }
        })
        .catch(err => {
          catchErr(msg, err)
        })
    }
  },

  reject: {
    desc: 'Marks a request as rejected',
    usage: 'reject [id] [reason]',
    async execute ({ param, socdb }, { message: msg }) {
      if (!param[2]) return msg.reply('Incomplete command.')

      const request = await socdb.models.request.findByPk(param[1])
      if (!request) return msg.reply('Request not found')

      const reason = param.slice(2).join(' ')

      socdb.transaction(async transaction => {
        const reqMsg = await msg.guild.channels.cache.find(c => c.name === 'open-requests').messages.fetch(request.message)
        await reqMsg.delete()

        request.state = 'complete'
        await request.save()
      })
        .then(async () => {
          const talkChannel = msg.guild.channels.cache.find(c => c.name === 'requests-talk')
          talkChannel.send(`The request ${request.title || request.link} from <@${request.userID}> has been rejected.\nReason: ${reason}`)

          try {
            const member = await msg.guild.members.fetch(request.userID)
            const donator = member.roles.cache.some(r => r.name === 'Donators')

            if (donator) return

            const countPending = await getPendingCount(socdb)
            if (countPending < 20) {
              msg.guild.channels.cache.find(c => c.name === 'request-submission').send('Requests open')
              setLockChannel(msg, true)
            }
          } catch (err) {
            catchErr(msg, err)
          }
        })
        .catch(err => {
          catchErr(msg, err)
        })
    }
  }
}

async function getVGMDB (link) {
  const url = new URL(link)
  const id = url.pathname.split('/').slice(-1)

  try {
    const response = await get(
    `https://api.nemoralni.site/albums/${id}`,
    { headers: { 'x-api-key': 'i-m-a-pig-i-don-t-fight-for-honor-i-fight-for-a-paycheck' } })
    return response.data
  } catch {}
}

const isValidUrl = s => {
  try {
    const testUrl = new URL(s)
    return !!testUrl
  } catch (err) {
    return false
  }
}

async function getCover (link) {
  const data = await getVGMDB(link)
  if (!data) return

  const cover = data.album_cover

  if (isValidUrl(cover)) return { url: cover }
}

async function getEmbed (request) {
  let image
  const isHold = request.state === 'hold'

  if (request.link?.includes('vgmdb.net')) image = await getCover(request.link)

  return {
    fields: [
      {
        name: 'Request',
        value: `${request.title}${request.link ? ` (${request.link})` : ''}${isHold ? ' **(ON HOLD)**' : ''}`
      },
      {
        name: 'Requested by',
        value: `<@${request.userID}> / ${request.userID}`,
        inline: true
      },
      {
        name: 'ID',
        value: request.id.toString(),
        inline: true
      }
    ],
    color: request.donator ? 0xedcd40 : (isHold ? 0xc20404 : 0x42bfed),
    image
  }
}

async function sendEmbed (msg, request) {
  const embed = await getEmbed(request)

  const sent = await msg.guild.channels.cache.find(c => c.name === 'open-requests').send({ embeds: [embed] })
  request.message = sent.id
  await request.save()
}

async function editEmbed (msg, request) {
  const embed = await getEmbed(request)

  const m = await msg.guild.channels.cache.find(c => c.name === 'open-requests').messages.fetch(request.message)
  await m.edit({ embed })
}

function catchErr (msg, err) {
  console.log(err)
  msg.channel.send('Something went wrong.')
}
