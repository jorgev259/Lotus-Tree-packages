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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRGF0YVR5cGVzIiwiU1RSSU5HIiwiQk9PTEVBTiIsInBlcm1DaGVjayIsImNoZWNrR3VpbGQiLCJndWlsZCIsImdsb2JhbHMiLCJjb25maWciLCJnbG9iYWwiLCJPYmplY3QiLCJlbnRyaWVzIiwiZGVmYXVsdENvbmZpZyIsIml0ZW0iLCJ2YWx1ZSIsInNlcXVlbGl6ZSIsIm1vZGVscyIsImZpbmRPckNyZWF0ZSIsIndoZXJlIiwiZGVmYXVsdHMiLCJyb3ciLCJtb2R1bGVzIiwidmFsdWVzIiwibW9kdWxlIiwibmFtZSIsImVuYWJsZWQiLCJjb21tYW5kcyIsImNvbW1hbmQiLCJleHBvcnRzIiwicHJlZml4IiwiZXZlbnRzIiwiZ3VpbGRDcmVhdGUiLCJpZCIsInJlYWR5IiwiY2xpZW50IiwiZGVmaW5lIiwidHlwZSIsInVuaXF1ZSIsImRlZmF1bHRWYWx1ZSIsImNhdGVnb3J5Iiwic3luYyIsImd1aWxkcyIsImZldGNoIiwiZm9yRWFjaCIsIm1lc3NhZ2VDcmVhdGUiLCJtZXNzYWdlIiwiYXV0aG9yIiwidXNlciIsIm1lbWJlciIsImd1aWxkSWQiLCJjb250ZW50Iiwic3RhcnRzV2l0aCIsInBhcmFtIiwic3BsaXQiLCJjb21tYW5kTmFtZSIsInRvTG93ZXJDYXNlIiwic3Vic3RyaW5nIiwibGVuZ3RoIiwiaGFzIiwiZ2V0IiwibW9kdWxlTmFtZSIsImV4ZWN1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxlQUFzQkEsT0FBTyxDQUFDLFdBQUQsQ0FBN0I7QUFBQSxJQUFRQyxTQUFSLFlBQVFBLFNBQVI7O0FBQ0EsSUFBUUMsTUFBUixHQUE0QkQsU0FBNUIsQ0FBUUMsTUFBUjtBQUFBLElBQWdCQyxPQUFoQixHQUE0QkYsU0FBNUIsQ0FBZ0JFLE9BQWhCOztBQUNBLGdCQUFzQkgsT0FBTyxDQUFDLFFBQUQsQ0FBN0I7QUFBQSxJQUFRSSxTQUFSLGFBQVFBLFNBQVI7O1NBRWVDLFU7Ozs7OzhGQUFmLGtCQUEyQkMsS0FBM0IsRUFBa0NDLE9BQWxDO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDRSxnQkFBSSxDQUFDQSxPQUFPLENBQUNDLE1BQVIsQ0FBZUYsS0FBZixDQUFMLEVBQTRCQyxPQUFPLENBQUNDLE1BQVIsQ0FBZUYsS0FBZixJQUF3QixFQUF4QjtBQUM1QixnQkFBSSxDQUFDQyxPQUFPLENBQUNDLE1BQVIsQ0FBZUMsTUFBcEIsRUFBNEJGLE9BQU8sQ0FBQ0MsTUFBUixDQUFlQyxNQUFmLEdBQXdCLEVBQXhCO0FBRjlCLHNDQUk4QkMsTUFBTSxDQUFDQyxPQUFQLENBQWVKLE9BQU8sQ0FBQ0ssYUFBUixDQUFzQkgsTUFBckMsQ0FKOUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQSwwRkFJY0ksSUFKZCwwQkFJb0JDLEtBSnBCO0FBQUE7QUFBQSxtQkFLd0JQLE9BQU8sQ0FBQ1EsU0FBUixDQUFrQkMsTUFBbEIsQ0FBeUJSLE1BQXpCLENBQWdDUyxZQUFoQyxDQUE2QztBQUFFQyxjQUFBQSxLQUFLLEVBQUU7QUFBRVosZ0JBQUFBLEtBQUssRUFBRSxRQUFUO0FBQW1CTyxnQkFBQUEsSUFBSSxFQUFKQTtBQUFuQixlQUFUO0FBQW9DTSxjQUFBQSxRQUFRLEVBQUU7QUFBRUwsZ0JBQUFBLEtBQUssRUFBTEE7QUFBRjtBQUE5QyxhQUE3QyxDQUx4Qjs7QUFBQTtBQUFBO0FBQUE7QUFLV00sWUFBQUEsR0FMWDtBQU1JYixZQUFBQSxPQUFPLENBQUNDLE1BQVIsQ0FBZUMsTUFBZixDQUFzQkksSUFBdEIsSUFBOEJPLEdBQUcsQ0FBQ04sS0FBbEM7O0FBTko7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSx3Q0FTOEJKLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlSixPQUFPLENBQUNLLGFBQVIsQ0FBc0JOLEtBQXJDLENBVDlCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsNkZBU2NPLEtBVGQsMkJBU29CQyxNQVRwQjtBQUFBO0FBQUEsbUJBVXdCUCxPQUFPLENBQUNRLFNBQVIsQ0FBa0JDLE1BQWxCLENBQXlCUixNQUF6QixDQUFnQ1MsWUFBaEMsQ0FBNkM7QUFBRUMsY0FBQUEsS0FBSyxFQUFFO0FBQUVaLGdCQUFBQSxLQUFLLEVBQUxBLEtBQUY7QUFBU08sZ0JBQUFBLElBQUksRUFBSkE7QUFBVCxlQUFUO0FBQTBCTSxjQUFBQSxRQUFRLEVBQUU7QUFBRUwsZ0JBQUFBLEtBQUssRUFBTEE7QUFBRjtBQUFwQyxhQUE3QyxDQVZ4Qjs7QUFBQTtBQUFBO0FBQUE7QUFVV00sWUFBQUEsSUFWWDtBQVdJYixZQUFBQSxPQUFPLENBQUNDLE1BQVIsQ0FBZUYsS0FBZixFQUFzQk8sS0FBdEIsSUFBOEJPLElBQUcsQ0FBQ04sS0FBbEM7O0FBWEo7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxtREFjdUJQLE9BQU8sQ0FBQ2MsT0FBUixDQUFnQkMsTUFBaEIsRUFkdkI7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWNhQyxZQUFBQSxRQWRiO0FBQUE7QUFBQSxtQkFlOEJoQixPQUFPLENBQUNRLFNBQVIsQ0FBa0JDLE1BQWxCLENBQXlCTyxNQUF6QixDQUFnQ04sWUFBaEMsQ0FBNkM7QUFBRUMsY0FBQUEsS0FBSyxFQUFFO0FBQUVaLGdCQUFBQSxLQUFLLEVBQUxBLEtBQUY7QUFBU2lCLGdCQUFBQSxNQUFNLEVBQUVBLFFBQU0sQ0FBQ0M7QUFBeEI7QUFBVCxhQUE3QyxDQWY5Qjs7QUFBQTtBQUFBO0FBQUE7QUFlYVYsWUFBQUEsT0FmYiw2QkFlYUEsS0FmYjtBQWdCSVMsWUFBQUEsUUFBTSxDQUFDRSxPQUFQLENBQWVuQixLQUFmLElBQXdCUSxPQUF4Qjs7QUFoQko7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTtBQUFBLG9EQW1Cd0JQLE9BQU8sQ0FBQ21CLFFBQVIsQ0FBaUJKLE1BQWpCLEVBbkJ4QjtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBbUJhSyxZQUFBQSxPQW5CYjtBQUFBO0FBQUEsbUJBb0I4QnBCLE9BQU8sQ0FBQ1EsU0FBUixDQUFrQkMsTUFBbEIsQ0FBeUJXLE9BQXpCLENBQWlDVixZQUFqQyxDQUE4QztBQUFFQyxjQUFBQSxLQUFLLEVBQUU7QUFBRVosZ0JBQUFBLEtBQUssRUFBTEEsS0FBRjtBQUFTcUIsZ0JBQUFBLE9BQU8sRUFBRUEsT0FBTyxDQUFDSDtBQUExQjtBQUFULGFBQTlDLENBcEI5Qjs7QUFBQTtBQUFBO0FBQUE7QUFvQmFWLFlBQUFBLE9BcEJiLDZCQW9CYUEsS0FwQmI7QUFxQklhLFlBQUFBLE9BQU8sQ0FBQ0YsT0FBUixDQUFnQm5CLEtBQWhCLElBQXlCUSxPQUF6Qjs7QUFyQko7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBeUJBUyxNQUFNLENBQUNLLE9BQVAsR0FBaUI7QUFDZkosRUFBQUEsSUFBSSxFQUFFLGlCQURTO0FBRWZoQixFQUFBQSxNQUFNLEVBQUU7QUFBRUYsSUFBQUEsS0FBSyxFQUFFO0FBQUV1QixNQUFBQSxNQUFNLEVBQUU7QUFBVjtBQUFULEdBRk87QUFHZkgsRUFBQUEsUUFBUSxFQUFFMUIsT0FBTyxDQUFDLFlBQUQsQ0FIRjtBQUlmOEIsRUFBQUEsTUFBTSxFQUFFO0FBQ0FDLElBQUFBLFdBREEsdUJBQ2F4QixPQURiLEVBQ3NCRCxLQUR0QixFQUM2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUMzQkQsVUFBVSxDQUFDQyxLQUFLLENBQUMwQixFQUFQLEVBQVd6QixPQUFYLENBRGlCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRWxDLEtBSEs7QUFJQTBCLElBQUFBLEtBSkEsaUJBSU8xQixPQUpQLEVBSWdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1oyQixnQkFBQUEsTUFEWSxHQUNVM0IsT0FEVixDQUNaMkIsTUFEWSxFQUNKbkIsU0FESSxHQUNVUixPQURWLENBQ0pRLFNBREk7QUFFcEJBLGdCQUFBQSxTQUFTLENBQUNvQixNQUFWLENBQWlCLFFBQWpCLEVBQTJCO0FBQ3pCN0Isa0JBQUFBLEtBQUssRUFBRTtBQUFFOEIsb0JBQUFBLElBQUksRUFBRWxDLE1BQVI7QUFBZ0JtQyxvQkFBQUEsTUFBTSxFQUFFO0FBQXhCLG1CQURrQjtBQUV6QnhCLGtCQUFBQSxJQUFJLEVBQUU7QUFBRXVCLG9CQUFBQSxJQUFJLEVBQUVsQyxNQUFSO0FBQWdCbUMsb0JBQUFBLE1BQU0sRUFBRTtBQUF4QixtQkFGbUI7QUFHekJ2QixrQkFBQUEsS0FBSyxFQUFFO0FBQUVzQixvQkFBQUEsSUFBSSxFQUFFbEM7QUFBUjtBQUhrQixpQkFBM0I7QUFNQWEsZ0JBQUFBLFNBQVMsQ0FBQ29CLE1BQVYsQ0FBaUIsUUFBakIsRUFBMkI7QUFDekI3QixrQkFBQUEsS0FBSyxFQUFFO0FBQUU4QixvQkFBQUEsSUFBSSxFQUFFbEMsTUFBUjtBQUFnQm1DLG9CQUFBQSxNQUFNLEVBQUU7QUFBeEIsbUJBRGtCO0FBRXpCZCxrQkFBQUEsTUFBTSxFQUFFO0FBQUVhLG9CQUFBQSxJQUFJLEVBQUVsQyxNQUFSO0FBQWdCbUMsb0JBQUFBLE1BQU0sRUFBRTtBQUF4QixtQkFGaUI7QUFHekJ2QixrQkFBQUEsS0FBSyxFQUFFO0FBQUVzQixvQkFBQUEsSUFBSSxFQUFFakMsT0FBUjtBQUFpQm1DLG9CQUFBQSxZQUFZLEVBQUU7QUFBL0I7QUFIa0IsaUJBQTNCO0FBTUF2QixnQkFBQUEsU0FBUyxDQUFDb0IsTUFBVixDQUFpQixTQUFqQixFQUE0QjtBQUMxQjdCLGtCQUFBQSxLQUFLLEVBQUU7QUFBRThCLG9CQUFBQSxJQUFJLEVBQUVsQyxNQUFSO0FBQWdCbUMsb0JBQUFBLE1BQU0sRUFBRTtBQUF4QixtQkFEbUI7QUFFMUJWLGtCQUFBQSxPQUFPLEVBQUU7QUFBRVMsb0JBQUFBLElBQUksRUFBRWxDLE1BQVI7QUFBZ0JtQyxvQkFBQUEsTUFBTSxFQUFFO0FBQXhCLG1CQUZpQjtBQUcxQnZCLGtCQUFBQSxLQUFLLEVBQUU7QUFBRXNCLG9CQUFBQSxJQUFJLEVBQUVqQyxPQUFSO0FBQWlCbUMsb0JBQUFBLFlBQVksRUFBRTtBQUEvQjtBQUhtQixpQkFBNUI7QUFNQXZCLGdCQUFBQSxTQUFTLENBQUNvQixNQUFWLENBQWlCLE1BQWpCLEVBQXlCO0FBQ3ZCN0Isa0JBQUFBLEtBQUssRUFBRUosTUFEZ0I7QUFFdkJ5QixrQkFBQUEsT0FBTyxFQUFFekIsTUFGYztBQUd2QnFDLGtCQUFBQSxRQUFRLEVBQUVyQyxNQUhhO0FBSXZCa0Msa0JBQUFBLElBQUksRUFBRWxDLE1BSmlCO0FBS3ZCc0Isa0JBQUFBLElBQUksRUFBRXRCO0FBTGlCLGlCQUF6QjtBQXBCb0I7QUFBQSx1QkE0QmRhLFNBQVMsQ0FBQ3lCLElBQVYsRUE1QmM7O0FBQUE7QUFBQTtBQUFBLHVCQThCQ04sTUFBTSxDQUFDTyxNQUFQLENBQWNDLEtBQWQsRUE5QkQ7O0FBQUE7QUE4QmRELGdCQUFBQSxNQTlCYztBQStCcEJBLGdCQUFBQSxNQUFNLENBQUNFLE9BQVAsQ0FBZSxVQUFBckMsS0FBSztBQUFBLHlCQUFJRCxVQUFVLENBQUNDLEtBQUssQ0FBQzBCLEVBQVAsRUFBV3pCLE9BQVgsQ0FBZDtBQUFBLGlCQUFwQjs7QUEvQm9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZ0NyQixLQXBDSztBQXFDQXFDLElBQUFBLGFBckNBLHlCQXFDZW5DLE1BckNmLEVBcUN1Qm9DLE9BckN2QixFQXFDZ0M7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQzVCWCxnQkFBQUEsTUFENEIsR0FDVXpCLE1BRFYsQ0FDNUJ5QixNQUQ0QixFQUNwQlIsUUFEb0IsR0FDVWpCLE1BRFYsQ0FDcEJpQixRQURvQixFQUNWTCxPQURVLEdBQ1VaLE1BRFYsQ0FDVlksT0FEVSxFQUNEYixNQURDLEdBQ1VDLE1BRFYsQ0FDREQsTUFEQzs7QUFBQSxzQkFFaENxQyxPQUFPLENBQUNDLE1BQVIsQ0FBZWQsRUFBZixLQUFzQkUsTUFBTSxDQUFDYSxJQUFQLENBQVlmLEVBQWxDLElBQXdDLENBQUNhLE9BQU8sQ0FBQ0csTUFGakI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFJOUJDLGdCQUFBQSxPQUo4QixHQUlwQkosT0FBTyxDQUFDSSxPQUpZO0FBSzVCcEIsZ0JBQUFBLE1BTDRCLEdBS2pCckIsTUFBTSxDQUFDeUMsT0FBRCxDQUxXLENBSzVCcEIsTUFMNEI7O0FBQUEscUJBT2hDZ0IsT0FBTyxDQUFDSyxPQUFSLENBQWdCQyxVQUFoQixDQUEyQnRCLE1BQTNCLENBUGdDO0FBQUE7QUFBQTtBQUFBOztBQVE1QnVCLGdCQUFBQSxLQVI0QixHQVFwQlAsT0FBTyxDQUFDSyxPQUFSLENBQWdCRyxLQUFoQixDQUFzQixHQUF0QixDQVJvQjtBQVM1QkMsZ0JBQUFBLFdBVDRCLEdBU2RGLEtBQUssQ0FBQyxDQUFELENBQUwsQ0FBU0csV0FBVCxHQUF1QkMsU0FBdkIsQ0FBaUMzQixNQUFNLENBQUM0QixNQUF4QyxDQVRjOztBQUFBLG9CQVc3Qi9CLFFBQVEsQ0FBQ2dDLEdBQVQsQ0FBYUosV0FBYixDQVg2QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQVk1QjNCLGdCQUFBQSxPQVo0QixHQVlsQkQsUUFBUSxDQUFDaUMsR0FBVCxDQUFhTCxXQUFiLENBWmtCO0FBYTVCL0IsZ0JBQUFBLE9BYjRCLEdBYW5CRixPQUFPLENBQUNzQyxHQUFSLENBQVloQyxPQUFPLENBQUNpQyxVQUFwQixDQWJtQjtBQUFBLCtCQWU5QnJDLE9BQU0sQ0FBQ0UsT0FBUCxDQUFld0IsT0FBZixLQUEyQnRCLE9BQU8sQ0FBQ0YsT0FBUixDQUFnQndCLE9BQWhCLENBZkc7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSx1QkFlK0I3QyxTQUFTLENBQUN1QixPQUFELEVBQVVrQixPQUFWLEVBQW1CcEMsTUFBbkIsQ0FmeEM7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWdCaENrQixnQkFBQUEsT0FBTyxDQUFDa0MsT0FBUixpQ0FBcUJwRCxNQUFyQjtBQUE2QjJDLGtCQUFBQSxLQUFLLEVBQUxBO0FBQTdCLG9CQUFzQztBQUFFUCxrQkFBQUEsT0FBTyxFQUFQQTtBQUFGLGlCQUF0Qzs7QUFoQmdDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBbUJyQztBQXhESztBQUpPLENBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBEYXRhVHlwZXMgfSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpXG5jb25zdCB7IFNUUklORywgQk9PTEVBTiB9ID0gRGF0YVR5cGVzXG5jb25zdCB7IHBlcm1DaGVjayB9ID0gcmVxdWlyZSgnLi91dGlsJylcblxuYXN5bmMgZnVuY3Rpb24gY2hlY2tHdWlsZCAoZ3VpbGQsIGdsb2JhbHMpIHtcbiAgaWYgKCFnbG9iYWxzLmNvbmZpZ1tndWlsZF0pIGdsb2JhbHMuY29uZmlnW2d1aWxkXSA9IHt9XG4gIGlmICghZ2xvYmFscy5jb25maWcuZ2xvYmFsKSBnbG9iYWxzLmNvbmZpZy5nbG9iYWwgPSB7fVxuXG4gIGZvciAoY29uc3QgW2l0ZW0sIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhnbG9iYWxzLmRlZmF1bHRDb25maWcuZ2xvYmFsKSkge1xuICAgIGNvbnN0IFtyb3ddID0gYXdhaXQgZ2xvYmFscy5zZXF1ZWxpemUubW9kZWxzLmNvbmZpZy5maW5kT3JDcmVhdGUoeyB3aGVyZTogeyBndWlsZDogJ2dsb2JhbCcsIGl0ZW0gfSwgZGVmYXVsdHM6IHsgdmFsdWUgfSB9KVxuICAgIGdsb2JhbHMuY29uZmlnLmdsb2JhbFtpdGVtXSA9IHJvdy52YWx1ZVxuICB9XG5cbiAgZm9yIChjb25zdCBbaXRlbSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGdsb2JhbHMuZGVmYXVsdENvbmZpZy5ndWlsZCkpIHtcbiAgICBjb25zdCBbcm93XSA9IGF3YWl0IGdsb2JhbHMuc2VxdWVsaXplLm1vZGVscy5jb25maWcuZmluZE9yQ3JlYXRlKHsgd2hlcmU6IHsgZ3VpbGQsIGl0ZW0gfSwgZGVmYXVsdHM6IHsgdmFsdWUgfSB9KVxuICAgIGdsb2JhbHMuY29uZmlnW2d1aWxkXVtpdGVtXSA9IHJvdy52YWx1ZVxuICB9XG5cbiAgZm9yIChjb25zdCBtb2R1bGUgb2YgZ2xvYmFscy5tb2R1bGVzLnZhbHVlcygpKSB7XG4gICAgY29uc3QgW3sgdmFsdWUgfV0gPSBhd2FpdCBnbG9iYWxzLnNlcXVlbGl6ZS5tb2RlbHMubW9kdWxlLmZpbmRPckNyZWF0ZSh7IHdoZXJlOiB7IGd1aWxkLCBtb2R1bGU6IG1vZHVsZS5uYW1lIH0gfSlcbiAgICBtb2R1bGUuZW5hYmxlZFtndWlsZF0gPSB2YWx1ZVxuICB9XG5cbiAgZm9yIChjb25zdCBjb21tYW5kIG9mIGdsb2JhbHMuY29tbWFuZHMudmFsdWVzKCkpIHtcbiAgICBjb25zdCBbeyB2YWx1ZSB9XSA9IGF3YWl0IGdsb2JhbHMuc2VxdWVsaXplLm1vZGVscy5jb21tYW5kLmZpbmRPckNyZWF0ZSh7IHdoZXJlOiB7IGd1aWxkLCBjb21tYW5kOiBjb21tYW5kLm5hbWUgfSB9KVxuICAgIGNvbW1hbmQuZW5hYmxlZFtndWlsZF0gPSB2YWx1ZVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBuYW1lOiAnY29tbWFuZC1oYW5kbGVyJyxcbiAgY29uZmlnOiB7IGd1aWxkOiB7IHByZWZpeDogJz4nIH0gfSxcbiAgY29tbWFuZHM6IHJlcXVpcmUoJy4vY29tbWFuZHMnKSxcbiAgZXZlbnRzOiB7XG4gICAgYXN5bmMgZ3VpbGRDcmVhdGUgKGdsb2JhbHMsIGd1aWxkKSB7XG4gICAgICBhd2FpdCBjaGVja0d1aWxkKGd1aWxkLmlkLCBnbG9iYWxzKVxuICAgIH0sXG4gICAgYXN5bmMgcmVhZHkgKGdsb2JhbHMpIHtcbiAgICAgIGNvbnN0IHsgY2xpZW50LCBzZXF1ZWxpemUgfSA9IGdsb2JhbHNcbiAgICAgIHNlcXVlbGl6ZS5kZWZpbmUoJ2NvbmZpZycsIHtcbiAgICAgICAgZ3VpbGQ6IHsgdHlwZTogU1RSSU5HLCB1bmlxdWU6ICdpbmRleCcgfSxcbiAgICAgICAgaXRlbTogeyB0eXBlOiBTVFJJTkcsIHVuaXF1ZTogJ2luZGV4JyB9LFxuICAgICAgICB2YWx1ZTogeyB0eXBlOiBTVFJJTkcgfVxuICAgICAgfSlcblxuICAgICAgc2VxdWVsaXplLmRlZmluZSgnbW9kdWxlJywge1xuICAgICAgICBndWlsZDogeyB0eXBlOiBTVFJJTkcsIHVuaXF1ZTogJ2luZGV4JyB9LFxuICAgICAgICBtb2R1bGU6IHsgdHlwZTogU1RSSU5HLCB1bmlxdWU6ICdpbmRleCcgfSxcbiAgICAgICAgdmFsdWU6IHsgdHlwZTogQk9PTEVBTiwgZGVmYXVsdFZhbHVlOiB0cnVlIH1cbiAgICAgIH0pXG5cbiAgICAgIHNlcXVlbGl6ZS5kZWZpbmUoJ2NvbW1hbmQnLCB7XG4gICAgICAgIGd1aWxkOiB7IHR5cGU6IFNUUklORywgdW5pcXVlOiAnaW5kZXgnIH0sXG4gICAgICAgIGNvbW1hbmQ6IHsgdHlwZTogU1RSSU5HLCB1bmlxdWU6ICdpbmRleCcgfSxcbiAgICAgICAgdmFsdWU6IHsgdHlwZTogQk9PTEVBTiwgZGVmYXVsdFZhbHVlOiB0cnVlIH1cbiAgICAgIH0pXG5cbiAgICAgIHNlcXVlbGl6ZS5kZWZpbmUoJ3Blcm0nLCB7XG4gICAgICAgIGd1aWxkOiBTVFJJTkcsXG4gICAgICAgIGNvbW1hbmQ6IFNUUklORyxcbiAgICAgICAgY2F0ZWdvcnk6IFNUUklORyxcbiAgICAgICAgdHlwZTogU1RSSU5HLFxuICAgICAgICBuYW1lOiBTVFJJTkdcbiAgICAgIH0pXG5cbiAgICAgIGF3YWl0IHNlcXVlbGl6ZS5zeW5jKClcblxuICAgICAgY29uc3QgZ3VpbGRzID0gYXdhaXQgY2xpZW50Lmd1aWxkcy5mZXRjaCgpXG4gICAgICBndWlsZHMuZm9yRWFjaChndWlsZCA9PiBjaGVja0d1aWxkKGd1aWxkLmlkLCBnbG9iYWxzKSlcbiAgICB9LFxuICAgIGFzeW5jIG1lc3NhZ2VDcmVhdGUgKGdsb2JhbCwgbWVzc2FnZSkge1xuICAgICAgY29uc3QgeyBjbGllbnQsIGNvbW1hbmRzLCBtb2R1bGVzLCBjb25maWcgfSA9IGdsb2JhbFxuICAgICAgaWYgKG1lc3NhZ2UuYXV0aG9yLmlkID09PSBjbGllbnQudXNlci5pZCB8fCAhbWVzc2FnZS5tZW1iZXIpIHJldHVyblxuXG4gICAgICBjb25zdCBndWlsZElkID0gbWVzc2FnZS5ndWlsZElkXG4gICAgICBjb25zdCB7IHByZWZpeCB9ID0gY29uZmlnW2d1aWxkSWRdXG5cbiAgICAgIGlmIChtZXNzYWdlLmNvbnRlbnQuc3RhcnRzV2l0aChwcmVmaXgpKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtID0gbWVzc2FnZS5jb250ZW50LnNwbGl0KCcgJylcbiAgICAgICAgY29uc3QgY29tbWFuZE5hbWUgPSBwYXJhbVswXS50b0xvd2VyQ2FzZSgpLnN1YnN0cmluZyhwcmVmaXgubGVuZ3RoKVxuXG4gICAgICAgIGlmICghY29tbWFuZHMuaGFzKGNvbW1hbmROYW1lKSkgcmV0dXJuXG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kcy5nZXQoY29tbWFuZE5hbWUpXG4gICAgICAgIGNvbnN0IG1vZHVsZSA9IG1vZHVsZXMuZ2V0KGNvbW1hbmQubW9kdWxlTmFtZSlcblxuICAgICAgICBpZiAobW9kdWxlLmVuYWJsZWRbZ3VpbGRJZF0gJiYgY29tbWFuZC5lbmFibGVkW2d1aWxkSWRdICYmIGF3YWl0IHBlcm1DaGVjayhjb21tYW5kLCBtZXNzYWdlLCBnbG9iYWwpKSB7XG4gICAgICAgICAgY29tbWFuZC5leGVjdXRlKHsgLi4uZ2xvYmFsLCBwYXJhbSB9LCB7IG1lc3NhZ2UgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19