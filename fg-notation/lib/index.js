"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sharp = _interopRequireDefault(require("sharp"));
var _path = _interopRequireDefault(require("path"));
var _glob = _interopRequireDefault(require("glob"));
var _sequelize = require("sequelize");
var _bent = _interopRequireDefault(require("bent"));
var _axios = _interopRequireDefault(require("axios"));
var _info = require("./info.json");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var getJSON = (0, _bent["default"])('json');
var imgPath = _path["default"].join(__dirname, 'img');
var basicInputs = new Map();
var gameInputs = new Map();
var glossary = {};
var terms = [];
var grabs = _glob["default"].sync(_path["default"].join(imgPath, 'grabs/**.png'));
getGlossary();
setInterval(getGlossary, 5 * 60 * 1000);
function getGlossary() {
  return _getGlossary.apply(this, arguments);
}
function _getGlossary() {
  _getGlossary = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var result, tempG, tempT;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return getJSON('https://glossary.infil.net/json/glossary.json');
        case 2:
          result = _context7.sent;
          tempG = {};
          tempT = [];
          result.forEach(function (i) {
            var term = i.term.toLowerCase();
            tempG[term] = i;
            tempT.push(term);
          });
          glossary = tempG;
          terms = tempT;
        case 8:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _getGlossary.apply(this, arguments);
}
_glob["default"].sync(_path["default"].join(imgPath, 'basic/**'), {
  nodir: true
}).forEach(function (p) {
  var input = p.split('/').pop().replace('.png', '');
  basicInputs.set(input, p);
  var alias = _info.aliases.inputs.basic[input];
  if (alias) {
    alias.forEach(function (i) {
      basicInputs.set(i, p);
      if (_info.sizes[input]) _info.sizes[i] = _info.sizes[input];
    });
  }
});
_glob["default"].sync(_path["default"].join(imgPath, 'games/*')).forEach(function (p) {
  var _path$parse = _path["default"].parse(_path["default"].relative(_path["default"].join(imgPath, 'games'), p)),
    base = _path$parse.base;
  gameInputs.set(base, new Map());
  _glob["default"].sync(_path["default"].join(imgPath, 'games', base, '**'), {
    nodir: true
  }).forEach(function (input) {
    var _path$parse2 = _path["default"].parse(input),
      name = _path$parse2.name;
    gameInputs.get(base).set(name, input);
  });
  var alias = _info.aliases.inputs.games[base];
  if (alias) {
    for (var _i = 0, _Object$entries = Object.entries(alias); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
        a = _Object$entries$_i[0],
        s = _Object$entries$_i[1];
      gameInputs.get(base).set(a, s);
    }
  }
});
function solveInput(inputs, input) {
  if (inputs.has(input)) return isString(inputs.get(input)) ? [input] : inputs.get(input);
  for (var i = 0; i < input.length; i++) {
    var s1 = input.slice(0, 0 - i);
    if (inputs.has(s1)) {
      var result = inputs.get(s1);
      var remaining = solveInput(inputs, input.slice(0 - i));
      return isString(result) ? [s1].concat((0, _toConsumableArray2["default"])(remaining)) : [].concat((0, _toConsumableArray2["default"])(result), (0, _toConsumableArray2["default"])(remaining));
    }
  }
  throw new Error("Cannot find \"".concat(input, "\" as a recognizable input"));
}
function sendInput(_x, _x2, _x3, _x4) {
  return _sendInput.apply(this, arguments);
}
function _sendInput() {
  _sendInput = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(inputs, result, message, caption) {
    var width, images, left, canvas;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          width = result.map(function (it) {
            return _info.sizes[it] || 152;
          }).reduce(function (a, b) {
            return a + b;
          }, 0);
          images = [];
          left = 0;
          result.forEach(function (it, index) {
            var size = _info.sizes[it] || 152;
            images.push({
              input: inputs.get(it),
              left: left,
              top: Math.floor((152 - size) / 2)
            });
            left += size;
          });
          canvas = (0, _sharp["default"])({
            create: {
              width: width,
              height: 152,
              channels: 4,
              background: 'transparent'
            }
          }).png().composite(images);
          _context8.next = 7;
          return canvas.toBuffer();
        case 7:
          canvas = _context8.sent;
          if (!(result.length < 12)) {
            _context8.next = 12;
            break;
          }
          _context8.next = 11;
          return (0, _sharp["default"])(canvas).resize({
            height: 55
          }).png().toBuffer();
        case 11:
          canvas = _context8.sent;
        case 12:
          return _context8.abrupt("return", message.reply({
            content: caption,
            files: [canvas]
          }));
        case 13:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _sendInput.apply(this, arguments);
}
function checkGame(game) {
  return gameInputs.has(game) ? game : _info.aliases.games[game];
}
function isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}
var _default = exports["default"] = {
  name: 'fg-notation',
  about: {
    name: 'FG Notation',
    value: '[Instructions and source code](https://lotus.chitowarlock.com/fgnotation)\n[Infil\'s Fighting Game Glossary](https://glossary.infil.net)\n[MagicianStuff\'s Fighthing Game notations emotes](https://twitter.com/MagicianStuff/status/1477931054484893697)'
  },
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
          while (1) switch (_context.prev = _context.next) {
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
              _context.t0 = _info.builtin[name];
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
          var param, message, _param, gameInput, i1, game, inputs, result;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                param = _ref.param;
                message = _ref2.message;
                _param = (0, _slicedToArray2["default"])(param, 3), gameInput = _param[1], i1 = _param[2];
                if (!(!gameInput || !i1)) {
                  _context2.next = 5;
                  break;
                }
                return _context2.abrupt("return", message.reply('Missing arguments. Example: >fgi sf 236P 214K'));
              case 5:
                game = checkGame(gameInput);
                if (gameInputs.has(game)) {
                  _context2.next = 8;
                  break;
                }
                return _context2.abrupt("return", message.reply("\"".concat(game, "\" is not a valid game. Available games: ").concat(Array.from(gameInputs.keys()).join(' '))));
              case 8:
                try {
                  inputs = new Map([].concat((0, _toConsumableArray2["default"])(basicInputs), (0, _toConsumableArray2["default"])(gameInputs.get(game))));
                  result = param.slice(2).map(function (i) {
                    return solveInput(inputs, i.toLowerCase());
                  }).flat();
                  sendInput(inputs, result, message);
                } catch (err) {
                  message.reply(err.message);
                }
              case 9:
              case "end":
                return _context2.stop();
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
          var param, sequelize, message, _param2, gameInput, name, i1, game, inputs, input;
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                param = _ref3.param, sequelize = _ref3.sequelize;
                message = _ref4.message;
                _param2 = (0, _slicedToArray2["default"])(param, 4), gameInput = _param2[1], name = _param2[2], i1 = _param2[3];
                if (!(!gameInput || !name || !i1)) {
                  _context3.next = 5;
                  break;
                }
                return _context3.abrupt("return", message.reply('Missing arguments. Example: >fgi sf testName 236P 214K'));
              case 5:
                game = checkGame(gameInput);
                if (gameInputs.has(game)) {
                  _context3.next = 8;
                  break;
                }
                return _context3.abrupt("return", message.reply("\"".concat(game, "\" is not a valid game. Available games: ").concat(Array.from(gameInputs.keys()).join(' '))));
              case 8:
                _context3.prev = 8;
                inputs = new Map([].concat((0, _toConsumableArray2["default"])(basicInputs), (0, _toConsumableArray2["default"])(gameInputs.get(game))));
                input = param.slice(3).map(function (i) {
                  return solveInput(inputs, i.toLowerCase());
                }).flat().join(' ');
                _context3.next = 13;
                return sequelize.models.fginput.create({
                  guild: message.guild.id,
                  name: name,
                  createdBy: message.author.id,
                  game: game,
                  input: input
                });
              case 13:
                message.channel.send("Saved command \"".concat(input, "\" as \"").concat(name, "\""));
                _context3.next = 19;
                break;
              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3["catch"](8);
                message.reply(_context3.t0.message);
              case 19:
              case "end":
                return _context3.stop();
            }
          }, _callee3, null, [[8, 16]]);
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
            while (1) switch (_context4.prev = _context4.next) {
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
            while (1) switch (_context5.prev = _context5.next) {
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
          }, _callee5);
        }));
        function execute(_x11, _x12) {
          return _execute4.apply(this, arguments);
        }
        return execute;
      }()
    },
    grab: {
      usage: 'grab @user',
      desc: 'Command grab someone',
      example: 'grab @ChitoWarlock',
      execute: function () {
        var _execute5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_ref9, _ref10) {
          var param, sequelize, message, mentions, user, mainPath, mainImage, options, avatarImage, mainMetadata, width, height, canvas;
          return _regenerator["default"].wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                param = _ref9.param, sequelize = _ref9.sequelize;
                message = _ref10.message;
                mentions = message.mentions.users;
                if (!(mentions.size === 0)) {
                  _context6.next = 5;
                  break;
                }
                return _context6.abrupt("return", message.reply('You forgot to mention who to grab'));
              case 5:
                if (!(mentions.size > 1)) {
                  _context6.next = 7;
                  break;
                }
                return _context6.abrupt("return", message.reply('Cannot grab multiple enemies!'));
              case 7:
                user = mentions.first();
                mainPath = grabs[getRandomInt(0, grabs.length - 1)];
                _context6.next = 11;
                return (0, _sharp["default"])(mainPath);
              case 11:
                mainImage = _context6.sent;
                _context6.next = 14;
                return function (specifier) {
                  return new Promise(function (r) {
                    return r("".concat(specifier));
                  }).then(function (s) {
                    return _interopRequireWildcard(require(s));
                  });
                }(mainPath.replace('.png', '.json'));
              case 14:
                options = _context6.sent;
                _context6.t0 = _sharp["default"];
                _context6.next = 18;
                return getBuffer(user.displayAvatarURL({
                  format: 'png'
                }));
              case 18:
                _context6.t1 = _context6.sent;
                _context6.next = 21;
                return (0, _context6.t0)(_context6.t1).resize(options.resize).rotate(options.rotate, {
                  background: {
                    r: 0,
                    g: 0,
                    b: 0,
                    alpha: 0
                  }
                });
              case 21:
                avatarImage = _context6.sent;
                _context6.next = 24;
                return mainImage.metadata();
              case 24:
                mainMetadata = _context6.sent;
                width = mainMetadata.width, height = mainMetadata.height;
                _context6.t2 = newCanvas(width, height);
                _context6.t3 = _objectSpread;
                _context6.next = 30;
                return avatarImage.toBuffer();
              case 30:
                _context6.t4 = _context6.sent;
                _context6.t5 = {
                  input: _context6.t4
                };
                _context6.t6 = options.composite;
                _context6.t7 = (0, _context6.t3)(_context6.t5, _context6.t6);
                _context6.next = 36;
                return mainImage.toBuffer();
              case 36:
                _context6.t8 = _context6.sent;
                _context6.t9 = {
                  input: _context6.t8
                };
                _context6.t10 = [_context6.t7, _context6.t9];
                _context6.next = 41;
                return _context6.t2.composite.call(_context6.t2, _context6.t10).png().toBuffer();
              case 41:
                canvas = _context6.sent;
                message.reply({
                  files: [canvas]
                });
              case 43:
              case "end":
                return _context6.stop();
            }
          }, _callee6);
        }));
        function execute(_x13, _x14) {
          return _execute5.apply(this, arguments);
        }
        return execute;
      }()
    }
  }
};
function getBuffer(_x15) {
  return _getBuffer.apply(this, arguments);
}
function _getBuffer() {
  _getBuffer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(url) {
    var input;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _axios["default"])({
            url: url,
            responseType: 'arraybuffer'
          });
        case 2:
          input = _context9.sent.data;
          return _context9.abrupt("return", input);
        case 4:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _getBuffer.apply(this, arguments);
}
function newCanvas(width, height) {
  var channels = 4;
  var rgbaPixel = 0x00000000;
  var canvas = Buffer.alloc(width * height * channels, rgbaPixel);
  return (0, _sharp["default"])(canvas, {
    raw: {
      width: width,
      height: height,
      channels: channels
    }
  });
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}