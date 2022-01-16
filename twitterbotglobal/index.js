module.exports = {
  name: 'twitterbot',
  about: {
    name: 'Twitter Relay',
    value: '[Configurable module that relays tweets directly to Discord](https://github.com/jorgev259/Lotus-Tree-packages/tree/main/twitterbotglobal)'
  },
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
