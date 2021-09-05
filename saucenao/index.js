const { DataTypes } = require('sequelize')
const { STRING } = DataTypes

module.exports = {
  name: 'saucenao',
  preload (sequelize) {
    sequelize.define('saucenao', {
      guild: {
        type: STRING,
        primaryKey: true
      },
      channel: {
        type: STRING,
        primaryKey: true
      }
    })
  },
  events: require('./events'),
  commands: require('./commands')
}
