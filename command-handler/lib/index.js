"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var STRING = DataTypes.STRING,
    BOOLEAN = DataTypes.BOOLEAN;

var _require2 = require('./util'),
    permCheck = _require2.permCheck;

function checkGuild(_x, _x2) {
  return _checkGuild.apply(this, arguments);
}

function _checkGuild() {
  _checkGuild = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(guild, globals) {
    var _i, _Object$entries, _Object$entries$_i, item, value, _yield$globals$sequel, _yield$globals$sequel2, row, _i2, _Object$entries2, _Object$entries2$_i, _item, _value, _yield$globals$sequel3, _yield$globals$sequel4, _row, _iterator, _step, _module2, _yield$globals$sequel5, _yield$globals$sequel6, _value2, _iterator2, _step2, command, _yield$globals$sequel7, _yield$globals$sequel8, _value3;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!globals.config[guild]) globals.config[guild] = {};
            if (!globals.config.global) globals.config.global = {};
            _i = 0, _Object$entries = Object.entries(globals.defaultConfig.global);

          case 3:
            if (!(_i < _Object$entries.length)) {
              _context4.next = 14;
              break;
            }

            _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), item = _Object$entries$_i[0], value = _Object$entries$_i[1];
            _context4.next = 7;
            return globals.sequelize.models.config.findOrCreate({
              where: {
                guild: 'global',
                item: item
              },
              defaults: {
                value: value
              }
            });

          case 7:
            _yield$globals$sequel = _context4.sent;
            _yield$globals$sequel2 = (0, _slicedToArray2["default"])(_yield$globals$sequel, 1);
            row = _yield$globals$sequel2[0];
            globals.config.global[item] = row.value;

          case 11:
            _i++;
            _context4.next = 3;
            break;

          case 14:
            _i2 = 0, _Object$entries2 = Object.entries(globals.defaultConfig.guild);

          case 15:
            if (!(_i2 < _Object$entries2.length)) {
              _context4.next = 26;
              break;
            }

            _Object$entries2$_i = (0, _slicedToArray2["default"])(_Object$entries2[_i2], 2), _item = _Object$entries2$_i[0], _value = _Object$entries2$_i[1];
            _context4.next = 19;
            return globals.sequelize.models.config.findOrCreate({
              where: {
                guild: guild,
                item: _item
              },
              defaults: {
                value: _value
              }
            });

          case 19:
            _yield$globals$sequel3 = _context4.sent;
            _yield$globals$sequel4 = (0, _slicedToArray2["default"])(_yield$globals$sequel3, 1);
            _row = _yield$globals$sequel4[0];
            globals.config[guild][_item] = _row.value;

          case 23:
            _i2++;
            _context4.next = 15;
            break;

          case 26:
            _iterator = _createForOfIteratorHelper(globals.modules.values());
            _context4.prev = 27;

            _iterator.s();

          case 29:
            if ((_step = _iterator.n()).done) {
              _context4.next = 39;
              break;
            }

            _module2 = _step.value;
            _context4.next = 33;
            return globals.sequelize.models.module.findOrCreate({
              where: {
                guild: guild,
                module: _module2.name
              }
            });

          case 33:
            _yield$globals$sequel5 = _context4.sent;
            _yield$globals$sequel6 = (0, _slicedToArray2["default"])(_yield$globals$sequel5, 1);
            _value2 = _yield$globals$sequel6[0].value;
            _module2.enabled[guild] = _value2;

          case 37:
            _context4.next = 29;
            break;

          case 39:
            _context4.next = 44;
            break;

          case 41:
            _context4.prev = 41;
            _context4.t0 = _context4["catch"](27);

            _iterator.e(_context4.t0);

          case 44:
            _context4.prev = 44;

            _iterator.f();

            return _context4.finish(44);

          case 47:
            _iterator2 = _createForOfIteratorHelper(globals.commands.values());
            _context4.prev = 48;

            _iterator2.s();

          case 50:
            if ((_step2 = _iterator2.n()).done) {
              _context4.next = 60;
              break;
            }

            command = _step2.value;
            _context4.next = 54;
            return globals.sequelize.models.command.findOrCreate({
              where: {
                guild: guild,
                command: command.name
              }
            });

          case 54:
            _yield$globals$sequel7 = _context4.sent;
            _yield$globals$sequel8 = (0, _slicedToArray2["default"])(_yield$globals$sequel7, 1);
            _value3 = _yield$globals$sequel8[0].value;
            command.enabled[guild] = _value3;

          case 58:
            _context4.next = 50;
            break;

          case 60:
            _context4.next = 65;
            break;

          case 62:
            _context4.prev = 62;
            _context4.t1 = _context4["catch"](48);

            _iterator2.e(_context4.t1);

          case 65:
            _context4.prev = 65;

            _iterator2.f();

            return _context4.finish(65);

          case 68:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[27, 41, 44, 47], [48, 62, 65, 68]]);
  }));
  return _checkGuild.apply(this, arguments);
}

