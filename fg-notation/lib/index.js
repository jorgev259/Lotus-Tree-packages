"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sharp = _interopRequireDefault(require("sharp"));

var _path = _interopRequireDefault(require("path"));

var _glob = _interopRequireDefault(require("glob"));

var _sequelize = require("sequelize");

var _requestPromise = _interopRequireDefault(require("request-promise"));

var imgPath = _path["default"].join(__dirname, 'img');

var basicInputs = new Map();
var gameInputs = new Map();
var glossary = {};
var terms = [];
getGlossary();
setInterval(getGlossary, 5 * 60 * 1000);

function getGlossary() {
  return _getGlossary.apply(this, arguments);
}

function _getGlossary() {
  _getGlossary = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var result, tempG, tempT;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.t0 = JSON;
            _context6.next = 3;
            return (0, _requestPromise["default"])('https://glossary.infil.net/json/glossary.json');

          case 3:
            _context6.t1 = _context6.sent;
            result = _context6.t0.parse.call(_context6.t0, _context6.t1);
            tempG = {};
            tempT = [];
            result.forEach(function (i) {
              var term = i.term.toLowerCase();
              tempG[term] = i;
              tempT.push(term);
            });
            glossary = tempG;
            terms = tempT;

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getGlossary.apply(this, arguments);
}

_glob["default"].sync(_path["default"].join(imgPath, 'basic/**'), {
  nodir: true
}).forEach(function (p) {
  var input = p.split('/').pop().replace('.png', '');
  basicInputs.set(input, p);
});

basicInputs.set('>>', _path["default"].join(imgPath, 'basic/doubleforward.png'));

_glob["default"].sync(_path["default"].join(imgPath, 'games/**'), {
  nodir: true
}).forEach(function (p) {
  var _path$parse = _path["default"].parse(_path["default"].relative(_path["default"].join(imgPath, 'games'), p)),
      dir = _path$parse.dir,
      name = _path$parse.name;

  if (!gameInputs.has(dir)) gameInputs.set(dir, new Map());
  gameInputs.get(dir).set(name, p);
});

function solveInput(inputs, input) {
  if (inputs.has(input)) return [input];

  for (var i = 0; i < input.length; i++) {
    var s1 = input.slice(0, 0 - i);
    if (inputs.has(s1)) return [s1].concat((0, _toConsumableArray2["default"])(solveInput(inputs, input.slice(0 - i))));
  }

  throw new Error("Cannot find \"".concat(input, "\" as a recognizable input"));
}

function sendInput(_x, _x2, _x3, _x4) {
  return _sendInput.apply(this, arguments);
}

function _sendInput() {
  _sendInput = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(inputs, result, message, caption) {
    var canvas;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _sharp["default"])({
              create: {
                width: 152 * result.length,
                height: 152,
                channels: 4,
                background: 'transparent'
              }
            }).composite(result.map(function (it, index) {
              return {
                input: inputs.get(it),
                left: index * 152,
                top: 0,
                width: 152,
                height: 152
              };
            })).png().toBuffer();

          case 2:
            canvas = _context7.sent;
            return _context7.abrupt("return", message.reply({
              content: caption,
              files: [canvas]
            }));

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _sendInput.apply(this, arguments);
}

