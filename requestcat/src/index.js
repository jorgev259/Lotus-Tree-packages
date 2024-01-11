import Sequelize, { DataTypes } from 'sequelize'
import commands from './commands.js'
import { Events } from 'discord.js'

const name = 'requestcat'

const requestCat = {
  name,
  localConfig: { guild: '' },
  commands,
  events: {
    [Events.ClientReady]: async (globals) => {
      const { lotusConfig, client, localConfig } = globals
      const { sequelize: config } = lotusConfig
      const { guild: guildId } = localConfig[name]
      config.database = 'soc'

      globals.socdb = new Sequelize(config)
      globals.socdb.define('request', {
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

      try {
        const guild = await client.guilds.fetch(guildId)
        await guild.channels.fetch()
      } catch (err) {}
    }
  }
}

export default requestCat
