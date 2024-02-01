import { Events } from 'discord.js'
import { Sequelize, DataTypes } from 'sequelize'
import express from 'express'
import bodyParser from 'body-parser'

import { checkLockChannel, completeRequest, holdRequest, rejectRequest } from './util.js'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

async function startDb (config, localConfig) {
  config.database = 'soc'

  localConfig.requestcat.socdb = new Sequelize(config)
  localConfig.requestcat.socdb.define('request', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    user: DataTypes.STRING,
    userID: DataTypes.STRING,
    state: { type: DataTypes.STRING, allowNull: false },
    donator: { type: DataTypes.BOOLEAN, allowNull: false },
    reason: DataTypes.STRING,
    comments: DataTypes.STRING,
    message: DataTypes.STRING
  })
  localConfig.requestcat.socdb.define('album', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vgmdb: DataTypes.STRING
  })

  await localConfig.requestcat.socdb.authenticate()
}

function startAPI (localConfig) {
  const { port, guild, socdb } = localConfig

  app.get('/health', (req, res) => res.sendStatus(200))
  app.post('/check', async (req, res) => {
    try {
      await checkLockChannel(socdb, guild)
      res.sendStatus(200)
    } catch (err) {
      console.error(err.message, err)
      res.sendStatus(500)
    }
  })
  app.post('/complete', async (req, res) => {
    try {
      const { body = {} } = req
      const { requestId } = body
      const request = await socdb.models.request.findByPk(requestId)

      if (!request) return res.status(500).send({ error: 'Request not found' })
      await completeRequest(socdb, guild, request)

      res.sendStatus(200)
    } catch (err) {
      console.error(err.message, err)
      res.sendStatus(500)
    }
  })
  app.post('/hold', async (req, res) => {
    try {
      const { body = {} } = req
      const { requestId, reason } = body
      const request = await socdb.models.request.findByPk(requestId)

      if (!request) return res.status(500).send({ error: 'Request not found' })
      await holdRequest(socdb, guild, request, reason)

      res.sendStatus(200)
    } catch (err) {
      console.error(err.message, err)
      res.sendStatus(500)
    }
  })
  app.post('/reject', async (req, res) => {
    try {
      const { body = {} } = req
      const { requestId, reason } = body
      const request = await socdb.models.request.findByPk(requestId)

      if (!request) return res.status(500).send({ error: 'Request not found' })
      await rejectRequest(socdb, guild, request, reason)

      res.sendStatus(200)
    } catch (err) {
      console.error(err.message, err)
      res.sendStatus(500)
    }
  })

  const listener = app.listen(port, '127.0.0.1', () => {
    console.log(`Request API listening on port ${listener.address().port}`)
  })
}

const events = {
  [Events.ClientReady]: async (globals) => {
    const { lotusConfig, client, localConfig } = globals
    const { sequelize: config } = lotusConfig
    const { guildId } = localConfig.requestcat

    await startDb(config, localConfig)

    localConfig.requestcat.guild = await client.guilds.fetch(guildId)
    localConfig.requestcat.guild.channels.fetch()

    startAPI(localConfig.requestcat)
  }
}

export default events
