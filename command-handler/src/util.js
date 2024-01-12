import { PermissionsBitField } from 'discord.js'

const orderCategory = ['user', 'role', 'channel']
const orderType = ['deny', 'allow']

export async function checkGuildConfig (guild, globals) {
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

export const permSort = rows => rows.sort((a, b) =>
  orderCategory.indexOf(a.category) - orderCategory.indexOf(b.category) ||
    orderType.indexOf(a.type) - orderType.indexOf(b.type) ||
    a.createdAt > b.createdAt
)

export const permGet = (sequelize, options) => sequelize.models.perm.findAll(options)

export async function permCheck (command, message, { configFile, sequelize }, overrides = {}) {
  if (command.ownerOnly) return configFile.ownerIds.includes(message.author.id)
  if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return true

  const rows = permSort(await permGet(sequelize, { where: { command: command.name, guild: message.guild.id } }))
  if (rows.length === 0) return true

  const { user = false, role = false, channel = false } = overrides
  for (const row of rows) {
    const { type, category, name } = row
    const match =
          (category === 'user' && (message.author.id === name || user)) ||
          (category === 'role' && (message.member.roles.cache.find(r => r.name === name) || role)) ||
          (category === 'channel' && (message.channel.name === name || channel))

    if (match) return type === 'allow'
  }

  return false
}
