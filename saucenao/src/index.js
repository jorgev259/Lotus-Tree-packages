import { DataTypes } from 'sequelize'

import events from './events.js'
import commands from './commands.js'

export default {
  name: 'saucenao',
  config: { guild: { saucescore: '70' } },
  preload (sequelize) {
    sequelize.define('saucenao', {
      guild: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      channel: {
        type: DataTypes.STRING,
        primaryKey: true
      }
    })
  },
  events,
  commands
}
