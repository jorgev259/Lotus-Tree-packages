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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1aXJlIiwiRGF0YVR5cGVzIiwiU1RSSU5HIiwiQk9PTEVBTiIsInBlcm1DaGVjayIsImNoZWNrR3VpbGQiLCJndWlsZCIsImdsb2JhbHMiLCJjb25maWciLCJnbG9iYWwiLCJPYmplY3QiLCJlbnRyaWVzIiwiZGVmYXVsdENvbmZpZyIsIml0ZW0iLCJ2YWx1ZSIsInNlcXVlbGl6ZSIsIm1vZGVscyIsImZpbmRPckNyZWF0ZSIsIndoZXJlIiwiZGVmYXVsdHMiLCJyb3ciLCJtb2R1bGVzIiwidmFsdWVzIiwibW9kdWxlIiwibmFtZSIsImVuYWJsZWQiLCJjb21tYW5kcyIsImNvbW1hbmQiLCJleHBvcnRzIiwicHJlZml4IiwiZXZlbnRzIiwiZ3VpbGRDcmVhdGUiLCJpZCIsInJlYWR5IiwiY2xpZW50IiwiZGVmaW5lIiwidHlwZSIsInVuaXF1ZSIsImRlZmF1bHRWYWx1ZSIsImNhdGVnb3J5Iiwic3luYyIsImd1aWxkcyIsImZldGNoIiwiZm9yRWFjaCIsIm1lc3NhZ2VDcmVhdGUiLCJtZXNzYWdlIiwiYXV0aG9yIiwidXNlciIsIm1lbWJlciIsImd1aWxkSWQiLCJjb250ZW50Iiwic3RhcnRzV2l0aCIsInBhcmFtIiwic3BsaXQiLCJjb21tYW5kTmFtZSIsInRvTG93ZXJDYXNlIiwic3Vic3RyaW5nIiwibGVuZ3RoIiwiaGFzIiwiZ2V0IiwibW9kdWxlTmFtZSIsImV4ZWN1dGUiXSwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBEYXRhVHlwZXMgfSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpXG5jb25zdCB7IFNUUklORywgQk9PTEVBTiB9ID0gRGF0YVR5cGVzXG5jb25zdCB7IHBlcm1DaGVjayB9ID0gcmVxdWlyZSgnLi91dGlsJylcblxuYXN5bmMgZnVuY3Rpb24gY2hlY2tHdWlsZCAoZ3VpbGQsIGdsb2JhbHMpIHtcbiAgaWYgKCFnbG9iYWxzLmNvbmZpZ1tndWlsZF0pIGdsb2JhbHMuY29uZmlnW2d1aWxkXSA9IHt9XG4gIGlmICghZ2xvYmFscy5jb25maWcuZ2xvYmFsKSBnbG9iYWxzLmNvbmZpZy5nbG9iYWwgPSB7fVxuXG4gIGZvciAoY29uc3QgW2l0ZW0sIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhnbG9iYWxzLmRlZmF1bHRDb25maWcuZ2xvYmFsKSkge1xuICAgIGNvbnN0IFtyb3ddID0gYXdhaXQgZ2xvYmFscy5zZXF1ZWxpemUubW9kZWxzLmNvbmZpZy5maW5kT3JDcmVhdGUoeyB3aGVyZTogeyBndWlsZDogJ2dsb2JhbCcsIGl0ZW0gfSwgZGVmYXVsdHM6IHsgdmFsdWUgfSB9KVxuICAgIGdsb2JhbHMuY29uZmlnLmdsb2JhbFtpdGVtXSA9IHJvdy52YWx1ZVxuICB9XG5cbiAgZm9yIChjb25zdCBbaXRlbSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGdsb2JhbHMuZGVmYXVsdENvbmZpZy5ndWlsZCkpIHtcbiAgICBjb25zdCBbcm93XSA9IGF3YWl0IGdsb2JhbHMuc2VxdWVsaXplLm1vZGVscy5jb25maWcuZmluZE9yQ3JlYXRlKHsgd2hlcmU6IHsgZ3VpbGQsIGl0ZW0gfSwgZGVmYXVsdHM6IHsgdmFsdWUgfSB9KVxuICAgIGdsb2JhbHMuY29uZmlnW2d1aWxkXVtpdGVtXSA9IHJvdy52YWx1ZVxuICB9XG5cbiAgZm9yIChjb25zdCBtb2R1bGUgb2YgZ2xvYmFscy5tb2R1bGVzLnZhbHVlcygpKSB7XG4gICAgY29uc3QgW3sgdmFsdWUgfV0gPSBhd2FpdCBnbG9iYWxzLnNlcXVlbGl6ZS5tb2RlbHMubW9kdWxlLmZpbmRPckNyZWF0ZSh7IHdoZXJlOiB7IGd1aWxkLCBtb2R1bGU6IG1vZHVsZS5uYW1lIH0gfSlcbiAgICBtb2R1bGUuZW5hYmxlZFtndWlsZF0gPSB2YWx1ZVxuICB9XG5cbiAgZm9yIChjb25zdCBjb21tYW5kIG9mIGdsb2JhbHMuY29tbWFuZHMudmFsdWVzKCkpIHtcbiAgICBjb25zdCBbeyB2YWx1ZSB9XSA9IGF3YWl0IGdsb2JhbHMuc2VxdWVsaXplLm1vZGVscy5jb21tYW5kLmZpbmRPckNyZWF0ZSh7IHdoZXJlOiB7IGd1aWxkLCBjb21tYW5kOiBjb21tYW5kLm5hbWUgfSB9KVxuICAgIGNvbW1hbmQuZW5hYmxlZFtndWlsZF0gPSB2YWx1ZVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBuYW1lOiAnY29tbWFuZC1oYW5kbGVyJyxcbiAgY29uZmlnOiB7IGd1aWxkOiB7IHByZWZpeDogJz4nIH0gfSxcbiAgY29tbWFuZHM6IHJlcXVpcmUoJy4vY29tbWFuZHMnKSxcbiAgZXZlbnRzOiB7XG4gICAgYXN5bmMgZ3VpbGRDcmVhdGUgKGdsb2JhbHMsIGd1aWxkKSB7XG4gICAgICBhd2FpdCBjaGVja0d1aWxkKGd1aWxkLmlkLCBnbG9iYWxzKVxuICAgIH0sXG4gICAgYXN5bmMgcmVhZHkgKGdsb2JhbHMpIHtcbiAgICAgIGNvbnN0IHsgY2xpZW50LCBzZXF1ZWxpemUgfSA9IGdsb2JhbHNcbiAgICAgIHNlcXVlbGl6ZS5kZWZpbmUoJ2NvbmZpZycsIHtcbiAgICAgICAgZ3VpbGQ6IHsgdHlwZTogU1RSSU5HLCB1bmlxdWU6ICdpbmRleCcgfSxcbiAgICAgICAgaXRlbTogeyB0eXBlOiBTVFJJTkcsIHVuaXF1ZTogJ2luZGV4JyB9LFxuICAgICAgICB2YWx1ZTogeyB0eXBlOiBTVFJJTkcgfVxuICAgICAgfSlcblxuICAgICAgc2VxdWVsaXplLmRlZmluZSgnbW9kdWxlJywge1xuICAgICAgICBndWlsZDogeyB0eXBlOiBTVFJJTkcsIHVuaXF1ZTogJ2luZGV4JyB9LFxuICAgICAgICBtb2R1bGU6IHsgdHlwZTogU1RSSU5HLCB1bmlxdWU6ICdpbmRleCcgfSxcbiAgICAgICAgdmFsdWU6IHsgdHlwZTogQk9PTEVBTiwgZGVmYXVsdFZhbHVlOiB0cnVlIH1cbiAgICAgIH0pXG5cbiAgICAgIHNlcXVlbGl6ZS5kZWZpbmUoJ2NvbW1hbmQnLCB7XG4gICAgICAgIGd1aWxkOiB7IHR5cGU6IFNUUklORywgdW5pcXVlOiAnaW5kZXgnIH0sXG4gICAgICAgIGNvbW1hbmQ6IHsgdHlwZTogU1RSSU5HLCB1bmlxdWU6ICdpbmRleCcgfSxcbiAgICAgICAgdmFsdWU6IHsgdHlwZTogQk9PTEVBTiwgZGVmYXVsdFZhbHVlOiB0cnVlIH1cbiAgICAgIH0pXG5cbiAgICAgIHNlcXVlbGl6ZS5kZWZpbmUoJ3Blcm0nLCB7XG4gICAgICAgIGd1aWxkOiBTVFJJTkcsXG4gICAgICAgIGNvbW1hbmQ6IFNUUklORyxcbiAgICAgICAgY2F0ZWdvcnk6IFNUUklORyxcbiAgICAgICAgdHlwZTogU1RSSU5HLFxuICAgICAgICBuYW1lOiBTVFJJTkdcbiAgICAgIH0pXG5cbiAgICAgIGF3YWl0IHNlcXVlbGl6ZS5zeW5jKClcblxuICAgICAgY29uc3QgZ3VpbGRzID0gYXdhaXQgY2xpZW50Lmd1aWxkcy5mZXRjaCgpXG4gICAgICBndWlsZHMuZm9yRWFjaChndWlsZCA9PiBjaGVja0d1aWxkKGd1aWxkLmlkLCBnbG9iYWxzKSlcbiAgICB9LFxuICAgIGFzeW5jIG1lc3NhZ2VDcmVhdGUgKGdsb2JhbCwgbWVzc2FnZSkge1xuICAgICAgY29uc3QgeyBjbGllbnQsIGNvbW1hbmRzLCBtb2R1bGVzLCBjb25maWcgfSA9IGdsb2JhbFxuICAgICAgaWYgKG1lc3NhZ2UuYXV0aG9yLmlkID09PSBjbGllbnQudXNlci5pZCB8fCAhbWVzc2FnZS5tZW1iZXIpIHJldHVyblxuXG4gICAgICBjb25zdCBndWlsZElkID0gbWVzc2FnZS5ndWlsZElkXG4gICAgICBjb25zdCB7IHByZWZpeCB9ID0gY29uZmlnW2d1aWxkSWRdXG5cbiAgICAgIGlmIChtZXNzYWdlLmNvbnRlbnQuc3RhcnRzV2l0aChwcmVmaXgpKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtID0gbWVzc2FnZS5jb250ZW50LnNwbGl0KCcgJylcbiAgICAgICAgY29uc3QgY29tbWFuZE5hbWUgPSBwYXJhbVswXS50b0xvd2VyQ2FzZSgpLnN1YnN0cmluZyhwcmVmaXgubGVuZ3RoKVxuXG4gICAgICAgIGlmICghY29tbWFuZHMuaGFzKGNvbW1hbmROYW1lKSkgcmV0dXJuXG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kcy5nZXQoY29tbWFuZE5hbWUpXG4gICAgICAgIGNvbnN0IG1vZHVsZSA9IG1vZHVsZXMuZ2V0KGNvbW1hbmQubW9kdWxlTmFtZSlcblxuICAgICAgICBpZiAobW9kdWxlLmVuYWJsZWRbZ3VpbGRJZF0gJiYgY29tbWFuZC5lbmFibGVkW2d1aWxkSWRdICYmIGF3YWl0IHBlcm1DaGVjayhjb21tYW5kLCBtZXNzYWdlLCBnbG9iYWwpKSB7XG4gICAgICAgICAgY29tbWFuZC5leGVjdXRlKHsgLi4uZ2xvYmFsLCBwYXJhbSB9LCB7IG1lc3NhZ2UgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZUFBc0JBLE9BQU8sQ0FBQyxXQUFELENBQTdCO0FBQUEsSUFBUUMsU0FBUixZQUFRQSxTQUFSOztBQUNBLElBQVFDLE1BQVIsR0FBNEJELFNBQTVCLENBQVFDLE1BQVI7QUFBQSxJQUFnQkMsT0FBaEIsR0FBNEJGLFNBQTVCLENBQWdCRSxPQUFoQjs7QUFDQSxnQkFBc0JILE9BQU8sQ0FBQyxRQUFELENBQTdCO0FBQUEsSUFBUUksU0FBUixhQUFRQSxTQUFSOztTQUVlQyxVOzs7Ozs4RkFBZixrQkFBMkJDLEtBQTNCLEVBQWtDQyxPQUFsQztJQUFBOztJQUFBO01BQUE7UUFBQTtVQUFBO1lBQ0UsSUFBSSxDQUFDQSxPQUFPLENBQUNDLE1BQVIsQ0FBZUYsS0FBZixDQUFMLEVBQTRCQyxPQUFPLENBQUNDLE1BQVIsQ0FBZUYsS0FBZixJQUF3QixFQUF4QjtZQUM1QixJQUFJLENBQUNDLE9BQU8sQ0FBQ0MsTUFBUixDQUFlQyxNQUFwQixFQUE0QkYsT0FBTyxDQUFDQyxNQUFSLENBQWVDLE1BQWYsR0FBd0IsRUFBeEI7WUFGOUIsMEJBSThCQyxNQUFNLENBQUNDLE9BQVAsQ0FBZUosT0FBTyxDQUFDSyxhQUFSLENB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