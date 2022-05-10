// const moment = require('moment')
const { get } = require('axios')
const getUrls = require('get-urls')
const { GoogleSpreadsheet } = require('google-spreadsheet')

const doc = new GoogleSpreadsheet('1D7X2YXffGGeLUKM9D_Q0lypuKisDuXsb3Yyj-cySiHQ')
const pages = { requests: 0, donators: 1, hold: 2 }

const getPage = name => doc.sheetsByIndex[pages[name]]
const getRows = name => getPage(name).getRows()

async function getMaxId (doc) {
  const requestRows = (await getRows('requests')).map(e => e.ID)
  const donators = (await getRows('donators')).map(e => e.ID)
  const hold = (await getPage('hold').getRows()).map(e => e.ID)

  return Math.max(...[...requestRows, ...donators, ...hold])
}

async function checkPerms (msg, configFile) {
  if (getPage('requests').rowCount >= configFile.requestcat.count) {
    await msg.guild.channels.cache.find(c => c.name === 'requests-submission')
      .edit({
        data: {
          permissionOverwrites: [{ id: msg.guild.roles.cache.find(r => r.name === 'Members'), deny: 'SEND_MESSAGES' }]
        }
      })
  }
}

async function getAllRows () {
  const requestRows = await getRows('requests')
  const holdRows = (await getRows('hold')).map(r => {
    r.hold = true
    return r
  })
  const donatorRows = (await getRows('donators')).map(r => {
    r.donator = true
    return r
  })

  return [...requestRows, ...donatorRows, ...holdRows].sort((a, b) => a.ID - b.ID)
}

async function getId (id) {
  const rows = await getAllRows()
  return rows.find(r => r.ID === id)
}

