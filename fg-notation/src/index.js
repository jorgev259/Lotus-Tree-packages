import sharp from 'sharp'
import path from 'path'
import glob from 'glob'
import { DataTypes } from 'sequelize'
import bent from 'bent'
import axios from 'axios'
import { GatewayIntentBits, Partials } from 'discord.js'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { sizes, aliases, builtin } = JSON.parse(fs.readFileSync(path.join(__dirname, 'info.json')))

const getJSON = bent('json')
const imgPath = path.join(__dirname, 'img')
const basicInputs = new Map()
const gameInputs = new Map()

let glossary = {}
let terms = []
const grabs = glob.sync(path.join(imgPath, 'grabs/**.png'))

getGlossary()
setInterval(getGlossary, 5 * 60 * 1000)

async function getGlossary () {
  const result = await getJSON('https://glossary.infil.net/json/glossary.json')
  const tempG = {}
  const tempT = []

  result.forEach(i => {
    const term = i.term.toLowerCase()
    tempG[term] = i
    tempT.push(term)
  })

  glossary = tempG
  terms = tempT
}

glob.sync(path.join(imgPath, 'basic/**'), { nodir: true })
  .forEach(p => {
    const input = p.split('/').pop().replace('.png', '')
    basicInputs.set(input, p)

    const alias = aliases.inputs.basic[input]
    if (alias) {
      alias.forEach(i => {
        basicInputs.set(i, p)
        if (sizes[input]) sizes[i] = sizes[input]
      })
    }
  })

glob.sync(path.join(imgPath, 'games/*'))
  .forEach(p => {
    const { base } = path.parse(path.relative(path.join(imgPath, 'games'), p))
    gameInputs.set(base, new Map())

    glob.sync(path.join(imgPath, 'games', base, '**'), { nodir: true })
      .forEach(input => {
        const { name } = path.parse(input)
        gameInputs.get(base).set(name, input)
      })

    const alias = aliases.inputs.games[base]

    if (alias) {
      for (const [a, s] of Object.entries(alias)) {
        gameInputs.get(base).set(a, s)
      }
    }
  })

function solveInput (inputs, input) {
  if (inputs.has(input)) return isString(inputs.get(input)) ? [input] : inputs.get(input)

  for (let i = 0; i < input.length; i++) {
    const s1 = input.slice(0, 0 - i)

    if (inputs.has(s1)) {
      const result = inputs.get(s1)
      const remaining = solveInput(inputs, input.slice(0 - i))

      return isString(result) ? [s1, ...remaining] : [...result, ...remaining]
    }
  }

  throw new Error(`Cannot find "${input}" as a recognizable input`)
}

async function sendInput (inputs, result, message, caption) {
  const width = result.map(it => sizes[it] || 152).reduce((a, b) => a + b, 0)
  const images = []
  let left = 0

  result.forEach((it, index) => {
    const size = sizes[it] || 152
    images.push({ input: inputs.get(it), left, top: Math.floor((152 - size) / 2) })
    left += size
  })

  let canvas = sharp({ create: { width, height: 152, channels: 4, background: 'transparent' } })
    .png()
    .composite(images)

  canvas = await canvas.toBuffer()

  if (result.length < 12) canvas = await sharp(canvas).resize({ height: 55 }).png().toBuffer()

  return message.reply({ content: caption, files: [canvas] })
}

function checkGame (game) {
  return gameInputs.has(game) ? game : aliases.games[game]
}

function isString (x) {
  return Object.prototype.toString.call(x) === '[object String]'
}

