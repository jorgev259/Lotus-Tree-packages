const Twitter = require('twitter')
const getUrls = require('get-urls')
const promiseAll = require('promise-all-forgiving')

let clientTwitter

const allowedTypes = ['video', 'animated_gif']

async function evalMsg (urls, msg) {
  let tweets = await promiseAll(urls.map(url => getTweet(url)))
  tweets = tweets.filter(res => res && res.tweet.extended_entities && res.tweet.extended_entities.media.some(m => allowedTypes.includes(m.type)))

  if (tweets.length === 0) return

  let newMsg = `${msg.author.tag}: ${msg.content}`
  tweets.forEach(({ tweet, replace }) => {
    newMsg = newMsg.replace(replace, `https://fxtwitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`)
  })

  msg.channel.send(newMsg).then(() => msg.delete())
}

function getTweet (url) {
  return new Promise((resolve, reject) => {
    clientTwitter.get('statuses/show', { id: url.pathname.split('/').pop(), include_entities: true })
      .then(tweet => resolve({ tweet, replace: url.href }))
      .catch(err => reject(err.message))
  })
}

module.exports = {
  name: 'fxtwitter',
  events: {
    ready ({ configFile }) {
      clientTwitter = new Twitter(configFile.twitter)
    },
    messageCreate ({ client }, msg) {
      if (msg.author.id === client.user.id || msg.author.bot) return

      const urls = Array.from(getUrls(msg.content)).filter(url => url.includes('twitter.com') && url.includes('/status/') && !url.includes('fxtwitter.com'))
      if (urls.length > 0) evalMsg(urls.map(urlString => new URL(urlString)), msg)
    }
  }
}
