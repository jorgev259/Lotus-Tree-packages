import { DataTypes } from 'sequelize'
import { Events } from 'discord.js'

import { checkGuildConfig, permCheck } from './util.js'

const { STRING, BOOLEAN } = DataTypes

const events = {
  [Events.GuildCreate]: (globals, guild) => checkGuildConfig(guild.id, globals),
  [Events.ClientReady]: async (globals) => {
    const { client, sequelize } = globals
    sequelize.define('config', {
      guild: { type: STRING, unique: 'index' },
      item: { type: STRING, unique: 'index' },
      value: { type: STRING }
    })

    sequelize.define('module', {
      guild: { type: STRING, unique: 'index' },
      module: { type: STRING, unique: 'index' },
      value: { type: BOOLEAN, defaultValue: true }
    })

    sequelize.define('command', {
      guild: { type: STRING, unique: 'index' },
      command: { type: STRING, unique: 'index' },
      value: { type: BOOLEAN, defaultValue: true }
    })

    sequelize.define('perm', {
      guild: STRING,
      command: STRING,
      category: STRING,
      type: STRING,
      name: STRING
    })

    await sequelize.sync()

    const guilds = await client.guilds.fetch()
    guilds.forEach(guild => checkGuildConfig(guild.id, globals))
  },
  [Events.MessageCreate]: async (global, message) => {
    const { client, commands, modules, config } = global
    if (message.author.id === client.user.id || !message.member) return

    const guildId = message.guildId
    const { prefix } = config[guildId]

    if (message.content.startsWith(prefix)) {
      const param = message.content.split(' ')
      const commandName = param[0].toLowerCase().substring(prefix.length)

      if (!commands.has(commandName)) return
      const command = commands.get(commandName)
      const module = modules.get(command.moduleName)

      if (module.enabled[guildId] && command.enabled[guildId] && await permCheck(command, message, global)) {
        command.execute({ ...global, param }, { message })
      }
    }
  }
}

export default events
