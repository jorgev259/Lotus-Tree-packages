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

          msg.channel.send({
            content: `${msg.author}: ${content}`,
            allowedMentions: {users: []}
          })
            .then(() => msg.delete())
        }
    }
  }
}
