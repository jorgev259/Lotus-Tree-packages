const mcutil = require('minecraft-server-util')

let lastResult = { online: -1, max: -1, server: false }

function shallowEqual (object1, object2) {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)
  if (keys1.length !== keys2.length) {
    return false
  }
  for (const key of keys1) {
    if (object1[key] !== object2[key]) {
      return false
    }
  }
  return true
}

function compareStatus (check, channel, address, port, topic) {
  if (!shallowEqual(check, lastResult)) {
    channel.edit({ topic })
      .then(() => { lastResult = check })
      .finally(() =>
        setTimeout(checkStatus, 15 * 1000, channel, address, port)
      )
  }
}

function checkStatus (channel, address, port) {
  mcutil.status(address, port)
    .then(result => {
      const { players } = result
      const { online, max } = players
      const check = { online, max, server: true }

      compareStatus(check, channel, address, port, `Server status: :green_circle: // Players: ${online}/${max}`)
    })
    .catch(() => {
      const check = { server: false }
      compareStatus(check, channel, address, port, 'Server status: :red_circle:')
    })
}

module.exports = {
  name: 'mc-status',
  events: {
    async ready ({ client, configFile }) {
      const guilds = await client.guilds.fetch()
      const guild = await guilds.first().fetch()
      const channels = await guild.channels.fetch()
      const { mcstatus } = configFile
      const channel = channels.get(configFile.mcstatus.channel)

      checkStatus(channel, mcstatus.address, mcstatus.port)
    }
  }
}
