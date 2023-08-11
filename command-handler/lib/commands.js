"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var _require = require('./util'),
  permCheck = _require.permCheck,
  permGet = _require.permGet;
module.exports = {
  help: {
    usage: 'help [command]',
    desc: 'This command displays information about a command',
    example: 'help perms',
    execute: function execute(globals, _ref) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var message, config, param, commands, sequelize, prefix, evalCommand, _evalCommand, name, command, result, fields, _iterator, _step, _step$value, _name, _command, value, embed;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _evalCommand = function _evalCommand3() {
                _evalCommand = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(command) {
                  var permData, channelPerms, keys, usage, _result;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return permCheck(command, message, globals, {
                          channel: true
                        });
                      case 2:
                        permData = _context.sent;
                        if (!(permData && command.desc)) {
                          _context.next = 16;
                          break;
                        }
                        _context.next = 6;
                        return permGet(sequelize, {
                          where: {
                            type: 'allow',
                            category: 'channel',
                            command: command.name,
                            guild: message.guild.id
                          }
                        });
                      case 6:
                        channelPerms = _context.sent;
                        _context.next = 9;
                        return sequelize.models.config.findAll({
                          attributes: ['item'],
                          group: 'item'
                        });
                      case 9:
                        keys = _context.sent.map(function (c) {
                          return c.item;
                        }).join('/');
                        usage = command.usage ? command.usage.replace('lotus-configs', keys) : '';
                        _result = "".concat(command.desc, ".");
                        if (command.usage) _result += "\nUsage: ".concat(prefix).concat(usage);
                        if (command.example) _result += "\nExample: ".concat(prefix).concat(command.example);
                        if (channelPerms.length > 0) _result += "\n(Usable on: ".concat(channelPerms.map(function (e) {
                          return "#".concat(e.name);
                        }).join(' '), ")");
                        return _context.abrupt("return", _result);
                      case 16:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return _evalCommand.apply(this, arguments);
              };
              evalCommand = function _evalCommand2(_x) {
                return _evalCommand.apply(this, arguments);
              };
              message = _ref.message;
              config = globals.config, param = globals.param, commands = globals.commands, sequelize = globals.sequelize;
              prefix = config[message.guild.id].prefix;
              if (!param[1]) {
                _context2.next = 15;
                break;
              }
              name = param[1].toLowerCase();
              if (!(commands.has(name) && (commands.get(name).usage || commands.get(name).desc))) {
                _context2.next = 13;
                break;
              }
              command = commands.get(name);
              _context2.next = 11;
              return evalCommand(command);
            case 11:
              result = _context2.sent;
              if (result) message.channel.send(result);
            case 13:
              _context2.next = 37;
              break;
            case 15:
              fields = [];
              _iterator = _createForOfIteratorHelper(commands.entries());
              _context2.prev = 17;
              _iterator.s();
            case 19:
              if ((_step = _iterator.n()).done) {
                _context2.next = 27;
                break;
              }
              _step$value = (0, _slicedToArray2["default"])(_step.value, 2), _name = _step$value[0], _command = _step$value[1];
              _context2.next = 23;
              return evalCommand(_command);
            case 23:
              value = _context2.sent;
              if (value) fields.push({
                name: _name,
                value: value
              });
            case 25:
              _context2.next = 19;
              break;
            case 27:
              _context2.next = 32;
              break;
            case 29:
              _context2.prev = 29;
              _context2.t0 = _context2["catch"](17);
              _iterator.e(_context2.t0);
            case 32:
              _context2.prev = 32;
              _iterator.f();
              return _context2.finish(32);
            case 35:
              embed = {
                fields: fields
              };
              message.author.send({
                embeds: [embed]
              });
            case 37:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[17, 29, 32, 35]]);
      }))();
    }
  },
  about: {
    desc: 'Info about the bot',
    execute: function execute(_ref2, _ref3) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var client, configFile, modules, message, abouts;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              client = _ref2.client, configFile = _ref2.configFile, modules = _ref2.modules;
              message = _ref3.message;
              abouts = (0, _toConsumableArray2["default"])(modules.values()).filter(function (m) {
                return !!m.about;
              }).map(function (m) {
                return m.about;
              });
              message.channel.send({
                embeds: [{
                  title: 'About',
                  description: "Powered by [Lotus Tree](https://github.com/jorgev259/Lotus-Tree) (Source code available).\n          Report any issues on [this link](https://github.com/jorgev259/Lotus-Tree/issues).\n\n          ".concat(client.application.botPublic ? "[Add me to your server!](https://discordapp.com/oauth2/authorize?client_id=".concat(client.application.id, "&scope=bot&permissions=").concat(configFile.permissions, ")") : ''),
                  color: 16150617,
                  thumbnail: {
                    url: 'https://pbs.twimg.com/profile_images/1178168868348542976/nGgmZHKv_400x400.jpg'
                  },
                  fields: [{
                    name: 'Developed by',
                    value: 'ChitoWarlock (Chito#2869) ([Github](https://github.com/jorgev259)) ([Twitter](https://twitter.com/ChitoWarlock))'
                  }].concat((0, _toConsumableArray2["default"])(abouts), [{
                    name: 'Throw me a bone! or something',
                    value: '[Paypal](https://paypal.me/chitowarlock) or [Ko-Fi](https://Ko-fi.com/E1E8I3VN)'
                  }])
                }]
              });
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    }
  },
  perms: {
    desc: 'Adds a permission entry to a command',
    usage: 'perms [command name] <allow/deny> <@user|roleName|#channel>',
    example: 'perms config allow Staff',
    execute: function execute(_ref4, _ref5) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var sequelize, param, commands, message, name, type, perm, category, nameId;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              sequelize = _ref4.sequelize, param = _ref4.param, commands = _ref4.commands;
              message = _ref5.message;
              if (!(param.length < 4)) {
                _context4.next = 4;
                break;
              }
              return _context4.abrupt("return", message.channel.send('Not enough parameters.'));
            case 4:
              name = param[1].toLowerCase();
              type = param[2].toLowerCase();
              param = param.slice(3);
              if (commands.has(name)) {
                _context4.next = 9;
                break;
              }
              return _context4.abrupt("return", message.channel.send("`".concat(name, "` is not a valid command")));
            case 9:
              perm = sequelize.models.perm;
              nameId = '';
              if (!(message.mentions.users.size > 0)) {
                _context4.next = 16;
                break;
              }
              category = 'user';
              nameId = message.mentions.users.first().id;
              _context4.next = 25;
              break;
            case 16:
              if (!(message.mentions.channels.size > 0)) {
                _context4.next = 21;
                break;
              }
              category = 'channel';
              nameId = message.mentions.channels.first().name;
              _context4.next = 25;
              break;
            case 21:
              if (message.guild.roles.cache.some(function (r) {
                return r.name === param.join(' ');
              })) {
                _context4.next = 23;
                break;
              }
              return _context4.abrupt("return", message.channel.send("The role `".concat(param.join(' '), "` doesnt exist.")));
            case 23:
              category = 'role';
              nameId = param.join(' ');
            case 25:
              _context4.next = 27;
              return perm.create({
                guild: message.guildId,
                command: name,
                category: category,
                type: type,
                name: nameId
              });
            case 27:
              _context4.next = 29;
              return message.channel.send('Permissions updated');
            case 29:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    }
  },
  modules: {
    desc: 'Displays all commands and modules available',
    execute: function execute(_ref6, _ref7) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var commands, modules, message, fields, _iterator2, _step2, _module, commandList, valueOut, embed;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              commands = _ref6.commands, modules = _ref6.modules;
              message = _ref7.message;
              fields = [];
              _iterator2 = _createForOfIteratorHelper(modules.values());
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  _module = _step2.value;
                  commandList = _module.commandNames.map(function (c) {
                    return commands.get(c);
                  });
                  valueOut = commandList.map(function (c) {
                    return "".concat(c.name).concat(c.enabled[message.guildId] ? '' : ' (disabled)');
                  }).join('\n');
                  fields.push({
                    name: "".concat(_module.name).concat(_module.enabled[message.guildId] ? '' : ' (disabled)'),
                    value: valueOut || "\u200B"
                  });
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              embed = {
                title: 'Available Commands (per module)',
                color: 4128386,
                fields: fields
              };
              message.channel.send({
                embeds: [embed]
              });
            case 7:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    }
  },
  toggle: {
    usage: 'toggle [module/command] [command name]',
    desc: 'Enables or disables a command/module',
    example: 'toggle command about',
    execute: function execute(_ref8, _ref9) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var client, param, sequelize, commands, modules, message, mode, id, models, commandList, _module2, command, _module3;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              client = _ref8.client, param = _ref8.param, sequelize = _ref8.sequelize, commands = _ref8.commands, modules = _ref8.modules;
              message = _ref9.message;
              if (!(!param[2] || !['module', 'command'].includes(param[1].toLowerCase()))) {
                _context6.next = 4;
                break;
              }
              return _context6.abrupt("return", message.channel.send('Usage: toggle [module/command] [name]'));
            case 4:
              mode = param[1].toLowerCase();
              id = param[2].toLowerCase();
              models = sequelize.models;
              _context6.t0 = mode;
              _context6.next = _context6.t0 === 'module' ? 10 : _context6.t0 === 'command' ? 20 : 30;
              break;
            case 10:
              commandList = Array.form(commands.values()).filter(function (c) {
                return c.moduleName === id;
              });
              if (!(commandList.length === 0)) {
                _context6.next = 13;
                break;
              }
              return _context6.abrupt("return", message.channel.send("".concat(id, " is not a valid module name")));
            case 13:
              _module2 = modules.get(id);
              _context6.next = 16;
              return models.module.update({
                value: !_module2.enabled[message.guildId]
              }, {
                where: {
                  module: id,
                  guild: message.guildId
                }
              });
            case 16:
              _module2.enabled[message.guildId] = !_module2.enabled[message.guildId];
              _context6.next = 19;
              return message.channel.send("The module '".concat(id, "' has been ").concat(_module2.enabled[message.guildId] ? 'enabled' : 'disabled', "."));
            case 19:
              return _context6.abrupt("break", 30);
            case 20:
              if (commands.has(id)) {
                _context6.next = 22;
                break;
              }
              return _context6.abrupt("return", message.channel.send("".concat(id, " is not a valid command name.")));
            case 22:
              command = commands.get(id);
              _module3 = modules.get(command.moduleName);
              _context6.next = 26;
              return models.command.update({
                value: !command.enabled[message.guildId]
              }, {
                where: {
                  command: id,
                  guild: message.guildId
                }
              });
            case 26:
              command.enabled[message.guildId] = !command.enabled[message.guildId];
              _context6.next = 29;
              return message.channel.send("The module '".concat(id, "' has been ").concat(command.enabled[message.guildId] ? 'enabled' : 'disabled', ".").concat(command.enabled[message.guildId] && !_module3.enabled[message.guildId] ? "\nEnable the module '".concat(_module3.name, "' to use this command.") : ''));
            case 29:
              return _context6.abrupt("break", 30);
            case 30:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }))();
    }
  },
  config: {
    usage: 'config [lotus-configs] [value]',
    desc: 'Changes a bot configuration',
    example: 'config prefix >',
    execute: function execute(_ref10, _ref11) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var param, sequelize, config, message, item, keys, data;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              param = _ref10.param, sequelize = _ref10.sequelize, config = _ref10.config;
              message = _ref11.message;
              item = param[1].toLowerCase();
              _context7.next = 5;
              return sequelize.models.config.findAll({
                attributes: ['item'],
                group: 'item'
              });
            case 5:
              keys = _context7.sent.map(function (c) {
                return c.item;
              });
              if (keys.includes(item)) {
                _context7.next = 8;
                break;
              }
              return _context7.abrupt("return", message.channel.send("'".concat(item, "' is not a valid option. Options: ").concat(keys.join(', '))));
            case 8:
              data = param.slice(2).join(' ');
              _context7.next = 11;
              return sequelize.models.config.update({
                value: data
              }, {
                where: {
                  guild: message.guildId,
                  item: item
                }
              });
            case 11:
              config[message.guildId][item] = data;
              _context7.next = 14;
              return message.channel.send('Settings updated');
            case 14:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }))();
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcmVxdWlyZSIsInJlcXVpcmUiLCJwZXJtQ2hlY2siLCJwZXJtR2V0IiwibW9kdWxlIiwiZXhwb3J0cyIsImhlbHAiLCJ1c2FnZSIsImRlc2MiLCJleGFtcGxlIiwiZXhlY3V0ZSIsImdsb2JhbHMiLCJfcmVmIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUyIiwibWVzc2FnZSIsImNvbmZpZyIsInBhcmFtIiwiY29tbWFuZHMiLCJzZXF1ZWxpemUiLCJwcmVmaXgiLCJldmFsQ29tbWFuZCIsIl9ldmFsQ29tbWFuZCIsIm5hbWUiLCJjb21tYW5kIiwicmVzdWx0IiwiZmllbGRzIiwiX2l0ZXJhdG9yIiwiX3N0ZXAiLCJfc3RlcCR2YWx1ZSIsIl9uYW1lIiwiX2NvbW1hbmQiLCJ2YWx1ZSIsImVtYmVkIiwid3JhcCIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsInByZXYiLCJuZXh0IiwiX2V2YWxDb21tYW5kMyIsIl9jYWxsZWUiLCJwZXJtRGF0YSIsImNoYW5uZWxQZXJtcyIsImtleXMiLCJfcmVzdWx0IiwiX2NhbGxlZSQiLCJfY29udGV4dCIsImNoYW5uZWwiLCJzZW50Iiwid2hlcmUiLCJ0eXBlIiwiY2F0ZWdvcnkiLCJndWlsZCIsImlkIiwibW9kZWxzIiwiZmluZEFsbCIsImF0dHJpYnV0ZXMiLCJncm91cCIsIm1hcCIsImMiLCJpdGVtIiwiam9pbiIsInJlcGxhY2UiLCJjb25jYXQiLCJsZW5ndGgiLCJlIiwiYWJydXB0Iiwic3RvcCIsImFwcGx5IiwiYXJndW1lbnRzIiwiX2V2YWxDb21tYW5kMiIsIl94IiwidG9Mb3dlckNhc2UiLCJoYXMiLCJnZXQiLCJzZW5kIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJlbnRyaWVzIiwicyIsIm4iLCJkb25lIiwiX3NsaWNlZFRvQXJyYXkyIiwicHVzaCIsInQwIiwiZiIsImZpbmlzaCIsImF1dGhvciIsImVtYmVkcyIsImFib3V0IiwiX3JlZjIiLCJfcmVmMyIsIl9jYWxsZWUzIiwiY2xpZW50IiwiY29uZmlnRmlsZSIsIm1vZHVsZXMiLCJhYm91dHMiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJfdG9Db25zdW1hYmxlQXJyYXkyIiwidmFsdWVzIiwiZmlsdGVyIiwibSIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJhcHBsaWNhdGlvbiIsImJvdFB1YmxpYyIsInBlcm1pc3Npb25zIiwiY29sb3IiLCJ0aHVtYm5haWwiLCJ1cmwiLCJwZXJtcyIsIl9yZWY0IiwiX3JlZjUiLCJfY2FsbGVlNCIsInBlcm0iLCJuYW1lSWQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJzbGljZSIsIm1lbnRpb25zIiwidXNlcnMiLCJzaXplIiwiZmlyc3QiLCJjaGFubmVscyIsInJvbGVzIiwiY2FjaGUiLCJzb21lIiwiciIsImNyZWF0ZSIsImd1aWxkSWQiLCJfcmVmNiIsIl9yZWY3IiwiX2NhbGxlZTUiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwiX21vZHVsZSIsImNvbW1hbmRMaXN0IiwidmFsdWVPdXQiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJjb21tYW5kTmFtZXMiLCJlbmFibGVkIiwiZXJyIiwidG9nZ2xlIiwiX3JlZjgiLCJfcmVmOSIsIl9jYWxsZWU2IiwibW9kZSIsIl9tb2R1bGUyIiwiX21vZHVsZTMiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJpbmNsdWRlcyIsIkFycmF5IiwiZm9ybSIsIm1vZHVsZU5hbWUiLCJ1cGRhdGUiLCJfcmVmMTAiLCJfcmVmMTEiLCJfY2FsbGVlNyIsImRhdGEiLCJfY2FsbGVlNyQiLCJfY29udGV4dDciXSwic291cmNlcyI6WyIuLi9zcmMvY29tbWFuZHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBwZXJtQ2hlY2ssIHBlcm1HZXQgfSA9IHJlcXVpcmUoJy4vdXRpbCcpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBoZWxwOiB7XG4gICAgdXNhZ2U6ICdoZWxwIFtjb21tYW5kXScsXG4gICAgZGVzYzogJ1RoaXMgY29tbWFuZCBkaXNwbGF5cyBpbmZvcm1hdGlvbiBhYm91dCBhIGNvbW1hbmQnLFxuICAgIGV4YW1wbGU6ICdoZWxwIHBlcm1zJyxcbiAgICBhc3luYyBleGVjdXRlIChnbG9iYWxzLCB7IG1lc3NhZ2UgfSkge1xuICAgICAgY29uc3QgeyBjb25maWcsIHBhcmFtLCBjb21tYW5kcywgc2VxdWVsaXplIH0gPSBnbG9iYWxzXG4gICAgICBjb25zdCB7IHByZWZpeCB9ID0gY29uZmlnW21lc3NhZ2UuZ3VpbGQuaWRdXG5cbiAgICAgIGFzeW5jIGZ1bmN0aW9uIGV2YWxDb21tYW5kIChjb21tYW5kKSB7XG4gICAgICAgIGNvbnN0IHBlcm1EYXRhID0gYXdhaXQgcGVybUNoZWNrKGNvbW1hbmQsIG1lc3NhZ2UsIGdsb2JhbHMsIHsgY2hhbm5lbDogdHJ1ZSB9KVxuXG4gICAgICAgIGlmIChwZXJtRGF0YSAmJiBjb21tYW5kLmRlc2MpIHtcbiAgICAgICAgICBjb25zdCBjaGFubmVsUGVybXMgPSBhd2FpdCBwZXJtR2V0KHNlcXVlbGl6ZSwge1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ2FsbG93JywgY2F0ZWdvcnk6ICdjaGFubmVsJywgY29tbWFuZDogY29tbWFuZC5uYW1lLCBndWlsZDogbWVzc2FnZS5ndWlsZC5pZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBjb25zdCBrZXlzID0gKGF3YWl0IHNlcXVlbGl6ZS5tb2RlbHMuY29uZmlnLmZpbmRBbGwoeyBhdHRyaWJ1dGVzOiBbJ2l0ZW0nXSwgZ3JvdXA6ICdpdGVtJyB9KSkubWFwKGMgPT4gYy5pdGVtKS5qb2luKCcvJylcbiAgICAgICAgICBjb25zdCB1c2FnZSA9IGNvbW1hbmQudXNhZ2UgPyBjb21tYW5kLnVzYWdlLnJlcGxhY2UoJ2xvdHVzLWNvbmZpZ3MnLCBrZXlzKSA6ICcnXG5cbiAgICAgICAgICBsZXQgcmVzdWx0ID0gYCR7Y29tbWFuZC5kZXNjfS5gXG4gICAgICAgICAgaWYgKGNvbW1hbmQudXNhZ2UpIHJlc3VsdCArPSBgXFxuVXNhZ2U6ICR7cHJlZml4fSR7dXNhZ2V9YFxuICAgICAgICAgIGlmIChjb21tYW5kLmV4YW1wbGUpIHJlc3VsdCArPSBgXFxuRXhhbXBsZTogJHtwcmVmaXh9JHtjb21tYW5kLmV4YW1wbGV9YFxuICAgICAgICAgIGlmIChjaGFubmVsUGVybXMubGVuZ3RoID4gMCkgcmVzdWx0ICs9IGBcXG4oVXNhYmxlIG9uOiAke2NoYW5uZWxQZXJtcy5tYXAoZSA9PiBgIyR7ZS5uYW1lfWApLmpvaW4oJyAnKX0pYFxuXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbVsxXSkge1xuICAgICAgICBjb25zdCBuYW1lID0gcGFyYW1bMV0udG9Mb3dlckNhc2UoKVxuICAgICAgICBpZiAoY29tbWFuZHMuaGFzKG5hbWUpICYmIChjb21tYW5kcy5nZXQobmFtZSkudXNhZ2UgfHwgY29tbWFuZHMuZ2V0KG5hbWUpLmRlc2MpKSB7XG4gICAgICAgICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRzLmdldChuYW1lKVxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV2YWxDb21tYW5kKGNvbW1hbmQpXG5cbiAgICAgICAgICBpZiAocmVzdWx0KSBtZXNzYWdlLmNoYW5uZWwuc2VuZChyZXN1bHQpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZpZWxkcyA9IFtdXG4gICAgICAgIGZvciAoY29uc3QgW25hbWUsIGNvbW1hbmRdIG9mIGNvbW1hbmRzLmVudHJpZXMoKSkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgZXZhbENvbW1hbmQoY29tbWFuZClcbiAgICAgICAgICBpZiAodmFsdWUpIGZpZWxkcy5wdXNoKHsgbmFtZSwgdmFsdWUgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVtYmVkID0geyBmaWVsZHMgfVxuICAgICAgICBtZXNzYWdlLmF1dGhvci5zZW5kKHsgZW1iZWRzOiBbZW1iZWRdIH0pXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGFib3V0OiB7XG4gICAgZGVzYzogJ0luZm8gYWJvdXQgdGhlIGJvdCcsXG4gICAgYXN5bmMgZXhlY3V0ZSAoeyBjbGllbnQsIGNvbmZpZ0ZpbGUsIG1vZHVsZXMgfSwgeyBtZXNzYWdlIH0pIHtcbiAgICAgIGNvbnN0IGFib3V0cyA9IFsuLi5tb2R1bGVzLnZhbHVlcygpXS5maWx0ZXIobSA9PiAhIW0uYWJvdXQpLm1hcChtID0+IG0uYWJvdXQpXG5cbiAgICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKHtcbiAgICAgICAgZW1iZWRzOiBbe1xuICAgICAgICAgIHRpdGxlOiAnQWJvdXQnLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgUG93ZXJlZCBieSBbTG90dXMgVHJlZV0oaHR0cHM6Ly9naXRodWIuY29tL2pvcmdldjI1OS9Mb3R1cy1UcmVlKSAoU291cmNlIGNvZGUgYXZhaWxhYmxlKS5cbiAgICAgICAgICBSZXBvcnQgYW55IGlzc3VlcyBvbiBbdGhpcyBsaW5rXShodHRwczovL2dpdGh1Yi5jb20vam9yZ2V2MjU5L0xvdHVzLVRyZWUvaXNzdWVzKS5cXG5cbiAgICAgICAgICAke2NsaWVudC5hcHBsaWNhdGlvbi5ib3RQdWJsaWMgPyBgW0FkZCBtZSB0byB5b3VyIHNlcnZlciFdKGh0dHBzOi8vZGlzY29yZGFwcC5jb20vb2F1dGgyL2F1dGhvcml6ZT9jbGllbnRfaWQ9JHtjbGllbnQuYXBwbGljYXRpb24uaWR9JnNjb3BlPWJvdCZwZXJtaXNzaW9ucz0ke2NvbmZpZ0ZpbGUucGVybWlzc2lvbnN9KWAgOiAnJ31gLFxuICAgICAgICAgIGNvbG9yOiAxNjE1MDYxNyxcbiAgICAgICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy8xMTc4MTY4ODY4MzQ4NTQyOTc2L25HZ21aSEt2XzQwMHg0MDAuanBnJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6ICdEZXZlbG9wZWQgYnknLFxuICAgICAgICAgICAgICB2YWx1ZTogJ0NoaXRvV2FybG9jayAoQ2hpdG8jMjg2OSkgKFtHaXRodWJdKGh0dHBzOi8vZ2l0aHViLmNvbS9qb3JnZXYyNTkpKSAoW1R3aXR0ZXJdKGh0dHBzOi8vdHdpdHRlci5jb20vQ2hpdG9XYXJsb2NrKSknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uYWJvdXRzLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiAnVGhyb3cgbWUgYSBib25lISBvciBzb21ldGhpbmcnLFxuICAgICAgICAgICAgICB2YWx1ZTogJ1tQYXlwYWxdKGh0dHBzOi8vcGF5cGFsLm1lL2NoaXRvd2FybG9jaykgb3IgW0tvLUZpXShodHRwczovL0tvLWZpLmNvbS9FMUU4STNWTiknXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgcGVybXM6IHtcbiAgICBkZXNjOiAnQWRkcyBhIHBlcm1pc3Npb24gZW50cnkgdG8gYSBjb21tYW5kJyxcbiAgICB1c2FnZTogJ3Blcm1zIFtjb21tYW5kIG5hbWVdIDxhbGxvdy9kZW55PiA8QHVzZXJ8cm9sZU5hbWV8I2NoYW5uZWw+JyxcbiAgICBleGFtcGxlOiAncGVybXMgY29uZmlnIGFsbG93IFN0YWZmJyxcbiAgICBhc3luYyBleGVjdXRlICh7IHNlcXVlbGl6ZSwgcGFyYW0sIGNvbW1hbmRzIH0sIHsgbWVzc2FnZSB9KSB7XG4gICAgICBpZiAocGFyYW0ubGVuZ3RoIDwgNCkgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKCdOb3QgZW5vdWdoIHBhcmFtZXRlcnMuJylcblxuICAgICAgY29uc3QgbmFtZSA9IHBhcmFtWzFdLnRvTG93ZXJDYXNlKClcbiAgICAgIGNvbnN0IHR5cGUgPSBwYXJhbVsyXS50b0xvd2VyQ2FzZSgpXG4gICAgICBwYXJhbSA9IHBhcmFtLnNsaWNlKDMpXG5cbiAgICAgIGlmICghY29tbWFuZHMuaGFzKG5hbWUpKSByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoYFxcYCR7bmFtZX1cXGAgaXMgbm90IGEgdmFsaWQgY29tbWFuZGApXG5cbiAgICAgIGNvbnN0IHsgcGVybSB9ID0gc2VxdWVsaXplLm1vZGVsc1xuICAgICAgbGV0IGNhdGVnb3J5OyBsZXQgbmFtZUlkID0gJydcblxuICAgICAgaWYgKG1lc3NhZ2UubWVudGlvbnMudXNlcnMuc2l6ZSA+IDApIHtcbiAgICAgICAgY2F0ZWdvcnkgPSAndXNlcidcbiAgICAgICAgbmFtZUlkID0gbWVzc2FnZS5tZW50aW9ucy51c2Vycy5maXJzdCgpLmlkXG4gICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UubWVudGlvbnMuY2hhbm5lbHMuc2l6ZSA+IDApIHtcbiAgICAgICAgY2F0ZWdvcnkgPSAnY2hhbm5lbCdcbiAgICAgICAgbmFtZUlkID0gbWVzc2FnZS5tZW50aW9ucy5jaGFubmVscy5maXJzdCgpLm5hbWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghbWVzc2FnZS5ndWlsZC5yb2xlcy5jYWNoZS5zb21lKHIgPT4gci5uYW1lID09PSBwYXJhbS5qb2luKCcgJykpKSByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoYFRoZSByb2xlIFxcYCR7cGFyYW0uam9pbignICcpfVxcYCBkb2VzbnQgZXhpc3QuYClcbiAgICAgICAgY2F0ZWdvcnkgPSAncm9sZSdcbiAgICAgICAgbmFtZUlkID0gcGFyYW0uam9pbignICcpXG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHBlcm0uY3JlYXRlKHsgZ3VpbGQ6IG1lc3NhZ2UuZ3VpbGRJZCwgY29tbWFuZDogbmFtZSwgY2F0ZWdvcnksIHR5cGUsIG5hbWU6IG5hbWVJZCB9KVxuICAgICAgYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoJ1Blcm1pc3Npb25zIHVwZGF0ZWQnKVxuICAgIH1cbiAgfSxcblxuICBtb2R1bGVzOiB7XG4gICAgZGVzYzogJ0Rpc3BsYXlzIGFsbCBjb21tYW5kcyBhbmQgbW9kdWxlcyBhdmFpbGFibGUnLFxuICAgIGFzeW5jIGV4ZWN1dGUgKHsgY29tbWFuZHMsIG1vZHVsZXMgfSwgeyBtZXNzYWdlIH0pIHtcbiAgICAgIGNvbnN0IGZpZWxkcyA9IFtdXG5cbiAgICAgIGZvciAoY29uc3QgbW9kdWxlIG9mIG1vZHVsZXMudmFsdWVzKCkpIHtcbiAgICAgICAgY29uc3QgY29tbWFuZExpc3QgPSBtb2R1bGUuY29tbWFuZE5hbWVzLm1hcChjID0+IGNvbW1hbmRzLmdldChjKSlcbiAgICAgICAgY29uc3QgdmFsdWVPdXQgPSBjb21tYW5kTGlzdC5tYXAoYyA9PiBgJHtjLm5hbWV9JHtjLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXSA/ICcnIDogJyAoZGlzYWJsZWQpJ31gKS5qb2luKCdcXG4nKVxuICAgICAgICBmaWVsZHMucHVzaCh7XG4gICAgICAgICAgbmFtZTogYCR7bW9kdWxlLm5hbWV9JHttb2R1bGUuZW5hYmxlZFttZXNzYWdlLmd1aWxkSWRdID8gJycgOiAnIChkaXNhYmxlZCknfWAsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlT3V0IHx8ICdcXHUyMDBCJ1xuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBjb25zdCBlbWJlZCA9IHtcbiAgICAgICAgdGl0bGU6ICdBdmFpbGFibGUgQ29tbWFuZHMgKHBlciBtb2R1bGUpJyxcbiAgICAgICAgY29sb3I6IDQxMjgzODYsXG4gICAgICAgIGZpZWxkc1xuICAgICAgfVxuICAgICAgbWVzc2FnZS5jaGFubmVsLnNlbmQoeyBlbWJlZHM6IFtlbWJlZF0gfSlcbiAgICB9XG4gIH0sXG5cbiAgdG9nZ2xlOiB7XG4gICAgdXNhZ2U6ICd0b2dnbGUgW21vZHVsZS9jb21tYW5kXSBbY29tbWFuZCBuYW1lXScsXG4gICAgZGVzYzogJ0VuYWJsZXMgb3IgZGlzYWJsZXMgYSBjb21tYW5kL21vZHVsZScsXG4gICAgZXhhbXBsZTogJ3RvZ2dsZSBjb21tYW5kIGFib3V0JyxcbiAgICBhc3luYyBleGVjdXRlICh7IGNsaWVudCwgcGFyYW0sIHNlcXVlbGl6ZSwgY29tbWFuZHMsIG1vZHVsZXMgfSwgeyBtZXNzYWdlIH0pIHtcbiAgICAgIGlmICghcGFyYW1bMl0gfHwgIVsnbW9kdWxlJywgJ2NvbW1hbmQnXS5pbmNsdWRlcyhwYXJhbVsxXS50b0xvd2VyQ2FzZSgpKSkgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKCdVc2FnZTogdG9nZ2xlIFttb2R1bGUvY29tbWFuZF0gW25hbWVdJylcblxuICAgICAgY29uc3QgbW9kZSA9IHBhcmFtWzFdLnRvTG93ZXJDYXNlKClcbiAgICAgIGNvbnN0IGlkID0gcGFyYW1bMl0udG9Mb3dlckNhc2UoKVxuICAgICAgY29uc3QgeyBtb2RlbHMgfSA9IHNlcXVlbGl6ZVxuXG4gICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgY2FzZSAnbW9kdWxlJzoge1xuICAgICAgICAgIGNvbnN0IGNvbW1hbmRMaXN0ID0gQXJyYXkuZm9ybShjb21tYW5kcy52YWx1ZXMoKSkuZmlsdGVyKGMgPT4gYy5tb2R1bGVOYW1lID09PSBpZClcbiAgICAgICAgICBpZiAoY29tbWFuZExpc3QubGVuZ3RoID09PSAwKSByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoYCR7aWR9IGlzIG5vdCBhIHZhbGlkIG1vZHVsZSBuYW1lYClcblxuICAgICAgICAgIGNvbnN0IG1vZHVsZSA9IG1vZHVsZXMuZ2V0KGlkKVxuICAgICAgICAgIGF3YWl0IG1vZGVscy5tb2R1bGUudXBkYXRlKHsgdmFsdWU6ICFtb2R1bGUuZW5hYmxlZFttZXNzYWdlLmd1aWxkSWRdIH0sIHsgd2hlcmU6IHsgbW9kdWxlOiBpZCwgZ3VpbGQ6IG1lc3NhZ2UuZ3VpbGRJZCB9IH0pXG4gICAgICAgICAgbW9kdWxlLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXSA9ICFtb2R1bGUuZW5hYmxlZFttZXNzYWdlLmd1aWxkSWRdXG5cbiAgICAgICAgICBhd2FpdCBtZXNzYWdlLmNoYW5uZWwuc2VuZChgVGhlIG1vZHVsZSAnJHtpZH0nIGhhcyBiZWVuICR7bW9kdWxlLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXSA/ICdlbmFibGVkJyA6ICdkaXNhYmxlZCd9LmApXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2NvbW1hbmQnOiB7XG4gICAgICAgICAgaWYgKCFjb21tYW5kcy5oYXMoaWQpKSByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoYCR7aWR9IGlzIG5vdCBhIHZhbGlkIGNvbW1hbmQgbmFtZS5gKVxuICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kcy5nZXQoaWQpXG4gICAgICAgICAgY29uc3QgbW9kdWxlID0gbW9kdWxlcy5nZXQoY29tbWFuZC5tb2R1bGVOYW1lKVxuXG4gICAgICAgICAgYXdhaXQgbW9kZWxzLmNvbW1hbmQudXBkYXRlKHsgdmFsdWU6ICFjb21tYW5kLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXSB9LCB7IHdoZXJlOiB7IGNvbW1hbmQ6IGlkLCBndWlsZDogbWVzc2FnZS5ndWlsZElkIH0gfSlcbiAgICAgICAgICBjb21tYW5kLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXSA9ICFjb21tYW5kLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXVxuXG4gICAgICAgICAgYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoYFRoZSBtb2R1bGUgJyR7aWR9JyBoYXMgYmVlbiAke2NvbW1hbmQuZW5hYmxlZFttZXNzYWdlLmd1aWxkSWRdID8gJ2VuYWJsZWQnIDogJ2Rpc2FibGVkJ30uJHtjb21tYW5kLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXSAmJiAhbW9kdWxlLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXSA/IGBcXG5FbmFibGUgdGhlIG1vZHVsZSAnJHttb2R1bGUubmFtZX0nIHRvIHVzZSB0aGlzIGNvbW1hbmQuYCA6ICcnfWApXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBjb25maWc6IHtcbiAgICB1c2FnZTogJ2NvbmZpZyBbbG90dXMtY29uZmlnc10gW3ZhbHVlXScsXG4gICAgZGVzYzogJ0NoYW5nZXMgYSBib3QgY29uZmlndXJhdGlvbicsXG4gICAgZXhhbXBsZTogJ2NvbmZpZyBwcmVmaXggPicsXG4gICAgYXN5bmMgZXhlY3V0ZSAoeyBwYXJhbSwgc2VxdWVsaXplLCBjb25maWcgfSwgeyBtZXNzYWdlIH0pIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBwYXJhbVsxXS50b0xvd2VyQ2FzZSgpXG4gICAgICBjb25zdCBrZXlzID0gKGF3YWl0IHNlcXVlbGl6ZS5tb2RlbHMuY29uZmlnLmZpbmRBbGwoeyBhdHRyaWJ1dGVzOiBbJ2l0ZW0nXSwgZ3JvdXA6ICdpdGVtJyB9KSkubWFwKGMgPT4gYy5pdGVtKVxuXG4gICAgICBpZiAoIWtleXMuaW5jbHVkZXMoaXRlbSkpIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChgJyR7aXRlbX0nIGlzIG5vdCBhIHZhbGlkIG9wdGlvbi4gT3B0aW9uczogJHtrZXlzLmpvaW4oJywgJyl9YClcbiAgICAgIGNvbnN0IGRhdGEgPSBwYXJhbS5zbGljZSgyKS5qb2luKCcgJylcblxuICAgICAgYXdhaXQgc2VxdWVsaXplLm1vZGVscy5jb25maWcudXBkYXRlKHsgdmFsdWU6IGRhdGEgfSwgeyB3aGVyZTogeyBndWlsZDogbWVzc2FnZS5ndWlsZElkLCBpdGVtIH0gfSlcbiAgICAgIGNvbmZpZ1ttZXNzYWdlLmd1aWxkSWRdW2l0ZW1dID0gZGF0YVxuICAgICAgYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoJ1NldHRpbmdzIHVwZGF0ZWQnKVxuICAgIH1cbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsUUFBQSxHQUErQkMsT0FBTyxDQUFDLFFBQVEsQ0FBQztFQUF4Q0MsU0FBUyxHQUFBRixRQUFBLENBQVRFLFNBQVM7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