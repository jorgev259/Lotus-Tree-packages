import getUrls from 'get-urls'
import { GatewayIntentBits } from 'discord.js'

const searchStrings = ['https://twitter.com', 'https://x.com', 'https://t.co']

const vxtwitter = {
  name: 'vxtwitter',
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
  events: {
    async messageCreate ({ client }, msg) {
      if (msg.author.id === client.user.id || msg.author.bot) return

      const urls = Array.from(getUrls(msg.content))
        .filter(url => searchStrings.some(search => url.includes(search)))

      if (urls.length > 0) {
        let content = msg.content
        for (const search of searchStrings) {
          content = content.replaceAll(search, 'https://vxtwitter.com')
        }

        const users = Array.from(msg.mentions.members.keys())
        const messageOptions = { content: `${msg.author}: ${content}`, allowedMentions: { users } }

        async function sendReply () {
          const channel = await client.channels.fetch(msg.reference.channelId)
          const parentMessage = await channel.messages.fetch(msg.reference.channelId)

          await parentMessage.reply(messageOptions)
          msg.delete().catch(() => {})
        }

        async function sendMessage () {
          await msg.channel.send(messageOptions)
          msg.delete().catch(() => {})
        }

        if (msg.reference?.messageId) {
          sendReply()
            .catch(() => sendMessage())
        } else {
          sendMessage()
        }
      }
    }
  }
}

export default vxtwitter
