const Sequelize = require('sequelize')
const { DataTypes } = Sequelize

module.exports = {
  name: 'requestcat',
  commands: require('./commands'),
  events: {
    async ready (globals) {
      const config = globals.configFile.sequelize
      config.database = 'soc'

      globals.socdb = new Sequelize(config)
      globals.socdb.define('request', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: DataTypes.STRING,
        link: DataTypes.STRING,
        user: DataTypes.STRING,
        userID: DataTypes.STRING,
        state: { type: DataTypes.STRING, allowNull: false },
        donator: { type: DataTypes.BOOLEAN, allowNull: false },
        reason: DataTypes.STRING,
        comments: DataTypes.STRING,
        message: DataTypes.STRING
      })
    }
  }
}
