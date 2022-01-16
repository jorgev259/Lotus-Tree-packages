module.exports = {
  name: 'evangeline',
  about: {
    name: 'Evangeline',
    value: '[Custom bot for cool peeps](https://github.com/jorgev259/Lotus-Tree-packages/tree/main/evangeline)'
  },
  events: {
    async messageCreate (globals, message) {
      if (!message.channel.name.includes('confirm-age')) return
      // if (message.member.roles.cache.size > 0) return

      const numString = message.content.trim().split(' ')[0]
      if (isNaN(numString)) return

      const num = parseInt(numString)
      const roles = await message.guild.roles.fetch()
      const role = roles.find(r => r.name.toLowerCase().includes('unverified'))

      if ((num >= 1 && num <= 6) || (num >= 13 && num <= 15)) message.member.kick('Failed age verification')
      else if (num >= 7 && num <= 12) message.member.ban({ reason: 'Failed age verification' })
      else if (num >= 16) message.member.roles.add(role)

      message.delete()
    },

    async guildMemberUpdate (globals, before, after) {
      const roles = await after.guild.roles.fetch()
      const channels = await after.guild.channels.fetch()

      const role = roles.find(r => r.name.toLowerCase().includes('cherubs'))
      const channel = channels.find(c => c.name.toLowerCase().includes('chatting'))
      const unverified = roles.find(r => r.name.toLowerCase().includes('unverified'))

      if (!before.roles.cache.has(role.id) && after.roles.cache.has(role.id)) {
        after.roles.remove(unverified, 'Verification')
        channel.send(`Welcome to The Garden of Eden, ${after} I hope you enjoy your stay~!`)
      }
    }
  }
}
