const { DataTypes } = require('sequelize')
const { STRING, BOOLEAN } = DataTypes
const { permCheck } = require('./util')

async function checkGuild (guild, globals) {
  if (!globals.config[guild]) globals.config[guild] = {}
  if (!globals.config.global) globals.config.global = {}

  for (const [item, value] of Object.entries(globals.defaultConfig.global)) {
    const [row] = await globals.sequelize.models.config.findOrCreate({ where: { guild: 'global', item }, defaults: { value } })
    globals.config.global[item] = row.value
  }

  for (const [item, value] of Object.entries(globals.defaultConfig.guild)) {
    const [row] = await globals.equelize.models.config.findOrCreate({ where: { guild, item }, defaults: { value } })
    globals.config[guild][item] = row.value
  }

  for (const module of globals.modules.values()) {
    const [{ value }] = await globals.sequelize.models.module.findOrCreate({ where: { guild, module: module.name } })
    module.enabled[guild] = value
  }

  for (const command of globals.commands.values()) {
    const [{ value }] = await globals.sequelize.models.command.findOrCreate({ where: { guild, command: command.name } })
    command.enabled[guild] = value
  }
}

module.exports = {
  name: 'command-handler',
  config: { guild: { prefix: '>' } },
  commands: require('./commands'),
  events: {
    async guildCreate (globals, guild) {
      await checkGuild(guild.id, globals)
    },
    async ready (globals) {
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
    async messageCreate (global, message) {
      const { client, commands, modules, config } = global
      if (message.author.id === client.user.id || !message.member) return

      const guildId = message.guildId
      const { prefix } = config[guildId]

      if (message.content.startsWith(prefix)) {
        const param = message.content.split(' ')
        const commandName = param[0].toLowerCase().substring(1)

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
