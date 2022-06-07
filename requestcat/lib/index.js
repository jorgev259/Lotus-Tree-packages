"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Sequelize = require('sequelize');

var DataTypes = Sequelize.DataTypes;
module.exports = {
  name: 'requestcat',
  commands: require('./commands'),
  events: {
    ready: function ready(globals) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var configFile, client, config, guild;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                configFile = globals.configFile, client = globals.client;
                config = configFile.sequelize;
                config.database = 'soc';
                globals.socdb = new Sequelize(config);
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
                  state: {
                    type: DataTypes.STRING,
                    allowNull: false
                  },
                  donator: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                  },
                  reason: DataTypes.STRING,
                  comments: DataTypes.STRING,
                  message: DataTypes.STRING
                });
                _context.next = 7;
                return client.guilds.fetch('496366337036255242');

              case 7:
                guild = _context.sent;
                _context.next = 10;
                return guild.channel.fetch();

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
};