module.exports = {
  refresh: {
    desc: 'Reposts all open requests.',
    usage: 'refresh',
    async execute ({ client, configFile, sequelize }, { message }) {
      doc.useServiceAccountAuth(configFile.requestcat.google)
      await doc.loadInfo()

      const rows = await getAllRows()
      runId(rows)

      function runId (ids) {
        if (!ids[0]) return
        const row = ids[0]

        const info = {
          request: row.Request,
          user: row['User ID'],
          id: row.ID,
          oldMessage: row.Message,
          hold: row.hold,
          donator: row.donator
        }

        if (row.Link) {
          const filterUrls = row.Link.split(' ').filter(e => e.includes('vgmdb.net'))
          if (filterUrls.length > 0) info.vgmdb = filterUrls[0].replace('vgmdb.net', 'vgmdb.info').replace('(', '').replace(')', '')
        }

        sendEmbed(message, sequelize, info, row)
          .then(() => {
            ids.shift()
            runId(ids)
          })
      }
    }
  },

  pending: {
    desc: 'Shows how many pending requests you have.',
    async execute ({ sequelize, configFile }, { message: msg }) {
      doc.useServiceAccountAuth(configFile.requestcat.google)
      await doc.loadInfo()

      const filterFn = r => r['User ID'] === msg.author.id
      const requests = (await getRows('requests')).filter(filterFn).length
      const donators = (await getRows('donators')).filter(filterFn).length
      const hold = (await getRows('hold')).filter(filterFn).length

      msg.reply(`Pending: ${requests + donators}\nOn Hold: ${hold}`)
    }
  },

  /* hold: {
    desc: 'Marks a request as ON HOLD.',
    usage: 'hold [id] [reason]',
    async execute (client, msg, param, sequelize) {
      if (!param[2]) return msg.channel.send('Incomplete command.')

      const req = (await getId(client, param[1]))[0]
      if (!req) return msg.channel.send('Request not found.')

      const reason = param.slice(2).join(' ')

      const info = {
        request: req.Request,
        user: req['User ID'],
        hold: true,
        id: req.ID,
        msg: req.Message,
        url: req.Link
      }

      editEmbed(msg, sequelize, info)
        .then(async m => {
          const talkChannel = msg.guild.channels.cache.find(c => c.name === 'requests-talk')
          msg.guild.channels.cache.find(c => c.name === 'requests-log').send(`Request: ${info.request}\nBy: <@${info.user}>\nState: ON HOLD by ${msg.author}\nReason: ${reason}`)

          talkChannel.send(`The request ${info.request}${info.url ? ` (${info.url})` : ''} from <@${info.user}> has put ON HOLD.\nReason: ${reason}`)

          doc.useServiceAccountAuth(configFile.requestcat.google)
          await doc.loadInfo()
          const sheetHold = doc.sheetsByIndex[2]
          const sheetRequests = doc.sheetsByIndex[0]

          let userTag = ''
          msg.guild.members.fetch(info.user).then(member => {
            userTag = member.user.tag
          }).finally(async () => {
            sheetHold.addRow([info.id, info.request, userTag, info.user, req.Link, m.id])

            const rows = await sheetRequests.getRows()
            const row = rows.find(e => e.ID === info.id.toString())
            await row.delete()
          })
        })
        .catch(err => catchErr(msg, err))
    }
  }, */

  request: {
    desc: 'Request a soundtrack',
    usage: 'request [url or name]',
    async execute ({ param, configFile, sequelize }, { message: msg }) {
      if (!param[1]) return msg.channel.send('Please provide a url or name')

      doc.useServiceAccountAuth(configFile.requestcat.google)
      await doc.loadInfo()

      const donator = msg.member.roles.cache.some(r => r.name === 'Donators')
      const owner = msg.member.roles.cache.some(r => r.name === 'Owner')

      const talkChannel = msg.guild.channels.cache.find(c => c.name === 'requests-talk')
      if (!(donator || owner)) {
        const rows = await getRows('requests')
        const reqs = rows.filter(e => e['User ID'] === msg.author.id)

        if (reqs.length > 0) return talkChannel.send(`The request '${reqs[0].Request} ${reqs[0].Link ? `(${reqs[0].Link})` : ''}' is still on place. Wait until its fulfilled or rejected.`)
        if (getPage('requests').rowCount >= configFile.requestcat.count) {
          checkPerms(msg, configFile)
          return msg.channel.send('There are too many open requests right now. Wait until slots are opened.')
        }
      }
      let request = param.slice(1).join(' ')

      const urls = Array.from(getUrls(request, { normalizeProtocol: false, stripWWW: false, removeTrailingSlash: false, sortQueryParameters: false }))
      if (urls.length > 1) return msg.channel.send('You can only specify one url per request.')

      const url = urls[0]

      if (urls.length > 0) {
        // const row = await sequelize.models.vgmdb.findByPk(url)
        // if (row) return talkChannel.send(`This soundtrack has already been requested (${url})`)

        request = request.replace(url, '')
      }

      const info = { id: await getMaxId(doc) + 1, request: request.trim(), url, user: msg.author.id, donator }

      if (url && url.includes('vgmdb.net')) info.vgmdb = url

      sendEmbed(msg, sequelize, info)
        .then(async m => {
          msg.channel.send('Request submitted.')

          const page = donator ? getPage('donators') : getPage('requests')
          await page.addRow([info.id, info.request, msg.author.tag, info.user, info.url, m.id])

          checkPerms(msg, configFile)
        })
        .catch(err => catchErr(msg, err))
    }
  },

  /* complete: {
    desc: 'Marks a request as completed.',
    usage: 'complete [id]',
    async execute (client, msg, param, sequelize) {
      if (!param[1]) return msg.channel.send('Incomplete command.')

      const req = (await getId(client, param[1], true))[0]
      if (!req) return msg.channel.send('Request not found.')

      await sequelize.models.request.create({
        user: req['User ID'],
        request: `${req.Request}${req.Link ? ` (${req.Link})` : ''}`,
        valid: true
      })

      const sheetRequests = doc.sheetsByIndex[0]
      const rows = await sheetRequests.getRows()
      rows.find(e => e.ID === req.ID.toString()).delete()

      msg.guild.channels.cache.find(c => c.name === 'open-requests').messages.fetch(req.Message).then(async m => {
        await m.delete()
        msg.guild.channels.cache.find(c => c.name === 'requests-log').send(`Request: ${req.Request}\nBy: <@${req.User}>\nState: Completed by ${msg.author}`)
        msg.guild.channels.cache.find(c => c.name === 'last-added-soundtracks').send(`<@${req.User}`).then(m2 => m2.delete())
        const dm = await msg.guild.members.fetch(req.User)
        dm.send(`Your request '${req.Request}' has been uploaded!`).catch(e => {
          msg.guild.channels.cache.find(c => c.name === 'last-added-soundtracks').send(`<@${req.User}>`).then(m2 => m2.delete())
        })

        doc.useServiceAccountAuth(configFile.requestcat.google)
        await doc.loadInfo()
        const sheetComplete = doc.sheetsByIndex[2]

        sheetComplete.addRow([param[1], req.name || req.Request, (await msg.guild.members.fetch(req.User)).user.tag, req.User, req.vgmdb || '', moment().format('D/M/YYYY')])

        if (req.donator === 'NO') {
          const sheetRequests = doc.sheetsByIndex[0]
          const rows = await sheetRequests.getRows()
          rows.find(e => e.ID === param[1].toString()).delete()
        }
      })
    }
  }, */

  reject: {
    desc: 'Marks a request as rejected',
    usage: 'reject [id] [reason]',
    async execute ({ client, param, sequelize, configFile }, { message: msg }) {
      if (!param[2]) return msg.channel.send('Incomplete command.')

      doc.useServiceAccountAuth(configFile.requestcat.google)
      await doc.loadInfo()

      const req = await getId(param[1])
      if (!req) return msg.channel.send('Request not found.')

      const reason = param.slice(2).join(' ')

      /* sequelize.models.request.create({ user: req.User, request: req.Request, valid: false })
      if (req.Link && req.Link.includes('vgmdb.net')) {
        sequelize.models.vgmdb.destroy({ where: { url: req.Link } })
      } */

      const messageId = req.Message
      await req.delete()

      const m = await msg.guild.channels.cache.find(c => c.name === 'open-requests').messages.fetch(messageId)
      await m.delete()

      msg.guild.channels.cache.find(c => c.name === 'requests-log').send(`Request: ${req.Request}\nBy: <@${req.User}>\nState: Rejected by ${msg.author}\nReason: ${reason}`)
      const talkChannel = msg.guild.channels.cache.find(c => c.name === 'requests-talk')
      talkChannel.send(`The request ${req.Request} from <@${req.User}> has been rejected.\nReason: ${reason}`)
    }
  }
}

