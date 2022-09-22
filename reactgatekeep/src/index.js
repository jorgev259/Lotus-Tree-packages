
const module = {
  name: 'reactgatekeep',
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],

  config: {
    guild: {
      gatekeeprole: '',
      gatekeepreaction: '',
      gatekeepannouce: true
    }
  },

  events: {
    async messageReactionAdd (globals, reaction, user) {
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
      const { gatekeeprole, gatekeepreaction, gatekeepannouce } = config[message.guildId]

      if (message.channel.name !== 'rules' || reaction.emoji.name !== gatekeepreaction) return

      const guild = await message.guild.fetch()
      const member = await guild.members.fetch(user.id)

      const roles = await guild.roles.fetch()
      const role = roles.find(r => r.name === gatekeeprole)

      const channels = await guild.channels.fetch()
      const channel = channels.find(c => c.name.toLowerCase() === 'general')

      member.roles.add(role)
      reaction.remove()

      if (gatekeepannouce) channel.send(`Welcome, ${member} I hope you enjoy your stay~!`)
    }
  }
}

export default module
