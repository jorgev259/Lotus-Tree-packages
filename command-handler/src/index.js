import { DataTypes } from 'sequelize'
// import { GatewayIntentBits } from 'discord.js'

import { permCheck } from './util'
import commands from './commands'

const { STRING, BOOLEAN } = DataTypes

async function checkGuild (guild, globals) {
  const { config, defaultConfig, sequelize, commands, modules } = globals

  if (!config[guild]) config[guild] = {}
  if (!config.global) config.global = {}

  for (const [item, value] of Object.entries(defaultConfig.global)) {
    const [row] = await sequelize.models.config.findOrCreate({ where: { guild: 'global', item }, defaults: { value } })
    config.global[item] = row.value
  }

  for (const [item, value] of Object.entries(defaultConfig.guild)) {
    const [row] = await sequelize.models.config.findOrCreate({ where: { guild, item }, defaults: { value } })
    config[guild][item] = row.value
  }

  for (const module of modules.values()) {
    const [{ value }] = await sequelize.models.module.findOrCreate({ where: { guild, module: module.name } })
    module.enabled[guild] = value
  }

  for (const command of commands.values()) {
    const [{ value }] = await sequelize.models.command.findOrCreate({ where: { guild, command: command.name } })
    command.enabled[guild] = value
  }
}

const module = {
  name: 'command-handler',
  config: { guild: { prefix: '>' } },
  intents: ['Guilds', 'GuildMessages', 'MessageContent'],
  commands,
  events: {
    guildCreate: (globals, guild) => checkGuild(guild.id, globals),
    ready: async (globals) => {
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
      guilds.forEach(guild => checkGuild(guild.id, globals))
    },
    messageCreate: async (global, message) => {
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
}

export default module
