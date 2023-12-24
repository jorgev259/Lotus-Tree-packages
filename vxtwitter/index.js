const getUrls = require('get-urls')
const searchStrings = ['https://twitter.com', 'https://x.com', 'https://t.co']

module.exports = {
  name: 'fxtwitter',
  events: {
    messageCreate ({ client }, msg) {
      if (msg.author.id === client.user.id || msg.author.bot) return

      const urls = Array.from(getUrls(msg.content))
        .filter(url => searchStrings.some(search => url.includes(search)))      
      
        if (urls.length > 0) {
          let content  = msg.content
          for (search of searchStrings){
            content = content.replaceAll(search, 'https://vxtwitter.com')
          }

          const mentions = msg.mentions.users.keys()
            .filter(snowflake => snowflake !== msg.author.id)

          msg.channel.send({
            content: `${msg.author}: ${content}`,
            allowedMentions: {
              repliedUser: false,
              users: mentions
            }
          })
            .then(() => msg.delete())
        }
    }
  }
}
