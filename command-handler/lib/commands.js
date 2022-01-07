"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

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
        var client, configFile, message;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                client = _ref2.client, configFile = _ref2.configFile;
                message = _ref3.message;
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
                    }, {
                      name: 'Throw me a bone! or something',
                      value: '[Paypal](https://paypal.me/chitowarlock) or [Ko-Fi](https://Ko-fi.com/E1E8I3VN)'
                    }]
                  }]
                });

              case 3:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tYW5kcy5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwicGVybUNoZWNrIiwicGVybUdldCIsIm1vZHVsZSIsImV4cG9ydHMiLCJoZWxwIiwidXNhZ2UiLCJkZXNjIiwiZXhhbXBsZSIsImV4ZWN1dGUiLCJnbG9iYWxzIiwiZXZhbENvbW1hbmQiLCJjb21tYW5kIiwibWVzc2FnZSIsImNoYW5uZWwiLCJwZXJtRGF0YSIsInNlcXVlbGl6ZSIsIndoZXJlIiwidHlwZSIsImNhdGVnb3J5IiwibmFtZSIsImd1aWxkIiwiaWQiLCJjaGFubmVsUGVybXMiLCJtb2RlbHMiLCJjb25maWciLCJmaW5kQWxsIiwiYXR0cmlidXRlcyIsImdyb3VwIiwia2V5cyIsIm1hcCIsImMiLCJpdGVtIiwiam9pbiIsInJlcGxhY2UiLCJyZXN1bHQiLCJwcmVmaXgiLCJsZW5ndGgiLCJlIiwicGFyYW0iLCJjb21tYW5kcyIsInRvTG93ZXJDYXNlIiwiaGFzIiwiZ2V0Iiwic2VuZCIsImZpZWxkcyIsImVudHJpZXMiLCJ2YWx1ZSIsInB1c2giLCJlbWJlZCIsImF1dGhvciIsImVtYmVkcyIsImFib3V0IiwiY2xpZW50IiwiY29uZmlnRmlsZSIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJhcHBsaWNhdGlvbiIsImJvdFB1YmxpYyIsInBlcm1pc3Npb25zIiwiY29sb3IiLCJ0aHVtYm5haWwiLCJ1cmwiLCJwZXJtcyIsInNsaWNlIiwicGVybSIsIm5hbWVJZCIsIm1lbnRpb25zIiwidXNlcnMiLCJzaXplIiwiZmlyc3QiLCJjaGFubmVscyIsInJvbGVzIiwiY2FjaGUiLCJzb21lIiwiciIsImNyZWF0ZSIsImd1aWxkSWQiLCJtb2R1bGVzIiwidmFsdWVzIiwiY29tbWFuZExpc3QiLCJjb21tYW5kTmFtZXMiLCJ2YWx1ZU91dCIsImVuYWJsZWQiLCJ0b2dnbGUiLCJpbmNsdWRlcyIsIm1vZGUiLCJBcnJheSIsImZvcm0iLCJmaWx0ZXIiLCJtb2R1bGVOYW1lIiwidXBkYXRl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QWpCO0FBQTBCN0Msb0JBQUFBLElBQUksRUFBSkE7QUFBMUI7QUFBVCxpQkFBaEQsQ0FQa0Q7O0FBQUE7QUFReERQLGdCQUFBQSxNQUFNLENBQUNaLE9BQU8sQ0FBQ2dFLE9BQVQsQ0FBTixDQUF3QjdDLElBQXhCLElBQWdDNEQsSUFBaEM7QUFSd0Q7QUFBQSx1QkFTbEQvRSxPQUFPLENBQUNDLE9BQVIsQ0FBZ0I4QixJQUFoQixDQUFxQixrQkFBckIsQ0FUa0Q7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVekQ7QUFkSztBQS9LTyxDQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgcGVybUNoZWNrLCBwZXJtR2V0IH0gPSByZXF1aXJlKCcuL3V0aWwnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgaGVscDoge1xyXG4gICAgdXNhZ2U6ICdoZWxwIFtjb21tYW5kXScsXHJcbiAgICBkZXNjOiAnVGhpcyBjb21tYW5kIGRpc3BsYXlzIGluZm9ybWF0aW9uIGFib3V0IGEgY29tbWFuZCcsXHJcbiAgICBleGFtcGxlOiAnaGVscCBwZXJtcycsXHJcbiAgICBhc3luYyBleGVjdXRlIChnbG9iYWxzLCB7IG1lc3NhZ2UgfSkge1xyXG4gICAgICBjb25zdCB7IGNvbmZpZywgcGFyYW0sIGNvbW1hbmRzLCBzZXF1ZWxpemUgfSA9IGdsb2JhbHNcclxuICAgICAgY29uc3QgeyBwcmVmaXggfSA9IGNvbmZpZ1ttZXNzYWdlLmd1aWxkLmlkXVxyXG5cclxuICAgICAgYXN5bmMgZnVuY3Rpb24gZXZhbENvbW1hbmQgKGNvbW1hbmQpIHtcclxuICAgICAgICBjb25zdCBwZXJtRGF0YSA9IGF3YWl0IHBlcm1DaGVjayhjb21tYW5kLCBtZXNzYWdlLCBnbG9iYWxzLCB7IGNoYW5uZWw6IHRydWUgfSlcclxuXHJcbiAgICAgICAgaWYgKHBlcm1EYXRhICYmIGNvbW1hbmQuZGVzYykge1xyXG4gICAgICAgICAgY29uc3QgY2hhbm5lbFBlcm1zID0gYXdhaXQgcGVybUdldChzZXF1ZWxpemUsIHtcclxuICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICB0eXBlOiAnYWxsb3cnLCBjYXRlZ29yeTogJ2NoYW5uZWwnLCBjb21tYW5kOiBjb21tYW5kLm5hbWUsIGd1aWxkOiBtZXNzYWdlLmd1aWxkLmlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgY29uc3Qga2V5cyA9IChhd2FpdCBzZXF1ZWxpemUubW9kZWxzLmNvbmZpZy5maW5kQWxsKHsgYXR0cmlidXRlczogWydpdGVtJ10sIGdyb3VwOiAnaXRlbScgfSkpLm1hcChjID0+IGMuaXRlbSkuam9pbignLycpXHJcbiAgICAgICAgICBjb25zdCB1c2FnZSA9IGNvbW1hbmQudXNhZ2UgPyBjb21tYW5kLnVzYWdlLnJlcGxhY2UoJ2xvdHVzLWNvbmZpZ3MnLCBrZXlzKSA6ICcnXHJcblxyXG4gICAgICAgICAgbGV0IHJlc3VsdCA9IGAke2NvbW1hbmQuZGVzY30uYFxyXG4gICAgICAgICAgaWYgKGNvbW1hbmQudXNhZ2UpIHJlc3VsdCArPSBgXFxuVXNhZ2U6ICR7cHJlZml4fSR7dXNhZ2V9YFxyXG4gICAgICAgICAgaWYgKGNvbW1hbmQuZXhhbXBsZSkgcmVzdWx0ICs9IGBcXG5FeGFtcGxlOiAke3ByZWZpeH0ke2NvbW1hbmQuZXhhbXBsZX1gXHJcbiAgICAgICAgICBpZiAoY2hhbm5lbFBlcm1zLmxlbmd0aCA+IDApIHJlc3VsdCArPSBgXFxuKFVzYWJsZSBvbjogJHtjaGFubmVsUGVybXMubWFwKGUgPT4gYCMke2UubmFtZX1gKS5qb2luKCcgJyl9KWBcclxuXHJcbiAgICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyYW1bMV0pIHtcclxuICAgICAgICBjb25zdCBuYW1lID0gcGFyYW1bMV0udG9Mb3dlckNhc2UoKVxyXG4gICAgICAgIGlmIChjb21tYW5kcy5oYXMobmFtZSkgJiYgKGNvbW1hbmRzLmdldChuYW1lKS51c2FnZSB8fCBjb21tYW5kcy5nZXQobmFtZSkuZGVzYykpIHtcclxuICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kcy5nZXQobmFtZSlcclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV2YWxDb21tYW5kKGNvbW1hbmQpXHJcblxyXG4gICAgICAgICAgaWYgKHJlc3VsdCkgbWVzc2FnZS5jaGFubmVsLnNlbmQocmVzdWx0KVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBmaWVsZHMgPSBbXVxyXG4gICAgICAgIGZvciAoY29uc3QgW25hbWUsIGNvbW1hbmRdIG9mIGNvbW1hbmRzLmVudHJpZXMoKSkge1xyXG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBhd2FpdCBldmFsQ29tbWFuZChjb21tYW5kKVxyXG4gICAgICAgICAgaWYgKHZhbHVlKSBmaWVsZHMucHVzaCh7IG5hbWUsIHZhbHVlIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBlbWJlZCA9IHsgZmllbGRzIH1cclxuICAgICAgICBtZXNzYWdlLmF1dGhvci5zZW5kKHsgZW1iZWRzOiBbZW1iZWRdIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhYm91dDoge1xyXG4gICAgZGVzYzogJ0luZm8gYWJvdXQgdGhlIGJvdCcsXHJcbiAgICBhc3luYyBleGVjdXRlICh7IGNsaWVudCwgY29uZmlnRmlsZSB9LCB7IG1lc3NhZ2UgfSkge1xyXG4gICAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZCh7XHJcbiAgICAgICAgZW1iZWRzOiBbe1xyXG4gICAgICAgICAgdGl0bGU6ICdBYm91dCcsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogYFBvd2VyZWQgYnkgW0xvdHVzIFRyZWVdKGh0dHBzOi8vZ2l0aHViLmNvbS9qb3JnZXYyNTkvTG90dXMtVHJlZSkgKFNvdXJjZSBjb2RlIGF2YWlsYWJsZSkuXHJcbiAgICAgICAgICBSZXBvcnQgYW55IGlzc3VlcyBvbiBbdGhpcyBsaW5rXShodHRwczovL2dpdGh1Yi5jb20vam9yZ2V2MjU5L0xvdHVzLVRyZWUvaXNzdWVzKS5cXG5cclxuICAgICAgICAgICR7Y2xpZW50LmFwcGxpY2F0aW9uLmJvdFB1YmxpYyA/IGBbQWRkIG1lIHRvIHlvdXIgc2VydmVyIV0oaHR0cHM6Ly9kaXNjb3JkYXBwLmNvbS9vYXV0aDIvYXV0aG9yaXplP2NsaWVudF9pZD0ke2NsaWVudC5hcHBsaWNhdGlvbi5pZH0mc2NvcGU9Ym90JnBlcm1pc3Npb25zPSR7Y29uZmlnRmlsZS5wZXJtaXNzaW9uc30pYCA6ICcnfWAsXHJcbiAgICAgICAgICBjb2xvcjogMTYxNTA2MTcsXHJcbiAgICAgICAgICB0aHVtYm5haWw6IHtcclxuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzExNzgxNjg4NjgzNDg1NDI5NzYvbkdnbVpIS3ZfNDAweDQwMC5qcGcnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiAnRGV2ZWxvcGVkIGJ5JyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJ0NoaXRvV2FybG9jayAoQ2hpdG8jMjg2OSkgKFtHaXRodWJdKGh0dHBzOi8vZ2l0aHViLmNvbS9qb3JnZXYyNTkpKSAoW1R3aXR0ZXJdKGh0dHBzOi8vdHdpdHRlci5jb20vQ2hpdG9XYXJsb2NrKSknXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiAnVGhyb3cgbWUgYSBib25lISBvciBzb21ldGhpbmcnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAnW1BheXBhbF0oaHR0cHM6Ly9wYXlwYWwubWUvY2hpdG93YXJsb2NrKSBvciBbS28tRmldKGh0dHBzOi8vS28tZmkuY29tL0UxRThJM1ZOKSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1dXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgcGVybXM6IHtcclxuICAgIGRlc2M6ICdBZGRzIGEgcGVybWlzc2lvbiBlbnRyeSB0byBhIGNvbW1hbmQnLFxyXG4gICAgdXNhZ2U6ICdwZXJtcyBbY29tbWFuZCBuYW1lXSA8YWxsb3cvZGVueT4gPEB1c2VyfHJvbGVOYW1lfCNjaGFubmVsPicsXHJcbiAgICBleGFtcGxlOiAncGVybXMgY29uZmlnIGFsbG93IFN0YWZmJyxcclxuICAgIGFzeW5jIGV4ZWN1dGUgKHsgc2VxdWVsaXplLCBwYXJhbSwgY29tbWFuZHMgfSwgeyBtZXNzYWdlIH0pIHtcclxuICAgICAgaWYgKHBhcmFtLmxlbmd0aCA8IDQpIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZCgnTm90IGVub3VnaCBwYXJhbWV0ZXJzLicpXHJcblxyXG4gICAgICBjb25zdCBuYW1lID0gcGFyYW1bMV0udG9Mb3dlckNhc2UoKVxyXG4gICAgICBjb25zdCB0eXBlID0gcGFyYW1bMl0udG9Mb3dlckNhc2UoKVxyXG4gICAgICBwYXJhbSA9IHBhcmFtLnNsaWNlKDMpXHJcblxyXG4gICAgICBpZiAoIWNvbW1hbmRzLmhhcyhuYW1lKSkgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGBcXGAke25hbWV9XFxgIGlzIG5vdCBhIHZhbGlkIGNvbW1hbmRgKVxyXG5cclxuICAgICAgY29uc3QgeyBwZXJtIH0gPSBzZXF1ZWxpemUubW9kZWxzXHJcbiAgICAgIGxldCBjYXRlZ29yeTsgbGV0IG5hbWVJZCA9ICcnXHJcblxyXG4gICAgICBpZiAobWVzc2FnZS5tZW50aW9ucy51c2Vycy5zaXplID4gMCkge1xyXG4gICAgICAgIGNhdGVnb3J5ID0gJ3VzZXInXHJcbiAgICAgICAgbmFtZUlkID0gbWVzc2FnZS5tZW50aW9ucy51c2Vycy5maXJzdCgpLmlkXHJcbiAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS5tZW50aW9ucy5jaGFubmVscy5zaXplID4gMCkge1xyXG4gICAgICAgIGNhdGVnb3J5ID0gJ2NoYW5uZWwnXHJcbiAgICAgICAgbmFtZUlkID0gbWVzc2FnZS5tZW50aW9ucy5jaGFubmVscy5maXJzdCgpLm5hbWVcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIW1lc3NhZ2UuZ3VpbGQucm9sZXMuY2FjaGUuc29tZShyID0+IHIubmFtZSA9PT0gcGFyYW0uam9pbignICcpKSkgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGBUaGUgcm9sZSBcXGAke3BhcmFtLmpvaW4oJyAnKX1cXGAgZG9lc250IGV4aXN0LmApXHJcbiAgICAgICAgY2F0ZWdvcnkgPSAncm9sZSdcclxuICAgICAgICBuYW1lSWQgPSBwYXJhbS5qb2luKCcgJylcclxuICAgICAgfVxyXG5cclxuICAgICAgYXdhaXQgcGVybS5jcmVhdGUoeyBndWlsZDogbWVzc2FnZS5ndWlsZElkLCBjb21tYW5kOiBuYW1lLCBjYXRlZ29yeSwgdHlwZSwgbmFtZTogbmFtZUlkIH0pXHJcbiAgICAgIGF3YWl0IG1lc3NhZ2UuY2hhbm5lbC5zZW5kKCdQZXJtaXNzaW9ucyB1cGRhdGVkJylcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBtb2R1bGVzOiB7XHJcbiAgICBkZXNjOiAnRGlzcGxheXMgYWxsIGNvbW1hbmRzIGFuZCBtb2R1bGVzIGF2YWlsYWJsZScsXHJcbiAgICBhc3luYyBleGVjdXRlICh7IGNvbW1hbmRzLCBtb2R1bGVzIH0sIHsgbWVzc2FnZSB9KSB7XHJcbiAgICAgIGNvbnN0IGZpZWxkcyA9IFtdXHJcblxyXG4gICAgICBmb3IgKGNvbnN0IG1vZHVsZSBvZiBtb2R1bGVzLnZhbHVlcygpKSB7XHJcbiAgICAgICAgY29uc3QgY29tbWFuZExpc3QgPSBtb2R1bGUuY29tbWFuZE5hbWVzLm1hcChjID0+IGNvbW1hbmRzLmdldChjKSlcclxuICAgICAgICBjb25zdCB2YWx1ZU91dCA9IGNvbW1hbmRMaXN0Lm1hcChjID0+IGAke2MubmFtZX0ke2MuZW5hYmxlZFttZXNzYWdlLmd1aWxkSWRdID8gJycgOiAnIChkaXNhYmxlZCknfWApLmpvaW4oJ1xcbicpXHJcbiAgICAgICAgZmllbGRzLnB1c2goe1xyXG4gICAgICAgICAgbmFtZTogYCR7bW9kdWxlLm5hbWV9JHttb2R1bGUuZW5hYmxlZFttZXNzYWdlLmd1aWxkSWRdID8gJycgOiAnIChkaXNhYmxlZCknfWAsXHJcbiAgICAgICAgICB2YWx1ZTogdmFsdWVPdXQgfHwgJ1xcdTIwMEInXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZW1iZWQgPSB7XHJcbiAgICAgICAgdGl0bGU6ICdBdmFpbGFibGUgQ29tbWFuZHMgKHBlciBtb2R1bGUpJyxcclxuICAgICAgICBjb2xvcjogNDEyODM4NixcclxuICAgICAgICBmaWVsZHNcclxuICAgICAgfVxyXG4gICAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZCh7IGVtYmVkczogW2VtYmVkXSB9KVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHRvZ2dsZToge1xyXG4gICAgdXNhZ2U6ICd0b2dnbGUgW21vZHVsZS9jb21tYW5kXSBbY29tbWFuZCBuYW1lXScsXHJcbiAgICBkZXNjOiAnRW5hYmxlcyBvciBkaXNhYmxlcyBhIGNvbW1hbmQvbW9kdWxlJyxcclxuICAgIGV4YW1wbGU6ICd0b2dnbGUgY29tbWFuZCBhYm91dCcsXHJcbiAgICBhc3luYyBleGVjdXRlICh7IGNsaWVudCwgcGFyYW0sIHNlcXVlbGl6ZSwgY29tbWFuZHMsIG1vZHVsZXMgfSwgeyBtZXNzYWdlIH0pIHtcclxuICAgICAgaWYgKCFwYXJhbVsyXSB8fCAhWydtb2R1bGUnLCAnY29tbWFuZCddLmluY2x1ZGVzKHBhcmFtWzFdLnRvTG93ZXJDYXNlKCkpKSByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoJ1VzYWdlOiB0b2dnbGUgW21vZHVsZS9jb21tYW5kXSBbbmFtZV0nKVxyXG5cclxuICAgICAgY29uc3QgbW9kZSA9IHBhcmFtWzFdLnRvTG93ZXJDYXNlKClcclxuICAgICAgY29uc3QgaWQgPSBwYXJhbVsyXS50b0xvd2VyQ2FzZSgpXHJcbiAgICAgIGNvbnN0IHsgbW9kZWxzIH0gPSBzZXF1ZWxpemVcclxuXHJcbiAgICAgIHN3aXRjaCAobW9kZSkge1xyXG4gICAgICAgIGNhc2UgJ21vZHVsZSc6IHtcclxuICAgICAgICAgIGNvbnN0IGNvbW1hbmRMaXN0ID0gQXJyYXkuZm9ybShjb21tYW5kcy52YWx1ZXMoKSkuZmlsdGVyKGMgPT4gYy5tb2R1bGVOYW1lID09PSBpZClcclxuICAgICAgICAgIGlmIChjb21tYW5kTGlzdC5sZW5ndGggPT09IDApIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChgJHtpZH0gaXMgbm90IGEgdmFsaWQgbW9kdWxlIG5hbWVgKVxyXG5cclxuICAgICAgICAgIGNvbnN0IG1vZHVsZSA9IG1vZHVsZXMuZ2V0KGlkKVxyXG4gICAgICAgICAgYXdhaXQgbW9kZWxzLm1vZHVsZS51cGRhdGUoeyB2YWx1ZTogIW1vZHVsZS5lbmFibGVkW21lc3NhZ2UuZ3VpbGRJZF0gfSwgeyB3aGVyZTogeyBtb2R1bGU6IGlkLCBndWlsZDogbWVzc2FnZS5ndWlsZElkIH0gfSlcclxuICAgICAgICAgIG1vZHVsZS5lbmFibGVkW21lc3NhZ2UuZ3VpbGRJZF0gPSAhbW9kdWxlLmVuYWJsZWRbbWVzc2FnZS5ndWlsZElkXVxyXG5cclxuICAgICAgICAgIGF3YWl0IG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGBUaGUgbW9kdWxlICcke2lkfScgaGFzIGJlZW4gJHttb2R1bGUuZW5hYmxlZFttZXNzYWdlLmd1aWxkSWRdID8gJ2VuYWJsZWQnIDogJ2Rpc2FibGVkJ30uYClcclxuICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlICdjb21tYW5kJzoge1xyXG4gICAgICAgICAgaWYgKCFjb21tYW5kcy5oYXMoaWQpKSByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoYCR7aWR9IGlzIG5vdCBhIHZhbGlkIGNvbW1hbmQgbmFtZS5gKVxyXG4gICAgICAgICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRzLmdldChpZClcclxuICAgICAgICAgIGNvbnN0IG1vZHVsZSA9IG1vZHVsZXMuZ2V0KGNvbW1hbmQubW9kdWxlTmFtZSlcclxuXHJcbiAgICAgICAgICBhd2FpdCBtb2RlbHMuY29tbWFuZC51cGRhdGUoeyB2YWx1ZTogIWNvbW1hbmQuZW5hYmxlZFttZXNzYWdlLmd1aWxkSWRdIH0sIHsgd2hlcmU6IHsgY29tbWFuZDogaWQsIGd1aWxkOiBtZXNzYWdlLmd1aWxkSWQgfSB9KVxyXG4gICAgICAgICAgY29tbWFuZC5lbmFibGVkW21lc3NhZ2UuZ3VpbGRJZF0gPSAhY29tbWFuZC5lbmFibGVkW21lc3NhZ2UuZ3VpbGRJZF1cclxuXHJcbiAgICAgICAgICBhd2FpdCBtZXNzYWdlLmNoYW5uZWwuc2VuZChgVGhlIG1vZHVsZSAnJHtpZH0nIGhhcyBiZWVuICR7Y29tbWFuZC5lbmFibGVkW21lc3NhZ2UuZ3VpbGRJZF0gPyAnZW5hYmxlZCcgOiAnZGlzYWJsZWQnfS4ke2NvbW1hbmQuZW5hYmxlZFttZXNzYWdlLmd1aWxkSWRdICYmICFtb2R1bGUuZW5hYmxlZFttZXNzYWdlLmd1aWxkSWRdID8gYFxcbkVuYWJsZSB0aGUgbW9kdWxlICcke21vZHVsZS5uYW1lfScgdG8gdXNlIHRoaXMgY29tbWFuZC5gIDogJyd9YClcclxuICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY29uZmlnOiB7XHJcbiAgICB1c2FnZTogJ2NvbmZpZyBbbG90dXMtY29uZmlnc10gW3ZhbHVlXScsXHJcbiAgICBkZXNjOiAnQ2hhbmdlcyBhIGJvdCBjb25maWd1cmF0aW9uJyxcclxuICAgIGV4YW1wbGU6ICdjb25maWcgcHJlZml4ID4nLFxyXG4gICAgYXN5bmMgZXhlY3V0ZSAoeyBwYXJhbSwgc2VxdWVsaXplLCBjb25maWcgfSwgeyBtZXNzYWdlIH0pIHtcclxuICAgICAgY29uc3QgaXRlbSA9IHBhcmFtWzFdLnRvTG93ZXJDYXNlKClcclxuICAgICAgY29uc3Qga2V5cyA9IChhd2FpdCBzZXF1ZWxpemUubW9kZWxzLmNvbmZpZy5maW5kQWxsKHsgYXR0cmlidXRlczogWydpdGVtJ10sIGdyb3VwOiAnaXRlbScgfSkpLm1hcChjID0+IGMuaXRlbSlcclxuXHJcbiAgICAgIGlmICgha2V5cy5pbmNsdWRlcyhpdGVtKSkgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGAnJHtpdGVtfScgaXMgbm90IGEgdmFsaWQgb3B0aW9uLiBPcHRpb25zOiAke2tleXMuam9pbignLCAnKX1gKVxyXG4gICAgICBjb25zdCBkYXRhID0gcGFyYW0uc2xpY2UoMikuam9pbignICcpXHJcblxyXG4gICAgICBhd2FpdCBzZXF1ZWxpemUubW9kZWxzLmNvbmZpZy51cGRhdGUoeyB2YWx1ZTogZGF0YSB9LCB7IHdoZXJlOiB7IGd1aWxkOiBtZXNzYWdlLmd1aWxkSWQsIGl0ZW0gfSB9KVxyXG4gICAgICBjb25maWdbbWVzc2FnZS5ndWlsZElkXVtpdGVtXSA9IGRhdGFcclxuICAgICAgYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoJ1NldHRpbmdzIHVwZGF0ZWQnKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=