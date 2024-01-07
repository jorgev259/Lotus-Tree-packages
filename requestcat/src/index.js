import Sequelize, { DataTypes } from 'sequelize'
import commands from './commands.js'
import { Events } from 'discord.js'

const requestCat = {
  name: 'requestcat',
  commands,
  events: {
    [Events.ClientReady]: async (globals) => {
      const { lotusConfig, client } = globals
      const { sequelize: config } = lotusConfig
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
        const guild = await client.guilds.fetch('496366337036255242')
        await guild.channels.fetch()
      } catch (err) {}
    }
  }
}

export default requestCat
