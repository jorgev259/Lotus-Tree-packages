import { GatewayIntentBits } from 'discord.js'

import commands from './commands.js'
import events from './events.js'

const module = {
  name: 'command-handler',
  config: { guild: { prefix: '>' } },
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  commands,
  events
}

export default module
