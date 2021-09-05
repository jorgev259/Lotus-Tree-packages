module.exports = {
  enablesauce: {
    desc: 'Enables saucebot on the current channel',
    async execute ({ sequelize, config }, { message }) {
      const guild = message.guild.id
      const channel = message.guild.id

      if (config[guild].saucenao.has(channel)) return message.channel.send('Saucenao already enabled on this channel')

      await sequelize.models.saucenao.findOrCreate({ where: { guild: message.guild.id, channel: message.channel.id } })
      config[guild].saucenao.add(channel)
      message.channel.send('Saucenao enabled on this channel')
    }
  },
  disablesauce: {
    desc: 'Disables saucebot on the current channel',
    async execute ({ sequelize, config }, { message }) {
      const guild = message.guild.id
      const channel = message.guild.id

      if (!config[guild].saucenao.has(channel)) return message.channel.send('Saucenao not enabled on this channel')

      await sequelize.models.saucenao.destroy({ where: { guild: message.guild.id, channel: message.channel.id } })
      config[guild].saucenao.delete(channel)
      message.channel.send('Saucenao disabled from this channel')
    }
  }
}
