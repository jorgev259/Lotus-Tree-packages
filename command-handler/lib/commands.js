"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _evalCommand = function _evalCommand3() {
                  _evalCommand = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(command) {
                    var permData, channelPerms, keys, usage, _result;

                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
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
          while (1) {
            switch (_context3.prev = _context3.next) {
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
          while (1) {
            switch (_context4.prev = _context4.next) {
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
          while (1) {
            switch (_context5.prev = _context5.next) {
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
          while (1) {
            switch (_context6.prev = _context6.next) {
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
          while (1) {
            switch (_context7.prev = _context7.next) {
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
          }
        }, _callee7);
      }))();
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1aXJlIiwicGVybUNoZWNrIiwicGVybUdldCIsIm1vZHVsZSIsImV4cG9ydHMiLCJoZWxwIiwidXNhZ2UiLCJkZXNjIiwiZXhhbXBsZSIsImV4ZWN1dGUiLCJnbG9iYWxzIiwiZXZhbENvbW1hbmQiLCJjb21tYW5kIiwibWVzc2FnZSIsImNoYW5uZWwiLCJwZXJtRGF0YSIsInNlcXVlbGl6ZSIsIndoZXJlIiwidHlwZSIsImNhdGVnb3J5IiwibmFtZSIsImd1aWxkIiwiaWQiLCJjaGFubmVsUGVybXMiLCJtb2RlbHMiLCJjb25maWciLCJmaW5kQWxsIiwiYXR0cmlidXRlcyIsImdyb3VwIiwia2V5cyIsIm1hcCIsImMiLCJpdGVtIiwiam9pbiIsInJlcGxhY2UiLCJyZXN1bHQiLCJwcmVmaXgiLCJsZW5ndGgiLCJlIiwicGFyYW0iLCJjb21tYW5kcyIsInRvTG93ZXJDYXNlIiwiaGFzIiwiZ2V0Iiwic2VuZCIsImZpZWxkcyIsImVudHJpZXMiLCJ2YWx1ZSIsInB1c2giLCJlbWJlZCIsImF1dGhvciIsImVtYmVkcyIsImFib3V0IiwiY2xpZW50IiwiY29uZmlnRmlsZSIsIm1vZHVsZXMiLCJhYm91dHMiLCJ2YWx1ZXMiLCJmaWx0ZXIiLCJtIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImFwcGxpY2F0aW9uIiwiYm90UHVibGljIiwicGVybWlzc2lvbnMiLCJjb2xvciIsInRodW1ibmFpbCIsInVybCIsInBlcm1zIiwic2xpY2UiLCJwZXJtIiwibmFtZUlkIiwibWVudGlvbnMiLCJ1c2VycyIsInNpemUiLCJmaXJzdCIsImNoYW5uZWxzIiwicm9sZXMiLCJjYWNoZSIsInNvbWUiLCJyIiwiY3JlYXRlIiwiZ3VpbGRJZCIsImNvbW1hbmRMaXN0IiwiY29tbWFuZE5hbWVzIiwidmFsdWVPdXQiLCJlbmFibGVkIiwidG9nZ2xlIiwiaW5jbHVkZXMiLCJtb2RlIiwiQXJyYXkiLCJmb3JtIiwibW9kdWxlTmFtZSIsInVwZGF0ZSIsImRhdGEiXSwic291cmNlcyI6WyIuLi9zcmMvY29tbWFuZHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBwZXJtQ2hlY2ssIHBlcm1HZXQgfSA9IHJlcXVpcmUoJy4vdXRpbCcpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBoZWxwOiB7XG4gICAgdXNhZ2U6ICdoZWxwIFtjb21tYW5kXScsXG4gICAgZGVzYzogJ1RoaXMgY29tbWFuZCBkaXNwbGF5cyBpbmZvcm1hdGlvbiBhYm91dCBhIGNvbW1hbmQnLFxuICAgIGV4YW1wbGU6ICdoZWxwIHBlcm1zJyxcbiAgICBhc3luYyBleGVjdXRlIChnbG9iYWxzLCB7IG1lc3NhZ2UgfSkge1xuICAgICAgY29uc3QgeyBjb25maWcsIHBhcmFtLCBjb21tYW5kcywgc2VxdWVsaXplIH0gPSBnbG9iYWxzXG4gICAgICBjb25zdCB7IHByZWZpeCB9ID0gY29uZmlnW21lc3NhZ2UuZ3VpbGQuaWRdXG5cbiAgICAgIGFzeW5jIGZ1bmN0aW9uIGV2YWxDb21tYW5kIChjb21tYW5kKSB7XG4gICAgICAgIGNvbnN0IHBlcm1EYXRhID0gYXdhaXQgcGVybUNoZWNrKGNvbW1hbmQsIG1lc3NhZ2UsIGdsb2JhbHMsIHsgY2hhbm5lbDogdHJ1ZSB9KVxuXG4gICAgICAgIGlmIChwZXJtRGF0YSAmJiBjb21tYW5kLmRlc2MpIHtcbiAgICAgICAgICBjb25zdCBjaGFubmVsUGVybXMgPSBhd2FpdCBwZXJtR2V0KHNlcXVlbGl6ZSwge1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ2FsbG93JywgY2F0ZWdvcnk6ICdjaGFubmVsJywgY29tbWFuZDogY29tbWFuZC5uYW1lLCBndWlsZDogbWVzc2FnZS5ndWlsZC5pZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBjb25zdCBrZXlzID0gKGF3YWl0IHNlcXVlbGl6ZS5tb2RlbHMuY29uZmlnLmZpbmRBbGwoeyBhdHRyaWJ1dGVzOiBbJ2l0ZW0nXSwgZ3JvdXA6ICdpdGVtJyB9KSkubWFwKGMgPT4gYy5pdGVtKS5qb2luKCcvJylcbiAgICAgICAgICBjb25zdCB1c2FnZSA9IGNvbW1hbmQudXNhZ2UgPyBjb21tYW5kLnVzYWdlLnJlcGxhY2UoJ2xvdHVzLWNvbmZpZ3MnLCBrZXlzKSA6ICcnXG5cbiAgICAgICAgICBsZXQgcmVzdWx0ID0gYCR7Y29tbWFuZC5kZXNjfS5gXG4gICAgICAgICAgaWYgKGNvbW1hbmQudXNhZ2UpIHJlc3VsdCArPSBgXFxuVXNhZ2U6ICR7cHJlZml4fSR7dXNhZ2V9YFxuICAgICAgICAgIGlmIChjb21tYW5kLmV4YW1wbGUpIHJlc3VsdCArPSBgXFxuRXhhbXBsZTogJHtwcmVmaXh9JHtjb21tYW5kLmV4YW1wbGV9YFxuICAgICAgICAgIGlmIChjaGFubmVsUGVybXMubGVuZ3RoID4gMCkgcmVzdWx0ICs9IGBcXG4oVXNhYmxlIG9uOiAke2NoYW5uZWxQZXJtcy5tYXAoZSA9PiBgIyR7ZS5uYW1lfWApLmpvaW4oJyAnKX0pYFxuXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbVsxXSkge1xuICAgICAgICBjb25zdCBuYW1lID0gcGFyYW1bMV0udG9Mb3dlckNhc2UoKVxuICAgICAgICBpZiAoY29tbWFuZHMuaGFzKG5hbWUpICYmIChjb21tYW5kcy5nZXQobmFtZSkudXNhZ2UgfHwgY29tbWFuZHMuZ2V0KG5hbWUpLmRlc2MpKSB7XG4gICAgICAgICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRzLmdldChuYW1lKVxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV2YWxDb21tYW5kKGNvbW1hbmQpXG5cbiAgICAgICAgICBpZiAocmVzdWx0KSBtZXNzYWdlLmNoYW5uZWwuc2VuZChyZXN1bHQpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZpZWxkcyA9IFtdXG4gICAgICAgIGZvciAoY29uc3QgW25hbWUsIGNvbW1hbmRdIG9mIGNvbW1hbmRzLmVudHJpZXMoKSkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgZXZhbENvbW1hbmQoY29tbWFuZClcbiAgICAgICAgICBpZiAodmFsdWUpIGZpZWxkcy5wdXNoKHsgbmFtZSwgdmFsdWUgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVtYmVkID0geyBmaWVsZHMgfVxuICAgICAgICBtZXNzYWdlLmF1dGhvci5zZW5kKHsgZW1iZWRzOiBbZW1iZWRdIH0pXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGFib3V0OiB7XG4gICAgZGVzYzogJ0luZm8gYWJvdXQgdGhlIGJvdCcsXG4gICAgYXN5bmMgZXhlY3V0ZSAoeyBjbGllbnQsIGNvbmZpZ0ZpbGUsIG1vZHVsZXMgfSwgeyBtZXNzYWdlIH0pIHtcbiAgICAgIGNvbnN0IGFib3V0cyA9IFsuLi5tb2R1bGVzLnZhbHVlcygpXS5maWx0ZXIobSA9PiAhIW0uYWJvdXQpLm1hcChtID0+IG0uYWJvdXQpXG5cbiAgICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKHtcbiAgICAgICAgZW1iZWRzOiBbe1xuICAgICAgICAgIHRpdGxlOiAnQWJvdXQnLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgUG93ZXJlZCBieSBbTG90dXMgVHJlZV0oaHR0cHM6Ly9naXRodWIuY29tL2pvcmdldjI1OS9Mb3R1cy1UcmVlKSAoU291cmNlIGNvZGUgYXZhaWxhYmxlKS5cbiAgICAgICAgICBSZXBvcnQgYW55IGlzc3VlcyBvbiBbdGhpcyBsaW5rXShodHRwczovL2dpdGh1Yi5jb20vam9yZ2V2MjU5L0xvdHVzLVRyZWUvaXNzdWVzKS5cXG5cbiAgICAgICAgICAke2NsaWVudC5hcHBsaWNhdGlvbi5ib3RQdWJsaWMgPyBgW0FkZCBtZSB0byB5b3VyIHNlcnZlciFdKGh0dHBzOi8vZGlzY29yZGFwcC5jb20vb2F1dGgyL2F1dGhvcml6ZT9jbGllbnRfaWQ9JHtjbGllbnQuYXBwbGljYXRpb24uaWR9JnNjb3BlPWJvdCZwZXJtaXNzaW9ucz0ke2NvbmZpZ0ZpbGUucGVybWlzc2lvbnN9KWAgOiAnJ31gLFxuICAgICAgICAgIGNvbG9yOiAxNjE1MDYxNyxcbiAgICAgICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy8xMTc4MTY4ODY4MzQ4NTQyOTc2L25HZ21aSEt2XzQwMHg0MDAuanBnJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6ICdEZXZlbG9wZWQgYnknLFxuICAgICAgICAgICAgICB2YWx1ZTogJ0NoaXRvV2FybG9jayAoQ2hpdG8jMjg2OSkgKFtHaXRodWJdKGh0dHBzOi8vZ2l0aHViLmNvbS9qb3JnZXYyNTkpKSAoW1R3aXR0ZXJdKGh0dHBzOi8vdHdpdHRlci5jb20vQ2hpdG9XYXJsb2NrKSknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uYWJvdXRzLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiAnVGhyb3cgbWUgYSBib25lISBvciBzb21ldGhpbmcnLFxuICAgICAgICAgICAgICB2YWx1ZTogJ1tQYXlwYWxdKGh0dHBzOi8vcGF5cGFsLm1lL2NoaXRvd2FybG9jaykgb3IgW0tvLUZpXShodHRwczovL0tvLWZpLmNvbS9FMUU4STNWTiknXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgcGVybXM6IHtcbiAgICBkZXNjOiAnQWRkcyBhIHBlcm1pc3Npb24gZW50cnkgdG8gYSBjb21tYW5kJyxcbiAgICB1c2FnZTogJ3Blcm1zIFtjb21tYW5kIG5hbWVdIDxhbGxvdy9kZW55PiA8QHVzZXJ8cm9sZU5hbWV8I2NoYW5uZWw+JyxcbiAgICBleGFtcGxlOiAncGVybXMgY29uZmlnIGFsbG93IFN0YWZmJyxcbiAgICBhc3luYyBleGVjdXRlICh7IHNlcXVlbGl6ZSwgcGFyYW0sIGNvbW1hbmRzIH0sIHsgbWVzc2FnZSB9KSB7XG4gICAgICBpZiAocGFyYW0ubGVuZ3RoIDwgNCkgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKCdOb3QgZW5vdWdoIHBhcmFtZXRlcnMuJylcblxuICAgICAgY29uc3QgbmFtZSA9IHBhcmFtWzFdLnRvTG93ZXJDYXNlKClcbiAgICAgIGNvbnN0IHR5cGUgPSBwYXJhbVsyXS50b0xvd2VyQ2FzZSgpXG4gICAgICBwYXJhbSA9IHBhcmFtLnNsaWNlKDMpXG5cbiAgICAgIGlmICghY29tbWFuZHMuaGFzKG5hbWUpKSByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoYFxcYCR7bmFtZX1cXGAgaXMgbm90IGEgdmFsaWQgY29tbWFuZGApXG5cbiAgICAgIGNvbnN0IHsgcGVybSB9ID0gc2VxdWVsaXplLm1vZGVsc1xuICAgICAgbGV0IGNhdGVnb3J5OyBsZXQgbmFtZUlkID0gJydcblxuICAgICAgaWYgKG1lc3NhZ2UubWVudGlvbnMudXNlcnMuc2l6ZSA+IDApIHtcbiAgICAgICAgY2F0ZWdvcnkgPSAndXNlcidcbiAgICAgICAgbmFtZUlkID0gbWVzc2FnZS5tZW50aW9ucy51c2Vycy5maXJzdCgpLmlkXG4gICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UubWVudGlvbnMuY2hhbm5lbHMuc2l6ZSA+IDApIHtcbiAgICAgICAgY2F0ZWdvcnkgPSAnY2hhbm5lbCdcbiAgICAgICAgbmFtZUlkID0gbWVzc2FnZS5tZW50aW9ucy5jaGFubmVscy5maXJzdCgpLm5hbWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghbWVzc2FnZS5ndWlsZC5yb2xlcy5jYWNoZS5zb21lKHIgPT4gci5uYW1lID09PSBwYXJhbS5qb2luKCcgJykpKSByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoYFRoZSByb2xlIFxcYCR7cGFyYW0uam9pbignICcpfVxcYCBkb2VzbnQgZXhpc3QuYClcbiAgICAgICAgY2F0ZWdvcnkgPSAncm9sZSdcbiAgICAgICAgbmFtZUlkID0gcGFyYW0uam9pbignICcpXG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHBlcm0uY3JlYXRlKHsgZ3VpbGQ6IG1lc3NhZ2UuZ3VpbGRJZCwgY29tbWFuZDogbmFtZSwgY2F0ZWdvcnksIHR5cGUsIG5hbWU6IG5hbWVJZCB9KVxuICAgICAgYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoJ1Blcm1pc3Npb25zIHVwZGF0ZWQnKVxuICAgIH1cbiAgfSxcblxuICBtb2R1bGVzOiB7XG4gICAgZGVzYzogJ0Rpc3BsYXlzIGFsbCBjb21tYW5kcyBhbmQgbW9kdWxlcyBhdmFpbGFibGUnLFxuICAgIGFzeW5jIGV4ZWN1dGUgKHsgY29tbWFuZHMsIG1vZHVsZXMgfSwgeyBtZXNzYWdlIH0pIHtcbiAgICAgIGNvbnN0IGZpZWxkcyA9IFtdXG5cbiAgICAgIGZvciAoY29uc3QgbW9kdWxlIG9mIG1vZHVsZXMudmFsdWVzKCkpIHtcbiAgICAgICAgY29uc3QgY29tbWFuZExpc3QgPSBtb2R1bGUuY29tbWFuZE5hbWVzLm1hcChjID0+IGNvbW1hbmRzLmdldChjKSlcbiAgICAgICAgY29uc3QgdmFsdWVPdXQgPSBjb21tYW5kTGlzdC5tYXAoYyA9PiBgJHtjLm5hbWV9JHtjLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXSA/ICcnIDogJyAoZGlzYWJsZWQpJ31gKS5qb2luKCdcXG4nKVxuICAgICAgICBmaWVsZHMucHVzaCh7XG4gICAgICAgICAgbmFtZTogYCR7bW9kdWxlLm5hbWV9JHttb2R1bGUuZW5hYmxlZFttZXNzYWdlLmd1aWxkSWRdID8gJycgOiAnIChkaXNhYmxlZCknfWAsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlT3V0IHx8ICdcXHUyMDBCJ1xuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBjb25zdCBlbWJlZCA9IHtcbiAgICAgICAgdGl0bGU6ICdBdmFpbGFibGUgQ29tbWFuZHMgKHBlciBtb2R1bGUpJyxcbiAgICAgICAgY29sb3I6IDQxMjgzODYsXG4gICAgICAgIGZpZWxkc1xuICAgICAgfVxuICAgICAgbWVzc2FnZS5jaGFubmVsLnNlbmQoeyBlbWJlZHM6IFtlbWJlZF0gfSlcbiAgICB9XG4gIH0sXG5cbiAgdG9nZ2xlOiB7XG4gICAgdXNhZ2U6ICd0b2dnbGUgW21vZHVsZS9jb21tYW5kXSBbY29tbWFuZCBuYW1lXScsXG4gICAgZGVzYzogJ0VuYWJsZXMgb3IgZGlzYWJsZXMgYSBjb21tYW5kL21vZHVsZScsXG4gICAgZXhhbXBsZTogJ3RvZ2dsZSBjb21tYW5kIGFib3V0JyxcbiAgICBhc3luYyBleGVjdXRlICh7IGNsaWVudCwgcGFyYW0sIHNlcXVlbGl6ZSwgY29tbWFuZHMsIG1vZHVsZXMgfSwgeyBtZXNzYWdlIH0pIHtcbiAgICAgIGlmICghcGFyYW1bMl0gfHwgIVsnbW9kdWxlJywgJ2NvbW1hbmQnXS5pbmNsdWRlcyhwYXJhbVsxXS50b0xvd2VyQ2FzZSgpKSkgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKCdVc2FnZTogdG9nZ2xlIFttb2R1bGUvY29tbWFuZF0gW25hbWVdJylcblxuICAgICAgY29uc3QgbW9kZSA9IHBhcmFtWzFdLnRvTG93ZXJDYXNlKClcbiAgICAgIGNvbnN0IGlkID0gcGFyYW1bMl0udG9Mb3dlckNhc2UoKVxuICAgICAgY29uc3QgeyBtb2RlbHMgfSA9IHNlcXVlbGl6ZVxuXG4gICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgY2FzZSAnbW9kdWxlJzoge1xuICAgICAgICAgIGNvbnN0IGNvbW1hbmRMaXN0ID0gQXJyYXkuZm9ybShjb21tYW5kcy52YWx1ZXMoKSkuZmlsdGVyKGMgPT4gYy5tb2R1bGVOYW1lID09PSBpZClcbiAgICAgICAgICBpZiAoY29tbWFuZExpc3QubGVuZ3RoID09PSAwKSByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoYCR7aWR9IGlzIG5vdCBhIHZhbGlkIG1vZHVsZSBuYW1lYClcblxuICAgICAgICAgIGNvbnN0IG1vZHVsZSA9IG1vZHVsZXMuZ2V0KGlkKVxuICAgICAgICAgIGF3YWl0IG1vZGVscy5tb2R1bGUudXBkYXRlKHsgdmFsdWU6ICFtb2R1bGUuZW5hYmxlZFttZXNzYWdlLmd1aWxkSWRdIH0sIHsgd2hlcmU6IHsgbW9kdWxlOiBpZCwgZ3VpbGQ6IG1lc3NhZ2UuZ3VpbGRJZCB9IH0pXG4gICAgICAgICAgbW9kdWxlLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXSA9ICFtb2R1bGUuZW5hYmxlZFttZXNzYWdlLmd1aWxkSWRdXG5cbiAgICAgICAgICBhd2FpdCBtZXNzYWdlLmNoYW5uZWwuc2VuZChgVGhlIG1vZHVsZSAnJHtpZH0nIGhhcyBiZWVuICR7bW9kdWxlLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXSA/ICdlbmFibGVkJyA6ICdkaXNhYmxlZCd9LmApXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2NvbW1hbmQnOiB7XG4gICAgICAgICAgaWYgKCFjb21tYW5kcy5oYXMoaWQpKSByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoYCR7aWR9IGlzIG5vdCBhIHZhbGlkIGNvbW1hbmQgbmFtZS5gKVxuICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kcy5nZXQoaWQpXG4gICAgICAgICAgY29uc3QgbW9kdWxlID0gbW9kdWxlcy5nZXQoY29tbWFuZC5tb2R1bGVOYW1lKVxuXG4gICAgICAgICAgYXdhaXQgbW9kZWxzLmNvbW1hbmQudXBkYXRlKHsgdmFsdWU6ICFjb21tYW5kLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXSB9LCB7IHdoZXJlOiB7IGNvbW1hbmQ6IGlkLCBndWlsZDogbWVzc2FnZS5ndWlsZElkIH0gfSlcbiAgICAgICAgICBjb21tYW5kLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXSA9ICFjb21tYW5kLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXVxuXG4gICAgICAgICAgYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoYFRoZSBtb2R1bGUgJyR7aWR9JyBoYXMgYmVlbiAke2NvbW1hbmQuZW5hYmxlZFttZXNzYWdlLmd1aWxkSWRdID8gJ2VuYWJsZWQnIDogJ2Rpc2FibGVkJ30uJHtjb21tYW5kLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXSAmJiAhbW9kdWxlLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXSA/IGBcXG5FbmFibGUgdGhlIG1vZHVsZSAnJHttb2R1bGUubmFtZX0nIHRvIHVzZSB0aGlzIGNvbW1hbmQuYCA6ICcnfWApXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBjb25maWc6IHtcbiAgICB1c2FnZTogJ2NvbmZpZyBbbG90dXMtY29uZmlnc10gW3ZhbHVlXScsXG4gICAgZGVzYzogJ0NoYW5nZXMgYSBib3QgY29uZmlndXJhdGlvbicsXG4gICAgZXhhbXBsZTogJ2NvbmZpZyBwcmVmaXggPicsXG4gICAgYXN5bmMgZXhlY3V0ZSAoeyBwYXJhbSwgc2VxdWVsaXplLCBjb25maWcgfSwgeyBtZXNzYWdlIH0pIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBwYXJhbVsxXS50b0xvd2VyQ2FzZSgpXG4gICAgICBjb25zdCBrZXlzID0gKGF3YWl0IHNlcXVlbGl6ZS5tb2RlbHMuY29uZmlnLmZpbmRBbGwoeyBhdHRyaWJ1dGVzOiBbJ2l0ZW0nXSwgZ3JvdXA6ICdpdGVtJyB9KSkubWFwKGMgPT4gYy5pdGVtKVxuXG4gICAgICBpZiAoIWtleXMuaW5jbHVkZXMoaXRlbSkpIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChgJyR7aXRlbX0nIGlzIG5vdCBhIHZhbGlkIG9wdGlvbi4gT3B0aW9uczogJHtrZXlzLmpvaW4oJywgJyl9YClcbiAgICAgIGNvbnN0IGRhdGEgPSBwYXJhbS5zbGljZSgyKS5qb2luKCcgJylcblxuICAgICAgYXdhaXQgc2VxdWVsaXplLm1vZGVscy5jb25maWcudXBkYXRlKHsgdmFsdWU6IGRhdGEgfSwgeyB3aGVyZTogeyBndWlsZDogbWVzc2FnZS5ndWlsZElkLCBpdGVtIH0gfSlcbiAgICAgIGNvbmZpZ1ttZXNzYWdlLmd1aWxkSWRdW2l0ZW1dID0gZGF0YVxuICAgICAgYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoJ1NldHRpbmdzIHVwZGF0ZWQnKVxuICAgIH1cbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxlQUErQkEsT0FBTyxDQUFDLFFBQUQsQ0FBdEM7QUFBQSxJQUFRQyxTQUFSLFlBQVFBLFNBQVI7QUFBQSxJQUFtQkMsT0FBbkIsWUFBbUJBLE9BQW5COztBQUVBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI7RUFDZkMsSUFBSSxFQUFFO0lBQ0pDLEtBQUssRUFBRSxnQkFESDtJQUVKQyxJQUFJLEVBQUUsbURBRkY7SUFHSkMsT0FBTyxFQUFFLFlBSEw7SUFJRUMsT0FKRixtQkFJV0MsT0FKWCxRQUlpQztNQUFBO1FBQUEseURBSXBCQyxXQUpvQjs7UUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQTtrQkFBQSw2RkFJbkMsaUJBQTRCQyxPQUE1QjtvQkFBQTs7b0JBQUE7c0JBQUE7d0JBQUE7MEJBQUE7NEJBQUE7NEJBQUEsT0FDeUJYLFNBQVMsQ0FBQ1csT0FBRCxFQUFVQyxPQUFWLEVBQW1CSCxPQUFuQixFQUE0Qjs4QkFBRUksT0FBTyxFQUFFOzRCQUFYLENBQTVCLENBRGxDOzswQkFBQTs0QkFDUUMsUUFEUjs7NEJBQUEsTUFHTUEsUUFBUSxJQUFJSCxPQUFPLENBQUNMLElBSDFCOzhCQUFBOzhCQUFBOzRCQUFBOzs0QkFBQTs0QkFBQSxPQUkrQkwsT0FBTyxDQUFDYyxTQUFELEVBQVk7OEJBQzVDQyxLQUFLLEVBQUU7Z0NBQ0xDLElBQUksRUFBRSxPQUREO2dDQUNVQyxRQUFRLEVBQUUsU0FEcEI7Z0NBQytCUCxPQUFPLEVBQUVBLE9BQU8sQ0FBQ1EsSUFEaEQ7Z0NBQ3NEQyxLQUFLLEVBQUVSLE9BQU8sQ0FBQ1EsS0FBUixDQUFjQzs4QkFEM0U7NEJBRHFDLENBQVosQ0FKdEM7OzBCQUFBOzRCQUlVQyxZQUpWOzRCQUFBOzRCQUFBLE9BVXdCUCxTQUFTLENBQUNRLE1BQVYsQ0FBaUJDLE1BQWpCLENBQXdCQyxPQUF4QixD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