import { DataTypes } from 'sequelize'
import events from './events'
import commands from './commands'

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
