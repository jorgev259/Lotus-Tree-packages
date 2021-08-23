const Twitter = require('twitter-lite')
const path = require('path')
const fs = require('fs-extra')
const puppeteer = require('puppeteer')
const _ = require('lodash')
const { MessageAttachment } = require('discord.js')
const { DataTypes } = require('sequelize')
const PromiseQueue = require('easy-promise-queue').default
const pq = new PromiseQueue({ concurrency: 1 })

const { updateConfig, postTweet } = require('./util')

let browser
let twitterClient

const isTweet = _.conforms({
  id_str: _.isString,
  text: _.isString
})

async function checkGuild (sequelize, config, partialGuild) {
  const guild = await partialGuild.fetch()
  const channels = await guild.channels.fetch()
  let channel = channels.get(config[guild.id].tweetChannel)

  if (!channel) {
    channel = await guild.channels.create(config.global.tweetChannelName)
    updateConfig(sequelize, config, guild.id, 'tweetChannel', channel.id)
  }
}

async function evalTweet (client, sequelize, config, tweet, item) {
  const url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}/`
  console.log(`Evaluating ${url}`)

  let { type } = item
  if (tweet.in_reply_to_status_id) type = 'approval'
  const [row, created] = await sequelize.models.globalTweet
    .findOrCreate({ where: { account: tweet.user.screen_name }, defaults: { tweet: tweet.id_str, timestamp: tweet.timestamp_ms } })

  if (!created && row.timestamp < tweet.timestamp_ms) {
    row.tweet = tweet.id_str
    row.timestamp = tweet.timestamp_ms
    await row.save()
  }

  const shotBuffer = await screenshotTweet(client, tweet.id_str, type === 'approval')
  switch (type) {
    case 'approval': {
      const file = new MessageAttachment(shotBuffer, ' imageTweet.png')
      const embed = {
        author: { name: `${tweet.user.name} | ${tweet.user.screen_name}`, icon_url: tweet.user.profile_image_url },
        color: tweet.user.profile_background_color,
        timestamp: new Date(),
        fields: [{ name: 'URL', value: url }],
        image: {
          url: 'attachment://imageTweet.png'
        }
      }

      const guild = await client.guilds.fetch(config.global.approvalGuild)
      const channels = await guild.channels.fetch()

      channels.get(config.global.approvalChannel)
        .send({ embeds: [embed], files: [file] }).then(m =>
          m.react('✅').then(() => m.react('❎'))
        )
      break
    }

    case 'auto': {
      const msg = { content: `<${url}>`, files: [shotBuffer] }

      postTweet(client, sequelize, config, msg)
      break
    }
  }
}

function screenshotTweet (client, id, usePath) {
  return new Promise((resolve, reject) => {
    if (!browser) {
      puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] }).then(newBrowser => {
        browser = newBrowser
        evalPage()
      })
    } else evalPage()

    async function evalPage () {
      const page = await browser.newPage()
      await page.setViewport({ width: 1000, height: 600, deviceScaleFactor: 5 })

      await page.goto(path.join('file://', __dirname, `index.html?id=${id}`))
      /* .catch(err => {
        // log(client, path.join('file://', __dirname, `index.html?id=${id}`))
        // log(client, err.stack)
      }) */

      await page.waitForFunction('window.status === "ready"')
      const rect = await page.evaluate(() => {
        const element = document.querySelector('#container')
        const { x, y, width, height } = element.getBoundingClientRect()
        return { left: x, top: y, width, height, id: element.id }
      })
      const screenOptions = {
        clip: {
          x: rect.left,
          quality: 85,
          y: rect.top,
          width: 550,
          height: rect.height
        }
      }

      fs.ensureDirSync('temp')
      if (usePath) screenOptions.path = `temp/${id}.png`

      const buffer = await page.screenshot(screenOptions)
      await page.close()
      resolve(buffer)
    }
  })
}

module.exports = {
  async guildCreate ({ sequelize, config }, guild) {
    checkGuild(sequelize, config, guild)
      .catch(err => console.log(`Failed to check guild ${guild.id}: ${err}`))
  },
  async messageReactionAdd ({ client, sequelize, config }, reaction, user) {
    if (user.bot) return
    const embed = reaction.message.embeds[0]

    switch (reaction.emoji.name) {
      case '✅': {
        postTweet(client, sequelize, config, { content: `<${embed.fields[0].value}>`, files: [embed.image.url] })
        reaction.message.delete()
        break
      }

      case '❎': {
        reaction.message.delete()
        break
      }
    }
  },

  async ready ({ client, configFile, config, sequelize }) {
    sequelize.define('globalTweet', {
      account: {
        primaryKey: true,
        type: DataTypes.STRING
      },
      tweet: DataTypes.STRING,
      timestamp: DataTypes.BIGINT
    })

    await sequelize.sync()

    twitterClient = new Twitter(configFile.twitter)
    const { accounts: accountConfig } = configFile.twitterbot

    const accounts = await Promise.all(
      accountConfig.map(async acc => {
        try {
          const item = await twitterClient.get('users/show', { screen_name: acc.name })
          acc.id = item.id_str
          return item
        } catch (err) {
          console.log(err)
          return {}
        }
      })
    )
    const accountList = accounts.map(acc => acc.id_str)

    const globalTweets = await sequelize.models.globalTweet.findAll()

    await Promise.all(globalTweets.map(async acc => {
      try {
        const tweets = await twitterClient.get('statuses/user_timeline', { screen_name: acc.account, since_id: acc.tweet, tweet_mode: 'extended' })
        tweets.forEach(event => {
          if (accountList.includes(event.user.id_str)) {
            const info = accountConfig.find(acc => event.user.id_str === acc.id)

            pq.add(() => evalTweet(client, sequelize, config, event, info))
          }
        })
      } catch (err) {
        console.log(err)
      }
    }))

    startStream()

    async function checkApproval () {
      const guilds = await client.guilds.fetch()

      if (!guilds.has(config.global.approvalGuild)) {
        await updateConfig(sequelize, config, 'global', 'approvalGuild', guilds.first().id)
      }

      const partialGuild = guilds.get(config.global.approvalGuild)
      const guild = await partialGuild.fetch()
      const channels = await guild.channels.fetch()
      let channel = channels.get(config.global.approvalChannel)

      if (!channel) {
        channel = await guild.channels.create(config.global.approvalChannelName)
        await updateConfig(sequelize, config, 'global', 'approvalChannel', channel.id)
      }

      await channel.messages.fetch()
    }

    async function startStream () {
      if (!config.global) return setTimeout(startStream, 5 * 1000)
      await checkApproval()
        .catch(err => console.log(`Failed to check approval channel: ${err}`))

      const guilds = await client.guilds.fetch()
      guilds.forEach(guild => {
        checkGuild(sequelize, config, guild)
          .catch(err => console.log(`Failed to check guild ${guild.id}: ${err}`))
      })

      console.log('Starting twitter stream')

      const stream = twitterClient.stream('statuses/filter', { follow: accounts.map(a => a.id_str).join(',') })

      stream.on('start', () => console.log('Started twitter stream'))
      stream.on('data', async function (event) {
        if (isTweet(event) && accountList.includes(event.user.id_str)) {
          const info = accountConfig.find(acc => event.user.id_str === acc.id)

          pq.add(() => evalTweet(client, sequelize, config, event, info))
        }
      })

      stream.on('error', function (error) {
        throw error
      })
    }
  }
}
