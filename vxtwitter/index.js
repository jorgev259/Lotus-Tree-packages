import getUrls from 'get-urls'

const searchStrings = ['https://twitter.com', 'https://x.com', 'https://t.co']

const vxtwitter = {
  name: 'vxtwitter',
  events: {
    messageCreate ({ client }, msg) {
      if (msg.author.id === client.user.id || msg.author.bot) return

      const urls = Array.from(getUrls(msg.content))
        .filter(url => searchStrings.some(search => url.includes(search)))

      if (urls.length > 0) {
        let content = msg.content
        for (const search of searchStrings) {
          content = content.replaceAll(search, 'https://vxtwitter.com')
        }

        const users = Array.from(msg.mentions.users.keys())
          .filter(snowflake => snowflake !== msg.author.id)

        msg.channel.send({
          content: `${msg.author}: ${content}`,
          allowedMentions: {
            repliedUser: false,
            users
          }
        })
          .then(() => msg.delete())
      }
    }
  }
}

export default vxtwitter