function handleOldMessage (msg, oldMessage) {
  return new Promise(resolve => {
    if (!oldMessage) resolve()
    msg.guild.channels.cache.find(c => c.name === 'open-requests')
      .messages.fetch(oldMessage)
      .then(oldMessage => oldMessage.delete())
      .then(resolve)
      .catch(resolve)
  })
}

function handleVGMDB (info, sequelize) {
  return new Promise(resolve => {
    get(info.vgmdb.replace('vgmdb.net', 'vgmdb.info'))
      .then(({ data }) => {
        info.image = { url: data.picture_small }
        const vgmdbUrl = `https://vgmdb.net/${data.link}`
        info.request = data.name
        info.url = vgmdbUrl

        resolve(info)

        // sequelize.models.vgmdb.findOrCreate({ where: { url: vgmdbUrl } })
      })
      .catch(() => resolve(info))
  })
}

async function sendEmbed (msg, sequelize, info, row) {
  await handleOldMessage(msg, info.oldMessage)
  if (info.vgmdb) info = await handleVGMDB(info, sequelize)

  const embed = {
    fields: [
      {
        name: 'Request',
        value: `${info.request}${info.url ? ` (${info.url})` : ''}${info.hold ? ' **(ON HOLD)**' : ''}`
      },
      {
        name: 'Requested by',
        value: `<@${info.user}> / ${info.user}`,
        inline: true
      },
      {
        name: 'ID',
        value: info.id?.toString() || 'NOT FOUND',
        inline: true
      }
    ],
    color: info.donator ? 0xedcd40 : (info.hold ? 0xc20404 : 0x42bfed),
    image: info.image
  }

  const sent = await msg.guild.channels.cache.find(c => c.name === 'open-requests').send({ embeds: [embed] })
  if (row) {
    row.Message = sent.id
    await row.save()
  }

  return sent
}

/* function handleVGMDBImage (url, embed) {
  return new Promise(resolve => {
    get(url.replace('vgmdb.net', 'vgmdb.info'))
      .then(({ data }) => {
        embed.image = { url: data.picture_small }
      })
      .finally(() => resolve(embed))
  })
}

 async function editEmbed (msg, sequelize, info) {
  let embed = {
    fields: [
      {
        name: 'Request',
        value: `${info.request}${info.url ? ` (${info.url})` : ''}${info.hold ? ' **(ON HOLD)**' : ''}`
      },
      {
        name: 'Requested by',
        value: `<@${info.user}> / ${info.user}`,
        inline: true
      },
      {
        name: 'ID',
        value: info.id && info.length > 0 ? info.id : 'NOT FOUND',
        inline: true
      }
    ],
    color: info.donator ? 0xedcd40 : (info.hold ? 0xc20404 : 0x42bfed)
  }

  if (info.url && info.url.includes('vgmdb.net')) embed = await handleVGMDBImage(info.url, embed)

  const m = await msg.guild.channels.cache.find(c => c.name === 'open-requests').messages.fetch(info.msg)
  await m.edit({ embed })
  return m
} */

function catchErr (msg, err) {
  console.log(err)
  msg.channel.send('Something went wrong.')
}
