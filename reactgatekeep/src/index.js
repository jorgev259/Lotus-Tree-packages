import { Events, GatewayIntentBits, Partials } from 'discord.js'

const module = {
  name: 'reactgatekeep',
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],

  config: {
    guild: {
      gatekeeprole: '',
      gatekeepreaction: '',
      gatekeepchannel: '',
      gatekeepwelcomechannel: '',
      gatekeepannouce: true
    }
  },

  events: {
    [Events.MessageReactionAdd]: async (globals, reaction, user) => {
      if (reaction.partial) {
        // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
        try {
          await reaction.fetch()
        } catch (error) {
          console.error('Something went wrong when fetching the message:', error)
          // Return as `message.author` may be undefined/null
          return
        }
      }

      const { config } = globals
      const { message } = reaction
      const { gatekeeprole, gatekeepreaction, gatekeepannouce, gatekeepchannel, gatekeepwelcomechannel } = config[message.guildId]

      if (message.channel.name !== gatekeepchannel || reaction.emoji.name !== gatekeepreaction) return

      const guild = await message.guild.fetch()
      const member = await guild.members.fetch(user.id)

      const roles = await guild.roles.fetch()
      const role = roles.find(r => r.name === gatekeeprole)

      const channels = await guild.channels.fetch()
      const channel = channels.find(c => c.name.toLowerCase() === gatekeepwelcomechannel)

      if (member.roles.cache.has(role.id)) return member.timeout(5 * 60 * 1000, 'Blame Levita')

      member.roles.add(role)
      reaction.remove()

      if (gatekeepannouce) channel.send(`Thanks for reading the rules! Welcome, ${member} I hope you enjoy your stay~!`)
    }
  }
}

export default module
