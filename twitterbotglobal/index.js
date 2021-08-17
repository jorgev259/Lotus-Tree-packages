module.exports = {
  name: 'twitterbot',
  config: {
    global: {
      approvalChannelName: 'tweet-approval',
      tweetChannelName: 'tweets',

      approvalChannel: '0',
      approvalGuild: '0'
    },
    guild: {
      tweetChannel: '0'
    }
  },

  events: require('./events'),
  commands: require('./commands')
}
