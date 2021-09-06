const Traceroute = require('nodejs-traceroute')
const speedTest = require('speedtest-net')

module.exports = {
  traceroute: {
    usage: 'trace [url or ip]',
    desc: 'Performs a traceroute',
    example: 'trace 127.0.0.1',
    async execute ({ param }, { message }) {
      if (!param[1]) return message.channel.send('Please provide a url or ip')

      let content = 'Starting'
      const sent = await message.channel.send(content, { code: true })

      function info (info) {
        content += `\n${info}`
        sent.edit(content, { code: true })
      }

      try {
        const tracer = new Traceroute()

        tracer
          .on('pid', pid => info(`pid: ${pid}`))
          .on('destination', destination => info(`destination: ${destination}`))
          .on('hop', hop => info(`${hop.hop}) ${hop.hostname ? `${hop.hostname} (${hop.ip})` : hop.ip} ${hop.rtt1 ? hop.rtt1 : ''}`))
          .on('close', code => info(`close: code ${code}`))

        tracer.trace(param[1])
      } catch (ex) {
        console.log(ex)
      }
    }
  },

  speedtest: {
    desc: 'Performs a speedtest',
    execute ({ param }, { message }) {
      const options = { acceptLicense: true, acceptGdpr: true }

      speedTest(options)
        .then(result => {
          const data = result
          delete data.interface
          message.channel.send(JSON.stringify(data, null, 4), { code: true })
        })
        .catch(err => {
          console.log(err)
          message.channel.send('Something went wrong!')
        })
    }
  }
}
