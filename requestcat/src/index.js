import commands from './commands.js'
import events from './events.js'

const requestCat = {
  name: 'requestcat',
  localConfig: { guildId: '', port: 7000 },
  commands,
  events
}

export default requestCat
