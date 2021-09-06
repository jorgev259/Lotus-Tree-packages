const SauceNAO = require('saucenao')
const getUrls = require('get-urls')

let mySauce

function handleFetch (msg, url, score) {
  mySauce(url).then(response => {
    const results = response.json.results.filter(e => parseFloat(e.header.similarity) >= score).sort((a, b) => a - b)
    if (results.length) {
      msg.channel.send(`Found source: ${results.map(e =>
          e.data.pixiv_id
            ? `<https://www.pixiv.net/en/artworks/${e.data.pixiv_id}>`
            : e.data.ext_urls.map(url => `<${url}>`).join(' - ')
        ).join(' - ')
      }`)
    }
  }, error => {
    console.error('Request encountered an error')
    console.dir(error.request || error)
  })
}

module.exports = {
  async guildCreate ({ sequelize, config }, guild) {
    config[guild.id].saucenao = new Set()
  },
  async ready ({ sequelize, config, client }) {
    const guilds = await client.guilds.fetch()
    guilds.forEach(guild => {
      if (!config[guild.id]) config[guild.id] = { saucenao: new Set() }
      else if (!config[guild.id].saucenao) config[guild.id].saucenao = new Set()
    })

    sequelize.models.saucenao.findAll()
      .then(rows => {
        rows.forEach(({ guild, channel }) => {
          if (!config[guild]) config[guild] = { saucenao: new Set() }
          else if (!config[guild].saucenao) config[guild].saucenao = new Set()

          config[guild].saucenao.add(channel)
        })
      })
  },
  async messageCreate ({ config, client, configFile }, message) {
    if (!mySauce) mySauce = new SauceNAO(configFile.saucenao)

    if (!config[message.guild.id].saucenao.has(message.channel.id) || message.author.bot) return
    const saucescore = parseInt(config[message.guild.id].saucescore)
    if (message.attachments.size > 0) message.attachments.forEach(attach => handleFetch(message, attach.url, saucescore))

    const urls = getUrls(message.content)
    if (urls.size > 0) for (const url of urls) handleFetch(message, url, saucescore)
  }
}
