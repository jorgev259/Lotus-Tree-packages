const { DataTypes } = require('sequelize')
const { STRING, BOOLEAN } = DataTypes
const { permCheck } = require('./util')

async function checkGuild (guild, sequelize, modules, commands, config) {
  if (!config[guild]) config[guild] = {}

  for (const module of modules.values()) {
    const [{ value }] = await sequelize.models.module.findOrCreate({ where: { guild, module: module.name } })
    module.enabled[guild] = value

    for (const [item, value] of Object.entries(module.config)) {
      const [row] = await sequelize.models.config.findOrCreate({ where: { guild, item }, defaults: { value } })
      config[guild][item] = row.value
    }
  }

  for (const command of commands.values()) {
    const [{ value }] = await sequelize.models.command.findOrCreate({ where: { guild, command: command.name } })
    command.enabled[guild] = value
  }
}

module.exports = {
  config: { prefix: '>' },
  commands: require('./commands'),
  events: {
    async guildCreate ({ sequelize, modules, commands, config }, guild) {
      await checkGuild(guild.id, sequelize, modules, commands, config)
    },
    async ready ({ client, sequelize, commands, modules, config }) {
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
      guilds.forEach(guild => checkGuild(guild.id, sequelize, modules, commands, config))
    },
    async messageCreate (global, message) {
      if (!message.member) return

      const { commands, modules, config } = global
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
