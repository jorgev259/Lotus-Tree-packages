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