const fgnotation = {
  name: 'fg-notation',
  about: {
    name: 'FG Notation',
    value: '[Instructions and source code](https://lotus.chitowarlock.com/fgnotation)\n[Infil\'s Fighting Game Glossary](https://glossary.infil.net)\n[MagicianStuff\'s Fighthing Game notations emotes](https://twitter.com/MagicianStuff/status/1477931054484893697)'
  },
  intents: [GatewayIntentBits.GuildMembers],
  partials: [Partials.Message],

  preload: sequelize => {
    sequelize.define('fginput', {
      guild: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      createdBy: DataTypes.STRING,
      game: DataTypes.STRING,
      caption: DataTypes.STRING,
      input: DataTypes.STRING
    })
  },

  events: {
    async messageCreate (global, message) {
      const { client, config, sequelize } = global
      if (message.author.id === client.user.id || !message.member) return

      const guildId = message.guildId
      const { prefix } = config[guildId]

      if (message.content.startsWith(prefix)) {
        const name = message.content.split(' ').pop().replace(prefix, '')
        const row = builtin[name] || (
          await sequelize.models.fginput.findOne({
            where: { guild: message.guild.id, name }
          })
        )

        if (row) {
          const inputs = new Map([...basicInputs, ...gameInputs.get(row.game)])
          sendInput(inputs, row.input.split(' '), message, row.caption)
        }
      }
    }
  },

  commands: {
    fgi: {
      usage: 'fgi [game] [inputs]',
      desc: 'Converts a list of inputs into an image',
      example: 'fgi sf 236P 214K',
      execute: async ({ param }, { message }) => {
        const [, gameInput, i1] = param
        if (!gameInput || !i1) return message.reply('Missing arguments. Example: >fgi sf 236P 214K')

        const game = checkGame(gameInput)
        if (!gameInputs.has(game)) return message.reply(`"${game}" is not a valid game. Available games: ${Array.from(gameInputs.keys()).join(' ')}`)

        try {
          const inputs = new Map([...basicInputs, ...gameInputs.get(game)])
          const result = param.slice(2).map(i => solveInput(inputs, i.toLowerCase())).flat()

          sendInput(inputs, result, message)
        } catch (err) {
          message.reply(err.message)
        }
      }
    },
    fgsave: {
      usage: 'fgsave [game] [name] [inputs]',
      desc: 'Saves a list of inputs into a command',
      example: 'fgi sf testName 236P 214K',
      execute: async ({ param, sequelize }, { message }) => {
        const [, gameInput, name, i1] = param
        if (!gameInput || !name || !i1) return message.reply('Missing arguments. Example: >fgi sf testName 236P 214K')

        const game = checkGame(gameInput)
        if (!gameInputs.has(game)) return message.reply(`"${game}" is not a valid game. Available games: ${Array.from(gameInputs.keys()).join(' ')}`)

        try {
          const inputs = new Map([...basicInputs, ...gameInputs.get(game)])
          const input = param.slice(3).map(i => solveInput(inputs, i.toLowerCase())).flat().join(' ')

          await sequelize.models.fginput.create({ guild: message.guild.id, name, createdBy: message.author.id, game, input })

          message.channel.send(`Saved command "${input}" as "${name}"`)
        } catch (err) {
          message.reply(err.message)
        }
      }
    },
    fgcaption: {
      usage: 'fgcaption [name] [caption]',
      desc: 'Adds a caption to a saved input command',
      example: 'fgcaption testName This is a caption',
      execute: async ({ param, sequelize }, { message }) => {
        const [, name, i1] = param
        if (!name || !i1) return message.reply('Missing arguments. Example: >fgi testName This is a caption')

        const row = await sequelize.models.fginput.findOne({
          where: { guild: message.guild.id, name }
        })

        if (!row) return message.reply(`"${name}" is not a saved input list`)
        row.caption = param.slice(2).join(' ')
        await row.save()

        message.channel.send(`Saved caption for input list "${name}"`)
      }
    },
    fgglossary: {
      usage: 'fgglossary [search term]',
      desc: 'Searches for a term on Infil\'s Glossary',
      example: 'fgglossary mexican uppercut',
      execute: async ({ param, sequelize }, { message }) => {
        const params = param.slice(1)
        if (params.length === 0) return message.reply('Missing search term. Example: >fgglossary mexican uppercut')

        const search = params.join(' ').toLowerCase()
        const result = terms.filter(i => i.includes(search))
        const url = `https://glossary.infil.net/?t=${params.join('%20').toLowerCase()}`

        if (result.length === 0) return message.reply(`Term "${search}" not found`)
        if (result.length === 1) return message.reply(`\`\`\`${glossary[result[0]].def}\`\`\`Source: <${url}>`)

        message.reply(`Multiple terms found: ${url}`)
      }
    },
    grab: {
      usage: 'grab @user',
      desc: 'Command grab someone',
      example: 'grab @ChitoWarlock',
      execute: async ({ param, sequelize }, { message }) => {
        const { users: mentions } = message.mentions

        if (mentions.size === 0) return message.reply('You forgot to mention who to grab')
        if (mentions.size > 1) return message.reply('Cannot grab multiple enemies!')

        const user = mentions.first()

        const mainPath = grabs[getRandomInt(0, grabs.length - 1)]
        const mainImage = await sharp(mainPath)
        const options = await import(mainPath.replace('.png', '.json'))
        const avatarImage = await sharp(await getBuffer(user.displayAvatarURL({ format: 'png' })))
          .resize(options.resize)
          .rotate(options.rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } })

        const mainMetadata = await mainImage.metadata()
        const { width, height } = mainMetadata

        const canvas = await newCanvas(width, height)
          .composite([
            { input: await avatarImage.toBuffer(), ...options.composite },
            { input: await mainImage.toBuffer() }
          ])
          .png().toBuffer()

        message.reply({ files: [canvas] })
      }
    }
  }
}

async function getBuffer (url) {
  const input = (await axios({ url, responseType: 'arraybuffer' })).data
  return input
}

function newCanvas (width, height) {
  const channels = 4
  const rgbaPixel = 0x00000000
  const canvas = Buffer.alloc(width * height * channels, rgbaPixel)

  return sharp(canvas, { raw: { width, height, channels } })
}

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default fgnotation