module.exports = {
  name: 'command-handler',
  config: {
    guild: {
      prefix: '>'
    }
  },
  commands: require('./commands'),
  events: {
    guildCreate: function guildCreate(globals, guild) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return checkGuild(guild.id, globals);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    ready: function ready(globals) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var client, sequelize, guilds;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                client = globals.client, sequelize = globals.sequelize;
                sequelize.define('config', {
                  guild: {
                    type: STRING,
                    unique: 'index'
                  },
                  item: {
                    type: STRING,
                    unique: 'index'
                  },
                  value: {
                    type: STRING
                  }
                });
                sequelize.define('module', {
                  guild: {
                    type: STRING,
                    unique: 'index'
                  },
                  module: {
                    type: STRING,
                    unique: 'index'
                  },
                  value: {
                    type: BOOLEAN,
                    defaultValue: true
                  }
                });
                sequelize.define('command', {
                  guild: {
                    type: STRING,
                    unique: 'index'
                  },
                  command: {
                    type: STRING,
                    unique: 'index'
                  },
                  value: {
                    type: BOOLEAN,
                    defaultValue: true
                  }
                });
                sequelize.define('perm', {
                  guild: STRING,
                  command: STRING,
                  category: STRING,
                  type: STRING,
                  name: STRING
                });
                _context2.next = 7;
                return sequelize.sync();

              case 7:
                _context2.next = 9;
                return client.guilds.fetch();

              case 9:
                guilds = _context2.sent;
                guilds.forEach(function (guild) {
                  return checkGuild(guild.id, globals);
                });

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    messageCreate: function messageCreate(global, message) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var client, commands, modules, config, guildId, prefix, param, commandName, command, _module;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                client = global.client, commands = global.commands, modules = global.modules, config = global.config;

                if (!(message.author.id === client.user.id || !message.member)) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return");

              case 3:
                guildId = message.guildId;
                prefix = config[guildId].prefix;

                if (!message.content.startsWith(prefix)) {
                  _context3.next = 19;
                  break;
                }

                param = message.content.split(' ');
                commandName = param[0].toLowerCase().substring(prefix.length);

                if (commands.has(commandName)) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt("return");

              case 10:
                command = commands.get(commandName);
                _module = modules.get(command.moduleName);
                _context3.t0 = _module.enabled[guildId] && command.enabled[guildId];

                if (!_context3.t0) {
                  _context3.next = 17;
                  break;
                }

                _context3.next = 16;
                return permCheck(command, message, global);

              case 16:
                _context3.t0 = _context3.sent;

              case 17:
                if (!_context3.t0) {
                  _context3.next = 19;
                  break;
                }

                command.execute(_objectSpread(_objectSpread({}, global), {}, {
                  param: param
                }), {
                  message: message
                });

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  }
};