const { DataTypes } = require('sequelize')

module.exports = {
  name: 'requestcat',
  preload (sequelize) {
    sequelize.define('request', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user: DataTypes.STRING,
      valid: DataTypes.BOOLEAN
    })

    sequelize.define('vgmdb', {
      url: {
        type: DataTypes.STRING,
        primaryKey: true
      }
    })
  },
  commands: require('./commands')
}
