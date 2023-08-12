"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _default = {
  enablesauce: {
    desc: 'Enables saucebot on the current channel',
    execute: function execute(_ref, _ref2) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var sequelize, config, message, guild, channel;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              sequelize = _ref.sequelize, config = _ref.config;
              message = _ref2.message;
              guild = message.guild.id;
              channel = message.channel.id;
              if (!config[guild].saucenao.has(channel)) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", message.channel.send('Saucenao already enabled on this channel'));
            case 6:
              _context.next = 8;
              return sequelize.models.saucenao.findOrCreate({
                where: {
                  guild: guild,
                  channel: channel
                }
              });
            case 8:
              config[guild].saucenao.add(channel);
              message.channel.send('Saucenao enabled on this channel');
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    }
  },
  disablesauce: {
    desc: 'Disables saucebot on the current channel',
    execute: function execute(_ref3, _ref4) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var sequelize, config, message, guild, channel;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              sequelize = _ref3.sequelize, config = _ref3.config;
              message = _ref4.message;
              guild = message.guild.id;
              channel = message.channel.id;
              if (config[guild].saucenao.has(channel)) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", message.channel.send('Saucenao not enabled on this channel'));
            case 6:
              _context2.next = 8;
              return sequelize.models.saucenao.destroy({
                where: {
                  guild: guild,
                  channel: channel
                }
              });
            case 8:
              config[guild].saucenao["delete"](channel);
              message.channel.send('Saucenao disabled from this channel');
            case 10:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    }
  }
};
exports["default"] = _default;