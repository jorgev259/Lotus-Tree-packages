import sharp from 'sharp'
import path from 'path'
import glob from 'glob'
import { DataTypes } from 'sequelize'
import bent from 'bent'

const getJSON = bent('json')
const imgPath = path.join(__dirname, 'img')
const basicInputs = new Map()
const gameInputs = new Map()

let glossary = {}
let terms = []

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
  })

basicInputs.set('>>', path.join(imgPath, 'basic/doubleforward.png'))

glob.sync(path.join(imgPath, 'games/**'), { nodir: true })
  .forEach(p => {
    const { dir, name } = path.parse(path.relative(path.join(imgPath, 'games'), p))

    if (!gameInputs.has(dir)) gameInputs.set(dir, new Map())
    gameInputs.get(dir).set(name, p)
  })

function solveInput (inputs, input) {
  if (inputs.has(input)) return [input]

  for (let i = 0; i < input.length; i++) {
    const s1 = input.slice(0, 0 - i)
    if (inputs.has(s1)) return [s1, ...solveInput(inputs, input.slice(0 - i))]
  }

  throw new Error(`Cannot find "${input}" as a recognizable input`)
}

async function sendInput (inputs, result, message, caption) {
  const canvas = await sharp({ create: { width: 152 * result.length, height: 152, channels: 4, background: 'transparent' } })
    .composite(result.map((it, index) =>
      ({ input: inputs.get(it), left: index * 152, top: 0, width: 152, height: 152 })
    ))
    .png()
    .toBuffer()

  return message.reply({ content: caption, files: [canvas] })
}

const builtin = {
  37: {
    game: 'sf',
    caption: '***LETS GO JUSTIN!***',
    input: '6 6 6 6 6 6 6 >> 6 6 6 6 6 6 6 >> 8 6 j. hk >> 2 mk >> 623 mp >> 236 236 lk'
  }
}

export default {
  name: 'fg-notation',
  about: {
    name: 'FG Notation',
    value: '[Instructions and source code](https://lotus.chitowarlock.com/fgnotation)\n[Infil\'s Fighting Game Glossary](https://glossary.infil.net)\n[MagicianStuff\'s Fighthing Game notations emotes](https://twitter.com/MagicianStuff/status/1477931054484893697)'
  },
  intents: ['GUILD_MESSAGES'],
  partials: ['MESSAGE'],

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
        const [, game, i1] = param
        if (!game || !i1) return message.reply('Missing arguments. Example: >fgi sf 236P 214K')
        if (!gameInputs.has(game)) return message.reply(`"${game}" is not a valid game. Available games: ${Array.from(gameInputs.keys()).join(' ')}`)

        const inputs = new Map([...basicInputs, ...gameInputs.get(game)])
        const result = param.slice(2).map(i => solveInput(inputs, i.toLowerCase())).flat()

        sendInput(inputs, result, message)
      }
    },
    fgsave: {
      usage: 'fgsave [game] [name] [inputs]',
      desc: 'Saves a list of inputs into a command',
      example: 'fgi sf testName 236P 214K',
      execute: async ({ param, sequelize }, { message }) => {
        const [, game, name, i1] = param
        if (!game || !name || !i1) return message.reply('Missing arguments. Example: >fgi sf testName 236P 214K')
        if (!gameInputs.has(game)) return message.reply(`"${game}" is not a valid game. Available games: ${Array.from(gameInputs.keys()).join(' ')}`)

        const inputs = new Map([...basicInputs, ...gameInputs.get(game)])
        const input = param.slice(3).map(i => solveInput(inputs, i.toLowerCase())).flat().join(' ')

        await sequelize.models.fginput.create({ guild: message.guild.id, name, createdBy: message.author.id, game, input })

        message.channel.send(`Saved command "${input}" as "${name}"`)
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
    }
  }
}
