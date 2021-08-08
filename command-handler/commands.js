module.exports = {
  about: {
    desc: 'Info about the bot',
    async execute (global, { message }) {
      message.channel.send({
        embeds: [{
          title: 'About',
          description: 'Powered by [Lotus Tree](https://github.com/jorgev259/Lotus-Tree) (Source code available).\nReport any issues on [this link](https://github.com/jorgev259/Lotus-Tree/issues).\n\n[Add me to your server!](https://discordapp.com/oauth2/authorize?client_id=477560851172294657&scope=bot&permissions=1)',
          color: 16150617,
          thumbnail: {
            url: 'https://pbs.twimg.com/profile_images/1178168868348542976/nGgmZHKv_400x400.jpg'
          },
          fields: [
            {
              name: 'Developed by',
              value: 'ChitoWarlock (Chito#2869) ([Github](https://github.com/jorgev259)) ([Twitter](https://twitter.com/ChitoWarlock))'
            },
            {
              name: 'Throw me a bone! or something',
              value: '[Paypal](https://paypal.me/chitothelickeddorito) or [Ko-Fi](https://Ko-fi.com/E1E8I3VN)'
            }
          ]
        }]
      })
    }
  },

  perms: {
    desc: 'Adds, removes or lists permissions to a command.',
    usage: 'perms [command name] <allow/deny> <@user|roleName|#channel>',
    async execute ({ sequelize, param, commands }, { message }) {
      if (param.length < 4) return message.channel.send('Not enough parameters.')

      const name = param[1].toLowerCase()
      const type = param[2].toLowerCase()
      param = param.slice(3)

      if (!commands.has(name)) return message.channel.send(`\`${name}\` is not a valid command`)

      const { perm } = sequelize.models
      let category; let nameId = ''

      if (message.mentions.users.size > 0) {
        category = 'user'
        nameId = message.mentions.users.first().id
      } else if (message.mentions.channels.size > 0) {
        category = 'channel'
        nameId = message.mentions.channels.first().name
      } else {
        if (!message.guild.roles.cache.some(r => r.name === param.join(' '))) return message.channel.send(`The role \`${param.join(' ')}\` doesnt exist.`)
        category = 'role'
        nameId = param.join(' ')
      }

      await perm.create({ guild: message.guildId, command: name, category, type, name: nameId })
      await message.channel.send('Permissions updated')
    }
  },

  modules: {
    desc: 'Displays all commands and modules available',
    async execute ({ commands, modules }, { message }) {
      const fields = []

      for (const module of modules.values()) {
        const commandList = module.commandNames.map(c => commands.get(c))
        const valueOut = commandList.map(c => `${c.name}${c.enabled[message.guildId] ? '' : ' (disabled)'}`).join('\n')
        fields.push({
          name: `${module.name}${module.enabled[message.guildId] ? '' : ' (disabled)'}`,
          value: valueOut || '\u200B'
        })
      }

      const embed = {
        title: 'Available Commands (per module)',
        color: 4128386,
        fields
      }
      message.channel.send({ embeds: [embed] })
    }
  },

  toggle: {
    usage: 'toggle [module/command] [command name]',
    desc: 'Enables or disables a command/module.',
    async execute ({ client, param, sequelize, commands, modules }, { message }) {
      if (!param[2] || !['module', 'command'].includes(param[1].toLowerCase())) return message.channel.send('Usage: toggle [module/command] [name]')

      const mode = param[1].toLowerCase()
      const id = param[2].toLowerCase()
      const { models } = sequelize

      switch (mode) {
        case 'module': {
          const commandList = Array.form(commands.values()).filter(c => c.moduleName === id)
          if (commandList.length === 0) return message.channel.send(`${id} is not a valid module name`)

          const module = modules.get(id)
          await models.module.update({ value: !module.enabled[message.guildId] }, { where: { module: id, guild: message.guildId } })
          module.enabled[message.guildId] = !module.enabled[message.guildId]

          await message.channel.send(`The module '${id}' has been ${module.enabled[message.guildId] ? 'enabled' : 'disabled'}.`)
          break
        }

        case 'command': {
          if (!commands.has(id)) return message.channel.send(`${id} is not a valid command name.`)
          const command = commands.get(id)
          const module = modules.get(command.moduleName)

          await models.command.update({ value: !command.enabled[message.guildId] }, { where: { command: id, guild: message.guildId } })
          command.enabled[message.guildId] = !command.enabled[message.guildId]

          await message.channel.send(`The module '${id}' has been ${command.enabled[message.guildId] ? 'enabled' : 'disabled'}.${command.enabled[message.guildId] && !module.enabled[message.guildId] ? `\nEnable the module '${module.name}' to use this command.` : ''}`)
          break
        }
      }
    }
  },

  config: {
    usage: 'config [option] [value]',
    desc: 'Changes a bot configuration.',
    async execute ({ param, sequelize, config }, { message }) {
      const item = param[1].toLowerCase()
      const keys = (await sequelize.models.config.findAll({ attributes: ['item'], group: 'item' })).map(c => c.item)

      if (!keys.includes(item)) return message.channel.send(`'${item}' is not a valid option. Options: ${keys.join(', ')}`)
      const data = param.slice(2).join(' ')

      await sequelize.models.config.update({ value: data }, { where: { guild: message.guildId, item } })
      config[message.guildId][item] = data
      await message.channel.send('Settings updated')
    }
  }
}
