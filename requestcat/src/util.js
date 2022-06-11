import { Permissions } from 'discord.js'
import { get } from 'axios'

export async function getVGMDB (link) {
  const url = new URL(link)
  const id = url.pathname.split('/').slice(-1)

  try {
    const response = await get(
    `https://api.nemoralni.site/albums/${id}`,
    { headers: { 'x-api-key': 'i-m-a-pig-i-don-t-fight-for-honor-i-fight-for-a-paycheck' } })
    return response.data
  } catch {}
}

const isValidUrl = s => {
  try {
    const testUrl = new URL(s)
    return !!testUrl
  } catch (err) {
    return false
  }
}

async function getCover (link) {
  const data = await getVGMDB(link)
  if (!data) return

  const cover = data.album_cover

  if (isValidUrl(cover)) return { url: cover }
}

export async function getEmbed (request) {
  let image
  const isHold = request.state === 'hold'

  if (request.link?.includes('vgmdb.net')) image = await getCover(request.link)

  return {
    fields: [
      {
        name: 'Request',
        value: `${request.title}${request.link ? ` (${request.link})` : ''}${isHold ? ' **(ON HOLD)**' : ''}`
      },
      {
        name: 'Requested by',
        value: `<@${request.userID}> / ${request.userID}`,
        inline: true
      },
      {
        name: 'ID',
        value: request.id.toString(),
        inline: true
      }
    ],
    color: request.donator ? 0xedcd40 : (isHold ? 0xc20404 : 0x42bfed),
    image
  }
}

async function editEmbed (guild, request) {
  const channel = guild.channels.cache.find(c => c.name === 'open-requests')
  const embed = await getEmbed(request)

  const m = await channel.messages.fetch(request.message)
  await m.edit({ embed })
}

export function catchErr (guild, err) {
  console.log(err)
  const channel = guild.channels.cache.find(c => c.name === 'request-talk')
  channel.send('Error returned during request <@194614248511504385>')
}

export async function checkLockChannel (socdb, guild) {
  const countPending = await getPendingCount(socdb)
  const channel = guild.channels.cache.find(c => c.name === 'request-submission')
  const membersRole = guild.roles.cache.find(r => r.name === 'Members')
  const permissions = channel.permissionsFor(membersRole)

  if (countPending >= 20 && permissions.has(Permissions.FLAGS.SEND_MESSAGES)) {
    await channel.permissionOverwrites.edit(membersRole, { SEND_MESSAGES: false })
    await channel.send('Requests closed')
  } else {
    if (countPending < 20 && !permissions.has(Permissions.FLAGS.SEND_MESSAGES)) {
      await channel.permissionOverwrites.edit(membersRole, { SEND_MESSAGES: true })
      await channel.send('Requests open')
    }
  }
}

export const getPendingCount = socdb => socdb.models.request.count({ where: { state: 'pending', donator: false } })

export async function completeRequest (client, socdb, guildId, request) {
  const guild = await client.guilds.fetch(guildId)

  await socdb.transaction(async transaction => {
    const reqMsg = await guild.channels.cache.find(c => c.name === 'open-requests').messages.fetch(request.message)

    await reqMsg.delete()

    request.state = 'complete'
    request.message = null
    await request.save()
  })
    .then(() => checkLockChannel(socdb, guild))
    .catch(err => catchErr(guild, err))
}

export async function holdRequest (client, socdb, guildId, request, reason) {
  const guild = await client.guilds.fetch(guildId)

  await socdb.transaction(async transaction => {
    const talkChannel = guild.channels.cache.find(c => c.name === 'request-talk')

    request.state = 'hold'
    request.reason = reason
    await request.save()
    await talkChannel.send(`"${request.title}${request.link ? ` (${request.link})` : ''}" from <@${request.userID}> has been put ON HOLD.\nReason: ${request.reason || 'I made it the fuck up'}`)

    if (request.message) await editEmbed(guild, request)
  })
    .then(() => checkLockChannel(socdb, guild))
    .catch(err => catchErr(guild, err))
}

export async function rejectRequest (client, socdb, guildId, request, reason) {
  const guild = await client.guilds.fetch(guildId)

  await socdb.transaction(async transaction => {
    const reqMsg = await guild.channels.cache.find(c => c.name === 'open-requests').messages.fetch(request.message)
    await reqMsg.delete()
    await request.destroy()
  })
    .then(async () => {
      const talkChannel = guild.channels.cache.find(c => c.name === 'request-talk')
      await talkChannel.send(`"${request.title}${request.link ? ` (${request.link})` : ''}" from <@${request.userID}> has been rejected.\nReason: ${reason || 'I made it the fuck up'}`)

      await checkLockChannel(socdb, guild)
    })
    .catch(err => catchErr(guild, err))
}
