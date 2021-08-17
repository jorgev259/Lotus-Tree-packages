module.exports = {
  async updateConfig (sequelize, config, guild, item, value) {
    const row = await sequelize.models.config.findOne({ where: { guild, item } })
    row.value = value
    await row.save()

    config[guild][item] = value
  },
  async postTweet (client, sequelize, config, msg) {
    const guilds = await client.guilds.fetch()
    guilds.forEach(async partialGuild => {
      const guild = await partialGuild.fetch()
      const channels = await guild.channels.fetch()
      const channel = channels.get(config[guild.id].tweetChannel)

      if (channel) channel.send(msg).catch(err => console.log(`Failed to send message to ${guild.id} - ${config[guild.id].tweetChannel}: ${err}`))
    })
  }
}
