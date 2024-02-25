import getUrls from 'get-urls'
import { GatewayIntentBits } from 'discord.js'

const twitterRegex = /https:\/\/twitter.com|https:\/\/x.com|https:\/\/t.co/
const VXString = 'https://vxtwitter.com'

async function isVXNeeded (rawUrl) {
  if (!rawUrl.match(twitterRegex)) return { url: rawUrl, include: false }

  const vxLink = rawUrl.replace(twitterRegex, VXString)
  const vxApiLink = vxLink.replace(VXString, 'https://api.vxtwitter.com')

  const vxResponse = await fetch(vxApiLink)
  const vxInfo = await vxResponse.json()

  if (vxInfo.qrtURL) return { url: rawUrl, include: true }
  if (vxInfo.media_extended?.length === 0) return { url: rawUrl, include: true }
  if (vxInfo.media_extended?.length > 1) return { url: rawUrl, include: true }
  if (vxInfo.media_extended?.length === 1) {
    const media = vxInfo.media_extended[0]
    if (media.type !== 'image') return { url: rawUrl, include: true }
  }

  return { url: rawUrl, include: false }
}

const vxtwitter = {
  name: 'vxtwitter',
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
  events: {
    async messageCreate ({ client }, msg) {
      if (msg.author.id === client.user.id || msg.author.bot) return

      const allUrls = Array.from(getUrls(msg.content))
      const matchingUrls = (await Promise.all(allUrls.map(isVXNeeded)))
        .filter(res => res.include).map(res => res.url)

      if (matchingUrls.length > 0) {
        let content = msg.content

        for (const rawUrl of matchingUrls) {
          const vxUrl = rawUrl.replace(twitterRegex, VXString)
          content = content.replace(rawUrl, vxUrl)
        }

        const users = Array.from(msg.mentions.members.keys())
        const messageOptions = { content: `${msg.author}: ${content}`, allowedMentions: { users } }

        async function sendReply () {
          const channel = await client.channels.fetch(msg.reference.channelId)
          const parentMessage = await channel.messages.fetch(msg.reference.messageId)

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
