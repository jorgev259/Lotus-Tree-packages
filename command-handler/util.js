const orderCategory = ['user', 'role', 'channel']
const orderType = ['deny', 'allow']

module.exports = {
  async permCheck (command, message, { config, sequelize }) {
    if (command.ownerOnly) return config.ownerIds.includes(message.author.id)

    const rows = (await sequelize.models.perm.findAll({ where: { command: command.name } }))
      .sort((a, b) =>
        orderCategory.indexOf(a.category) - orderCategory.indexOf(b.category) ||
            orderType.indexOf(a.type) - orderType.indexOf(b.type) ||
            a.createdAt > b.createdAt
      )

    if (rows.length === 0) return true

    for (const row of rows) {
      const { type, category, name } = row
      const match =
            (category === 'user' && message.author.id === name) ||
            (category === 'role' && message.member.roles.cache.find(r => r.name === name)) ||
            (category === 'channel' && message.channel.id === name)

      if (match) return type === 'allow'
    }

    return false
  }
}
