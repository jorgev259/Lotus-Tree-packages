const getUrls = require('get-urls')

module.exports = {
  name: 'fxtwitter',
  events: {
    messageCreate ({ client }, msg) {
      if (msg.author.id === client.user.id || msg.author.bot) return

      const urls = Array.from(getUrls(msg.content)).filter(url => url.includes('twitter.com') && url.includes('/status/') && !url.includes('vxtwitter.com'))      
      if (urls.length > 0) {
        let newMsg = `${msg.author.tag}: ${msg.content.replaceAll('twitter.com','vxtwitter.com')}`
        msg.channel.send(newMsg).then(() => msg.delete())
      }
    }
  }
}
