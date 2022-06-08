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
                _context.prev = 5;
                _context.next = 8;
                return client.guilds.fetch('496366337036255242');

              case 8:
                guild = _context.sent;
                _context.next = 11;
                return guild.channels.fetch();

              case 11:
                _context.next = 15;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](5);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 13]]);
      }))();
    }
  }
};