var builtin = {
  37: {
    game: 'sf',
    caption: '***LETS GO JUSTIN!***',
    input: '6 6 6 6 6 6 6 >> 6 6 6 6 6 6 6 >> 8 6 j. hk >> 2 mk >> 623 mp >> 236 236 lk'
  }
};
var _default = {
  name: 'fg-notation',
  intents: ['GUILD_MESSAGES'],
  partials: ['MESSAGE'],
  preload: function preload(sequelize) {
    sequelize.define('fginput', {
      guild: {
        type: _sequelize.DataTypes.STRING,
        primaryKey: true
      },
      name: {
        type: _sequelize.DataTypes.STRING,
        primaryKey: true
      },
      createdBy: _sequelize.DataTypes.STRING,
      game: _sequelize.DataTypes.STRING,
      caption: _sequelize.DataTypes.STRING,
      input: _sequelize.DataTypes.STRING
    });
  },
  events: {
    messageCreate: function messageCreate(global, message) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var client, config, sequelize, guildId, prefix, name, row, inputs;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                client = global.client, config = global.config, sequelize = global.sequelize;

                if (!(message.author.id === client.user.id || !message.member)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                guildId = message.guildId;
                prefix = config[guildId].prefix;

                if (!message.content.startsWith(prefix)) {
                  _context.next = 14;
                  break;
                }

                name = message.content.split(' ').pop().replace(prefix, '');
                _context.t0 = builtin[name];

                if (_context.t0) {
                  _context.next = 12;
                  break;
                }

                _context.next = 11;
                return sequelize.models.fginput.findOne({
                  where: {
                    guild: message.guild.id,
                    name: name
                  }
                });

              case 11:
                _context.t0 = _context.sent;

              case 12:
                row = _context.t0;

                if (row) {
                  inputs = new Map([].concat((0, _toConsumableArray2["default"])(basicInputs), (0, _toConsumableArray2["default"])(gameInputs.get(row.game))));
                  sendInput(inputs, row.input.split(' '), message, row.caption);
                }

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  },
  commands: {
    fgi: {
      usage: 'fgi [game] [inputs]',
      desc: 'Converts a list of inputs into an image',
      example: 'fgi sf 236P 214K',
      execute: function () {
        var _execute = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref, _ref2) {
          var param, message, _param, game, i1, inputs, result;

          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  param = _ref.param;
                  message = _ref2.message;
                  _param = (0, _slicedToArray2["default"])(param, 3), game = _param[1], i1 = _param[2];

                  if (!(!game || !i1)) {
                    _context2.next = 5;
                    break;
                  }

                  return _context2.abrupt("return", message.reply('Missing arguments. Example: >fgi sf 236P 214K'));

                case 5:
                  if (gameInputs.has(game)) {
                    _context2.next = 7;
                    break;
                  }

                  return _context2.abrupt("return", message.reply("\"".concat(game, "\" is not a valid game. Available games: ").concat(Array.from(gameInputs.keys()).join(' '))));

                case 7:
                  inputs = new Map([].concat((0, _toConsumableArray2["default"])(basicInputs), (0, _toConsumableArray2["default"])(gameInputs.get(game))));
                  result = param.slice(2).map(function (i) {
                    return solveInput(inputs, i.toLowerCase());
                  }).flat();
                  sendInput(inputs, result, message);

                case 10:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function execute(_x5, _x6) {
          return _execute.apply(this, arguments);
        }

        return execute;
      }()
    },
    fgsave: {
      usage: 'fgsave [game] [name] [inputs]',
      desc: 'Saves a list of inputs into a command',
      example: 'fgi sf testName 236P 214K',
      execute: function () {
        var _execute2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3, _ref4) {
          var param, sequelize, message, _param2, game, name, i1, inputs, input;

          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  param = _ref3.param, sequelize = _ref3.sequelize;
                  message = _ref4.message;
                  _param2 = (0, _slicedToArray2["default"])(param, 4), game = _param2[1], name = _param2[2], i1 = _param2[3];

                  if (!(!game || !name || !i1)) {
                    _context3.next = 5;
                    break;
                  }

                  return _context3.abrupt("return", message.reply('Missing arguments. Example: >fgi sf testName 236P 214K'));

                case 5:
                  if (gameInputs.has(game)) {
                    _context3.next = 7;
                    break;
                  }

                  return _context3.abrupt("return", message.reply("\"".concat(game, "\" is not a valid game. Available games: ").concat(Array.from(gameInputs.keys()).join(' '))));

                case 7:
                  inputs = new Map([].concat((0, _toConsumableArray2["default"])(basicInputs), (0, _toConsumableArray2["default"])(gameInputs.get(game))));
                  input = param.slice(3).map(function (i) {
                    return solveInput(inputs, i.toLowerCase());
                  }).flat().join(' ');
                  _context3.next = 11;
                  return sequelize.models.fginput.create({
                    guild: message.guild.id,
                    name: name,
                    createdBy: message.author.id,
                    game: game,
                    input: input
                  });

                case 11:
                  message.channel.send("Saved command \"".concat(input, "\" as \"").concat(name, "\""));

                case 12:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function execute(_x7, _x8) {
          return _execute2.apply(this, arguments);
        }

        return execute;
      }()
    },
    fgcaption: {
      usage: 'fgcaption [name] [caption]',
      desc: 'Adds a caption to a saved input command',
      example: 'fgcaption testName This is a caption',
      execute: function () {
        var _execute3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref5, _ref6) {
          var param, sequelize, message, _param3, name, i1, row;

          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  param = _ref5.param, sequelize = _ref5.sequelize;
                  message = _ref6.message;
                  _param3 = (0, _slicedToArray2["default"])(param, 3), name = _param3[1], i1 = _param3[2];

                  if (!(!name || !i1)) {
                    _context4.next = 5;
                    break;
                  }

                  return _context4.abrupt("return", message.reply('Missing arguments. Example: >fgi testName This is a caption'));

                case 5:
                  _context4.next = 7;
                  return sequelize.models.fginput.findOne({
                    where: {
                      guild: message.guild.id,
                      name: name
                    }
                  });

                case 7:
                  row = _context4.sent;

                  if (row) {
                    _context4.next = 10;
                    break;
                  }

                  return _context4.abrupt("return", message.reply("\"".concat(name, "\" is not a saved input list")));

                case 10:
                  row.caption = param.slice(2).join(' ');
                  _context4.next = 13;
                  return row.save();

                case 13:
                  message.channel.send("Saved caption for input list \"".concat(name, "\""));

                case 14:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        function execute(_x9, _x10) {
          return _execute3.apply(this, arguments);
        }

        return execute;
      }()
    },
    fgglossary: {
      usage: 'fgglossary [search term]',
      desc: 'Searches for a term on Infil\'s Glossary',
      example: 'fgglossary mexican uppercut',
      execute: function () {
        var _execute4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref7, _ref8) {
          var param, sequelize, message, params, search, result, url;
          return _regenerator["default"].wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  param = _ref7.param, sequelize = _ref7.sequelize;
                  message = _ref8.message;
                  params = param.slice(1);

                  if (!(params.length === 0)) {
                    _context5.next = 5;
                    break;
                  }

                  return _context5.abrupt("return", message.reply('Missing search term. Example: >fgglossary mexican uppercut'));

                case 5:
                  search = params.join(' ').toLowerCase();
                  result = terms.filter(function (i) {
                    return i.includes(search);
                  });
                  url = "https://glossary.infil.net/?t=".concat(params.join('%20').toLowerCase());

                  if (!(result.length === 0)) {
                    _context5.next = 10;
                    break;
                  }

                  return _context5.abrupt("return", message.reply("Term \"".concat(search, "\" not found")));

                case 10:
                  if (!(result.length === 1)) {
                    _context5.next = 12;
                    break;
                  }

                  return _context5.abrupt("return", message.reply("```".concat(glossary[result[0]].def, "```Source: <").concat(url, ">")));

                case 12:
                  message.reply("Multiple terms found: ".concat(url));

                case 13:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        function execute(_x11, _x12) {
          return _execute4.apply(this, arguments);
        }

        return execute;
      }()
    }
  }
};
exports["default"] = _default;