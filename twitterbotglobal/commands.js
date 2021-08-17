const { updateConfig, postTweet } = require('./util')
const path = require('path')

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = {
  setapproval: {
    desc: 'Sets the approval channel to mentioned channel or current one',
    usage: 'setapproval <#channel>',
    ownerOnly: true,
    async execute ({ sequelize, config }, { message }) {
      let channel = message.channel
      if (message.mentions.channels.size > 0) channel = message.mentions.channels.first()

      await updateConfig(sequelize, config, 'global', 'approvalGuild', channel.guild.id)
      await updateConfig(sequelize, config, 'global', 'approvalChannel', channel.id)

      message.channel.send(`${channel} set as approval channel`)
    }
  },
  settweetchannel: {
    desc: 'Sets the tweets channel to mentioned channel or current one',
    usage: 'settweetchannel <#channel>',
    async execute ({ sequelize, config }, { message }) {
      let channel = message.channel
      if (message.mentions.channels.size > 0) channel = message.mentions.channels.first()

      await updateConfig(sequelize, config, message.guild.id, 'tweetChannel', channel.id)

      message.channel.send(`${channel} set as tweets channel`)
    }
  },
  broadcast: {
    desc: 'Sends a message to all servers',
    ownerOnly: true,
    async execute ({ client, sequelize, config, param }, { message }) {
      if (param.length === 1 && message.attachments.size === 0) return message.channel.send('Can\'t send empty message')
      const msg = {}

      if (param.length > 1) msg.content = param.slice(1).join(' ')
      if (message.attachments.size > 0) msg.files = message.attachments.map(a => a)

      postTweet(client, sequelize, config, msg)
    }
  },
  testtweet: {
    desc: 'Sends a test message to all servers',
    ownerOnly: true,
    async execute ({ client, sequelize, config }, { message }) {
      postTweet(client, sequelize, config, { content: 'Dont mind us, this is a test broadcast', files: [path.join(__dirname, `img/${getRandomInt(1, 4)}.mp4`)] })
    }
  }
}
