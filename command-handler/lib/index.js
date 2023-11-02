"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
      while (1) switch (_context4.prev = _context4.next) {
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
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return checkGuild(guild.id, globals);
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    ready: function ready(globals) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var client, sequelize, guilds;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
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
        }, _callee2);
      }))();
    },
    messageCreate: function messageCreate(global, message) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var client, commands, modules, config, guildId, prefix, param, commandName, command, _module;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
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
        }, _callee3);
      }))();
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcmVxdWlyZSIsInJlcXVpcmUiLCJEYXRhVHlwZXMiLCJTVFJJTkciLCJCT09MRUFOIiwiX3JlcXVpcmUyIiwicGVybUNoZWNrIiwiY2hlY2tHdWlsZCIsIl94IiwiX3gyIiwiX2NoZWNrR3VpbGQiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlNCIsImd1aWxkIiwiZ2xvYmFscyIsIl9pIiwiX09iamVjdCRlbnRyaWVzIiwiX09iamVjdCRlbnRyaWVzJF9pIiwiaXRlbSIsInZhbHVlIiwiX3lpZWxkJGdsb2JhbHMkc2VxdWVsIiwiX3lpZWxkJGdsb2JhbHMkc2VxdWVsMiIsInJvdyIsIl9pMiIsIl9PYmplY3QkZW50cmllczIiLCJfT2JqZWN0JGVudHJpZXMyJF9pIiwiX2l0ZW0iLCJfdmFsdWUiLCJfeWllbGQkZ2xvYmFscyRzZXF1ZWwzIiwiX3lpZWxkJGdsb2JhbHMkc2VxdWVsNCIsIl9yb3ciLCJfaXRlcmF0b3IiLCJfc3RlcCIsIl9tb2R1bGUyIiwiX3lpZWxkJGdsb2JhbHMkc2VxdWVsNSIsIl95aWVsZCRnbG9iYWxzJHNlcXVlbDYiLCJfdmFsdWUyIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsImNvbW1hbmQiLCJfeWllbGQkZ2xvYmFscyRzZXF1ZWw3IiwiX3lpZWxkJGdsb2JhbHMkc2VxdWVsOCIsIl92YWx1ZTMiLCJ3cmFwIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwicHJldiIsIm5leHQiLCJjb25maWciLCJnbG9iYWwiLCJPYmplY3QiLCJlbnRyaWVzIiwiZGVmYXVsdENvbmZpZyIsImxlbmd0aCIsIl9zbGljZWRUb0FycmF5MiIsInNlcXVlbGl6ZSIsIm1vZGVscyIsImZpbmRPckNyZWF0ZSIsIndoZXJlIiwiZGVmYXVsdHMiLCJzZW50IiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJtb2R1bGVzIiwidmFsdWVzIiwicyIsIm4iLCJkb25lIiwibW9kdWxlIiwibmFtZSIsImVuYWJsZWQiLCJ0MCIsImUiLCJmIiwiZmluaXNoIiwiY29tbWFuZHMiLCJ0MSIsInN0b3AiLCJleHBvcnRzIiwicHJlZml4IiwiZXZlbnRzIiwiZ3VpbGRDcmVhdGUiLCJfY2FsbGVlIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsImlkIiwicmVhZHkiLCJfY2FsbGVlMiIsImNsaWVudCIsImd1aWxkcyIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImRlZmluZSIsInR5cGUiLCJ1bmlxdWUiLCJkZWZhdWx0VmFsdWUiLCJjYXRlZ29yeSIsInN5bmMiLCJmZXRjaCIsImZvckVhY2giLCJtZXNzYWdlQ3JlYXRlIiwibWVzc2FnZSIsIl9jYWxsZWUzIiwiZ3VpbGRJZCIsInBhcmFtIiwiY29tbWFuZE5hbWUiLCJfbW9kdWxlIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiYXV0aG9yIiwidXNlciIsIm1lbWJlciIsImFicnVwdCIsImNvbnRlbnQiLCJzdGFydHNXaXRoIiwic3BsaXQiLCJ0b0xvd2VyQ2FzZSIsInN1YnN0cmluZyIsImhhcyIsImdldCIsIm1vZHVsZU5hbWUiLCJleGVjdXRlIiwiX29iamVjdFNwcmVhZCJdLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IERhdGFUeXBlcyB9ID0gcmVxdWlyZSgnc2VxdWVsaXplJylcbmNvbnN0IHsgU1RSSU5HLCBCT09MRUFOIH0gPSBEYXRhVHlwZXNcbmNvbnN0IHsgcGVybUNoZWNrIH0gPSByZXF1aXJlKCcuL3V0aWwnKVxuXG5hc3luYyBmdW5jdGlvbiBjaGVja0d1aWxkIChndWlsZCwgZ2xvYmFscykge1xuICBpZiAoIWdsb2JhbHMuY29uZmlnW2d1aWxkXSkgZ2xvYmFscy5jb25maWdbZ3VpbGRdID0ge31cbiAgaWYgKCFnbG9iYWxzLmNvbmZpZy5nbG9iYWwpIGdsb2JhbHMuY29uZmlnLmdsb2JhbCA9IHt9XG5cbiAgZm9yIChjb25zdCBbaXRlbSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGdsb2JhbHMuZGVmYXVsdENvbmZpZy5nbG9iYWwpKSB7XG4gICAgY29uc3QgW3Jvd10gPSBhd2FpdCBnbG9iYWxzLnNlcXVlbGl6ZS5tb2RlbHMuY29uZmlnLmZpbmRPckNyZWF0ZSh7IHdoZXJlOiB7IGd1aWxkOiAnZ2xvYmFsJywgaXRlbSB9LCBkZWZhdWx0czogeyB2YWx1ZSB9IH0pXG4gICAgZ2xvYmFscy5jb25maWcuZ2xvYmFsW2l0ZW1dID0gcm93LnZhbHVlXG4gIH1cblxuICBmb3IgKGNvbnN0IFtpdGVtLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZ2xvYmFscy5kZWZhdWx0Q29uZmlnLmd1aWxkKSkge1xuICAgIGNvbnN0IFtyb3ddID0gYXdhaXQgZ2xvYmFscy5zZXF1ZWxpemUubW9kZWxzLmNvbmZpZy5maW5kT3JDcmVhdGUoeyB3aGVyZTogeyBndWlsZCwgaXRlbSB9LCBkZWZhdWx0czogeyB2YWx1ZSB9IH0pXG4gICAgZ2xvYmFscy5jb25maWdbZ3VpbGRdW2l0ZW1dID0gcm93LnZhbHVlXG4gIH1cblxuICBmb3IgKGNvbnN0IG1vZHVsZSBvZiBnbG9iYWxzLm1vZHVsZXMudmFsdWVzKCkpIHtcbiAgICBjb25zdCBbeyB2YWx1ZSB9XSA9IGF3YWl0IGdsb2JhbHMuc2VxdWVsaXplLm1vZGVscy5tb2R1bGUuZmluZE9yQ3JlYXRlKHsgd2hlcmU6IHsgZ3VpbGQsIG1vZHVsZTogbW9kdWxlLm5hbWUgfSB9KVxuICAgIG1vZHVsZS5lbmFibGVkW2d1aWxkXSA9IHZhbHVlXG4gIH1cblxuICBmb3IgKGNvbnN0IGNvbW1hbmQgb2YgZ2xvYmFscy5jb21tYW5kcy52YWx1ZXMoKSkge1xuICAgIGNvbnN0IFt7IHZhbHVlIH1dID0gYXdhaXQgZ2xvYmFscy5zZXF1ZWxpemUubW9kZWxzLmNvbW1hbmQuZmluZE9yQ3JlYXRlKHsgd2hlcmU6IHsgZ3VpbGQsIGNvbW1hbmQ6IGNvbW1hbmQubmFtZSB9IH0pXG4gICAgY29tbWFuZC5lbmFibGVkW2d1aWxkXSA9IHZhbHVlXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5hbWU6ICdjb21tYW5kLWhhbmRsZXInLFxuICBjb25maWc6IHsgZ3VpbGQ6IHsgcHJlZml4OiAnPicgfSB9LFxuICBjb21tYW5kczogcmVxdWlyZSgnLi9jb21tYW5kcycpLFxuICBldmVudHM6IHtcbiAgICBhc3luYyBndWlsZENyZWF0ZSAoZ2xvYmFscywgZ3VpbGQpIHtcbiAgICAgIGF3YWl0IGNoZWNrR3VpbGQoZ3VpbGQuaWQsIGdsb2JhbHMpXG4gICAgfSxcbiAgICBhc3luYyByZWFkeSAoZ2xvYmFscykge1xuICAgICAgY29uc3QgeyBjbGllbnQsIHNlcXVlbGl6ZSB9ID0gZ2xvYmFsc1xuICAgICAgc2VxdWVsaXplLmRlZmluZSgnY29uZmlnJywge1xuICAgICAgICBndWlsZDogeyB0eXBlOiBTVFJJTkcsIHVuaXF1ZTogJ2luZGV4JyB9LFxuICAgICAgICBpdGVtOiB7IHR5cGU6IFNUUklORywgdW5pcXVlOiAnaW5kZXgnIH0sXG4gICAgICAgIHZhbHVlOiB7IHR5cGU6IFNUUklORyB9XG4gICAgICB9KVxuXG4gICAgICBzZXF1ZWxpemUuZGVmaW5lKCdtb2R1bGUnLCB7XG4gICAgICAgIGd1aWxkOiB7IHR5cGU6IFNUUklORywgdW5pcXVlOiAnaW5kZXgnIH0sXG4gICAgICAgIG1vZHVsZTogeyB0eXBlOiBTVFJJTkcsIHVuaXF1ZTogJ2luZGV4JyB9LFxuICAgICAgICB2YWx1ZTogeyB0eXBlOiBCT09MRUFOLCBkZWZhdWx0VmFsdWU6IHRydWUgfVxuICAgICAgfSlcblxuICAgICAgc2VxdWVsaXplLmRlZmluZSgnY29tbWFuZCcsIHtcbiAgICAgICAgZ3VpbGQ6IHsgdHlwZTogU1RSSU5HLCB1bmlxdWU6ICdpbmRleCcgfSxcbiAgICAgICAgY29tbWFuZDogeyB0eXBlOiBTVFJJTkcsIHVuaXF1ZTogJ2luZGV4JyB9LFxuICAgICAgICB2YWx1ZTogeyB0eXBlOiBCT09MRUFOLCBkZWZhdWx0VmFsdWU6IHRydWUgfVxuICAgICAgfSlcblxuICAgICAgc2VxdWVsaXplLmRlZmluZSgncGVybScsIHtcbiAgICAgICAgZ3VpbGQ6IFNUUklORyxcbiAgICAgICAgY29tbWFuZDogU1RSSU5HLFxuICAgICAgICBjYXRlZ29yeTogU1RSSU5HLFxuICAgICAgICB0eXBlOiBTVFJJTkcsXG4gICAgICAgIG5hbWU6IFNUUklOR1xuICAgICAgfSlcblxuICAgICAgYXdhaXQgc2VxdWVsaXplLnN5bmMoKVxuXG4gICAgICBjb25zdCBndWlsZHMgPSBhd2FpdCBjbGllbnQuZ3VpbGRzLmZldGNoKClcbiAgICAgIGd1aWxkcy5mb3JFYWNoKGd1aWxkID0+IGNoZWNrR3VpbGQoZ3VpbGQuaWQsIGdsb2JhbHMpKVxuICAgIH0sXG4gICAgYXN5bmMgbWVzc2FnZUNyZWF0ZSAoZ2xvYmFsLCBtZXNzYWdlKSB7XG4gICAgICBjb25zdCB7IGNsaWVudCwgY29tbWFuZHMsIG1vZHVsZXMsIGNvbmZpZyB9ID0gZ2xvYmFsXG4gICAgICBpZiAobWVzc2FnZS5hdXRob3IuaWQgPT09IGNsaWVudC51c2VyLmlkIHx8ICFtZXNzYWdlLm1lbWJlcikgcmV0dXJuXG5cbiAgICAgIGNvbnN0IGd1aWxkSWQgPSBtZXNzYWdlLmd1aWxkSWRcbiAgICAgIGNvbnN0IHsgcHJlZml4IH0gPSBjb25maWdbZ3VpbGRJZF1cblxuICAgICAgaWYgKG1lc3NhZ2UuY29udGVudC5zdGFydHNXaXRoKHByZWZpeCkpIHtcbiAgICAgICAgY29uc3QgcGFyYW0gPSBtZXNzYWdlLmNvbnRlbnQuc3BsaXQoJyAnKVxuICAgICAgICBjb25zdCBjb21tYW5kTmFtZSA9IHBhcmFtWzBdLnRvTG93ZXJDYXNlKCkuc3Vic3RyaW5nKHByZWZpeC5sZW5ndGgpXG5cbiAgICAgICAgaWYgKCFjb21tYW5kcy5oYXMoY29tbWFuZE5hbWUpKSByZXR1cm5cbiAgICAgICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRzLmdldChjb21tYW5kTmFtZSlcbiAgICAgICAgY29uc3QgbW9kdWxlID0gbW9kdWxlcy5nZXQoY29tbWFuZC5tb2R1bGVOYW1lKVxuXG4gICAgICAgIGlmIChtb2R1bGUuZW5hYmxlZFtndWlsZElkXSAmJiBjb21tYW5kLmVuYWJsZWRbZ3VpbGRJZF0gJiYgYXdhaXQgcGVybUNoZWNrKGNvbW1hbmQsIG1lc3NhZ2UsIGdsb2JhbCkpIHtcbiAgICAgICAgICBjb21tYW5kLmV4ZWN1dGUoeyAuLi5nbG9iYWwsIHBhcmFtIH0sIHsgbWVzc2FnZSB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLFFBQUEsR0FBc0JDLE9BQU8sQ0FBQyxXQUFXLENBQUM7RUFBbENDLFNBQVMsR0FBQUYsUUFBQSxDQUFURSxTQUFTO0FBQ2pCLElBQVFDLE1BQU0sR0FBY0QsU0FBUyxDQUE3QkMsTUFBTTtFQUFFQyxPQUFPLEdBQUtGLFNBQVMsQ0FBckJFLE9BQU87QUFDdkIsSUFBQUMsU0FBQSxHQUFzQkosT0FBTyxDQUFDLFFBQVEsQ0FBQztFQUEvQkssU0FBUyxHQUFBRCxTQUFBLENBQVRDLFNBQVM7QUFBc0IsU0FFeEJDLFVBQVVBLENBQUFDLEVBQUEsRUFBQUMsR0FBQTtFQUFBLE9BQUFDLFdBQUEsQ0FBQUMsS0FBQSxPQUFBQyxTQUFBO0FBQUE7QUFBQSxTQUFBRixZQUFBO0VBQUFBLFdBQUEsT0FBQUcsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxDQUF6QixTQUFBQyxTQUEyQkMsS0FBSyxFQUFFQyxPQUFPO0lBQUEsSUFBQUMsRUFBQSxFQUFBQyxlQUFBLEVBQUFDLGtCQUFBLEVBQUFDLElBQUEsRUFBQUMsS0FBQSxFQUFBQyxxQkFBQSxFQUFBQyxzQkFBQSxFQUFBQyxHQUFBLEVBQUFDLEdBQUEsRUFBQUMsZ0JBQUEsRUFBQUMsbUJBQUEsRUFBQUMsS0FBQSxFQUFBQyxNQUFBLEVBQUFDLHNCQUFBLEVBQUFDLHNCQUFBLEVBQUFDLElBQUEsRUFBQUMsU0FBQSxFQUFBQyxLQUFBLEVBQUFDLFFBQUEsRUFB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