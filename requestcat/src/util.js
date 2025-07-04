import { PermissionsBitField } from 'discord.js'

export function catchErr (guild, err) {
  console.log(err)
  const channel = guild.channels.cache.find(c => c.name === 'request-talk')
  channel.send('Error returned during request <@194614248511504385>')
}

export async function checkLockChannel (socdb, guild) {
  const countPending = await getPendingCount(socdb)
  const channel = guild.channels.cache.find(c => c.name === 'request-submission')
  const membersRole = guild.roles.cache.find(r => r.name === 'Members')
  const camperRole = guild.roles.cache.find(r => r.name === 'Request Camper')
  const permissions = channel.permissionsFor(membersRole)

  if (countPending >= 20 && permissions.has(PermissionsBitField.Flags.SendMessages)) {
    await channel.permissionOverwrites.edit(membersRole, { SendMessages: false })
    await channel.send('Requests closed')
  } else {
    if (countPending < 20 && !permissions.has(PermissionsBitField.Flags.SendMessages)) {
      await channel.permissionOverwrites.edit(membersRole, { SendMessages: true })
      await channel.send(`Ayo ${camperRole}, requests are open`)
    }
  }
}

export const getPendingCount = socdb => socdb.models.request.count({ where: { state: 'pending', donator: false } })

export async function completeRequest (socdb, guild, request) {
  request.state = 'complete'
  await request.save()
    .then(() => checkLockChannel(socdb, guild))
    .catch(err => catchErr(guild, err))
}

export async function holdRequest (socdb, guild, request, reason) {
  await socdb.transaction(async transaction => {
    const talkChannel = guild.channels.cache.find(c => c.name === 'request-talk')

    request.state = 'hold'
    request.reason = reason
    await request.save()
    await talkChannel.send(`"${request.title}${request.link ? ` (${request.link})` : ''}" from <@${request.userID}> has been put ON HOLD.\nReason: ${request.reason || 'I made it the fuck up'}`)
  })
    .then(() => checkLockChannel(socdb, guild))
    .catch(err => catchErr(guild, err))
}

export async function rejectRequest (socdb, guild, request, reason) {
  const talkChannel = guild.channels.cache.find(c => c.name === 'request-talk')
  await request.destroy()
  await talkChannel.send(`"${request.title}${request.link ? ` (${request.link})` : ''}" from <@${request.userID}> has been rejected.\nReason: ${reason || 'I made it the fuck up'}`)
  await checkLockChannel(socdb, guild)
}
