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
                  message.reply(url);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbWdQYXRoIiwicGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJiYXNpY0lucHV0cyIsIk1hcCIsImdhbWVJbnB1dHMiLCJnbG9zc2FyeSIsInRlcm1zIiwiZ2V0R2xvc3NhcnkiLCJzZXRJbnRlcnZhbCIsIkpTT04iLCJyZXN1bHQiLCJwYXJzZSIsInRlbXBHIiwidGVtcFQiLCJmb3JFYWNoIiwiaSIsInRlcm0iLCJ0b0xvd2VyQ2FzZSIsInB1c2giLCJnbG9iIiwic3luYyIsIm5vZGlyIiwicCIsImlucHV0Iiwic3BsaXQiLCJwb3AiLCJyZXBsYWNlIiwic2V0IiwicmVsYXRpdmUiLCJkaXIiLCJuYW1lIiwiaGFzIiwiZ2V0Iiwic29sdmVJbnB1dCIsImlucHV0cyIsImxlbmd0aCIsInMxIiwic2xpY2UiLCJFcnJvciIsInNlbmRJbnB1dCIsIm1lc3NhZ2UiLCJjYXB0aW9uIiwiY3JlYXRlIiwid2lkdGgiLCJoZWlnaHQiLCJjaGFubmVscyIsImJhY2tncm91bmQiLCJjb21wb3NpdGUiLCJtYXAiLCJpdCIsImluZGV4IiwibGVmdCIsInRvcCIsInBuZyIsInRvQnVmZmVyIiwiY2FudmFzIiwicmVwbHkiLCJjb250ZW50IiwiZmlsZXMiLCJidWlsdGluIiwiZ2FtZSIsImludGVudHMiLCJwYXJ0aWFscyIsInByZWxvYWQiLCJzZXF1ZWxpemUiLCJkZWZpbmUiLCJndWlsZCIsInR5cGUiLCJEYXRhVHlwZXMiLCJTVFJJTkciLCJwcmltYXJ5S2V5IiwiY3JlYXRlZEJ5IiwiZXZlbnRzIiwibWVzc2FnZUNyZWF0ZSIsImdsb2JhbCIsImNsaWVudCIsImNvbmZpZyIsImF1dGhvciIsImlkIiwidXNlciIsIm1lbWJlciIsImd1aWxkSWQiLCJwcmVmaXgiLCJzdGFydHNXaXRoIiwibW9kZWxzIiwiZmdpbnB1dCIsImZpbmRPbmUiLCJ3aGVyZSIsInJvdyIsImNvbW1hbmRzIiwiZmdpIiwidXNhZ2UiLCJkZXNjIiwiZXhhbXBsZSIsImV4ZWN1dGUiLCJwYXJhbSIsImkxIiwiQXJyYXkiLCJmcm9tIiwia2V5cyIsImZsYXQiLCJmZ3NhdmUiLCJjaGFubmVsIiwic2VuZCIsImZnY2FwdGlvbiIsInNhdmUiLCJmZ2dsb3NzYXJ5IiwicGFyYW1zIiwic2VhcmNoIiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJ1cmwiLCJkZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBTUEsT0FBTyxHQUFHQyxpQkFBS0MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLEtBQXJCLENBQWhCOztBQUNBLElBQU1DLFdBQVcsR0FBRyxJQUFJQyxHQUFKLEVBQXBCO0FBQ0EsSUFBTUMsVUFBVSxHQUFHLElBQUlELEdBQUosRUFBbkI7QUFFQSxJQUFJRSxRQUFRLEdBQUcsRUFBZjtBQUNBLElBQUlDLEtBQUssR0FBRyxFQUFaO0FBRUFDLFdBQVc7QUFDWEMsV0FBVyxDQUFDRCxXQUFELEVBQWMsSUFBSSxFQUFKLEdBQVMsSUFBdkIsQ0FBWDs7U0FFZUEsVzs7Ozs7K0ZBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBQ2lCRSxJQURqQjtBQUFBO0FBQUEsbUJBQ2tDLGdDQUFHLCtDQUFILENBRGxDOztBQUFBO0FBQUE7QUFDUUMsWUFBQUEsTUFEUixnQkFDc0JDLEtBRHRCO0FBRVFDLFlBQUFBLEtBRlIsR0FFZ0IsRUFGaEI7QUFHUUMsWUFBQUEsS0FIUixHQUdnQixFQUhoQjtBQUtFSCxZQUFBQSxNQUFNLENBQUNJLE9BQVAsQ0FBZSxVQUFBQyxDQUFDLEVBQUk7QUFDbEIsa0JBQU1DLElBQUksR0FBR0QsQ0FBQyxDQUFDQyxJQUFGLENBQU9DLFdBQVAsRUFBYjtBQUNBTCxjQUFBQSxLQUFLLENBQUNJLElBQUQsQ0FBTCxHQUFjRCxDQUFkO0FBQ0FGLGNBQUFBLEtBQUssQ0FBQ0ssSUFBTixDQUFXRixJQUFYO0FBQ0QsYUFKRDtBQU1BWCxZQUFBQSxRQUFRLEdB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QUtRSixLQUFLLENBQUN1RyxNQUFOLENBQWEsVUFBQTlGLENBQUM7QUFBQSwyQkFBSUEsQ0FBQyxDQUFDK0YsUUFBRixDQUFXRixNQUFYLENBQUo7QUFBQSxtQkFBZCxDQUxSO0FBTURHLGtCQUFBQSxHQU5DLDJDQU1zQ0osTUFBTSxDQUFDM0csSUFBUCxDQUFZLEtBQVosRUFBbUJpQixXQUFuQixFQU50Qzs7QUFBQSx3QkFRSFAsTUFBTSxDQUFDeUIsTUFBUCxLQUFrQixDQVJmO0FBQUE7QUFBQTtBQUFBOztBQUFBLG9EQVF5QkssT0FBTyxDQUFDZ0IsS0FBUixrQkFBdUJvRCxNQUF2QixrQkFSekI7O0FBQUE7QUFBQSx3QkFTSGxHLE1BQU0sQ0FBQ3lCLE1BQVAsS0FBa0IsQ0FUZjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxvREFTeUJLLE9BQU8sQ0FBQ2dCLEtBQVIsY0FBdUJuRCxRQUFRLENBQUNLLE1BQU0sQ0FBQyxDQUFELENBQVAsQ0FBUixDQUFvQnNHLEdBQTNDLHlCQUFnRUQsR0FBaEUsT0FUekI7O0FBQUE7QUFXUHZFLGtCQUFBQSxPQUFPLENBQUNnQixLQUFSLENBQWN1RCxHQUFkOztBQVhPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFKRztBQXBESjtBQTlDRyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNoYXJwIGZyb20gJ3NoYXJwJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InXG5pbXBvcnQgeyBEYXRhVHlwZXMgfSBmcm9tICdzZXF1ZWxpemUnXG5pbXBvcnQgcnAgZnJvbSAncmVxdWVzdC1wcm9taXNlJ1xuXG5jb25zdCBpbWdQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJ2ltZycpXG5jb25zdCBiYXNpY0lucHV0cyA9IG5ldyBNYXAoKVxuY29uc3QgZ2FtZUlucHV0cyA9IG5ldyBNYXAoKVxuXG5sZXQgZ2xvc3NhcnkgPSB7fVxubGV0IHRlcm1zID0gW11cblxuZ2V0R2xvc3NhcnkoKVxuc2V0SW50ZXJ2YWwoZ2V0R2xvc3NhcnksIDUgKiA2MCAqIDEwMDApXG5cbmFzeW5jIGZ1bmN0aW9uIGdldEdsb3NzYXJ5ICgpIHtcbiAgY29uc3QgcmVzdWx0ID0gSlNPTi5wYXJzZShhd2FpdCBycCgnaHR0cHM6Ly9nbG9zc2FyeS5pbmZpbC5uZXQvanNvbi9nbG9zc2FyeS5qc29uJykpXG4gIGNvbnN0IHRlbXBHID0ge31cbiAgY29uc3QgdGVtcFQgPSBbXVxuXG4gIHJlc3VsdC5mb3JFYWNoKGkgPT4ge1xuICAgIGNvbnN0IHRlcm0gPSBpLnRlcm0udG9Mb3dlckNhc2UoKVxuICAgIHRlbXBHW3Rlcm1dID0gaVxuICAgIHRlbXBULnB1c2godGVybSlcbiAgfSlcblxuICBnbG9zc2FyeSA9IHRlbXBHXG4gIHRlcm1zID0gdGVtcFRcbn1cblxuZ2xvYi5zeW5jKHBhdGguam9pbihpbWdQYXRoLCAnYmFzaWMvKionKSwgeyBub2RpcjogdHJ1ZSB9KVxuICAuZm9yRWFjaChwID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IHAuc3BsaXQoJy8nKS5wb3AoKS5yZXBsYWNlKCcucG5nJywgJycpXG4gICAgYmFzaWNJbnB1dHMuc2V0KGlucHV0LCBwKVxuICB9KVxuXG5iYXNpY0lucHV0cy5zZXQoJz4+JywgcGF0aC5qb2luKGltZ1BhdGgsICdiYXNpYy9kb3VibGVmb3J3YXJkLnBuZycpKVxuXG5nbG9iLnN5bmMocGF0aC5qb2luKGltZ1BhdGgsICdnYW1lcy8qKicpLCB7IG5vZGlyOiB0cnVlIH0pXG4gIC5mb3JFYWNoKHAgPT4ge1xuICAgIGNvbnN0IHsgZGlyLCBuYW1lIH0gPSBwYXRoLnBhcnNlKHBhdGgucmVsYXRpdmUocGF0aC5qb2luKGltZ1BhdGgsICdnYW1lcycpLCBwKSlcblxuICAgIGlmICghZ2FtZUlucHV0cy5oYXMoZGlyKSkgZ2FtZUlucHV0cy5zZXQoZGlyLCBuZXcgTWFwKCkpXG4gICAgZ2FtZUlucHV0cy5nZXQoZGlyKS5zZXQobmFtZSwgcClcbiAgfSlcblxuZnVuY3Rpb24gc29sdmVJbnB1dCAoaW5wdXRzLCBpbnB1dCkge1xuICBpZiAoaW5wdXRzLmhhcyhpbnB1dCkpIHJldHVybiBbaW5wdXRdXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHMxID0gaW5wdXQuc2xpY2UoMCwgMCAtIGkpXG4gICAgaWYgKGlucHV0cy5oYXMoczEpKSByZXR1cm4gW3MxLCAuLi5zb2x2ZUlucHV0KGlucHV0cywgaW5wdXQuc2xpY2UoMCAtIGkpKV1cbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgXCIke2lucHV0fVwiIGFzIGEgcmVjb2duaXphYmxlIGlucHV0YClcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2VuZElucHV0IChpbnB1dHMsIHJlc3VsdCwgbWVzc2FnZSwgY2FwdGlvbikge1xuICBjb25zdCBjYW52YXMgPSBhd2FpdCBzaGFycCh7IGNyZWF0ZTogeyB3aWR0aDogMTUyICogcmVzdWx0Lmxlbmd0aCwgaGVpZ2h0OiAxNTIsIGNoYW5uZWxzOiA0LCBiYWNrZ3JvdW5kOiAndHJhbnNwYXJlbnQnIH0gfSlcbiAgICAuY29tcG9zaXRlKHJlc3VsdC5tYXAoKGl0LCBpbmRleCkgPT5cbiAgICAgICh7IGlucHV0OiBpbnB1dHMuZ2V0KGl0KSwgbGVmdDogaW5kZXggKiAxNTIsIHRvcDogMCwgd2lkdGg6IDE1MiwgaGVpZ2h0OiAxNTIgfSlcbiAgICApKVxuICAgIC5wbmcoKVxuICAgIC50b0J1ZmZlcigpXG5cbiAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoeyBjb250ZW50OiBjYXB0aW9uLCBmaWxlczogW2NhbnZhc10gfSlcbn1cblxuY29uc3QgYnVpbHRpbiA9IHtcbiAgMzc6IHtcbiAgICBnYW1lOiAnc2YnLFxuICAgIGNhcHRpb246ICcqKipMRVRTIEdPIEpVU1RJTiEqKionLFxuICAgIGlucHV0OiAnNiA2IDYgNiA2IDYgNiA+PiA2IDYgNiA2IDYgNiA2ID4+IDggNiBqLiBoayA+PiAyIG1rID4+IDYyMyBtcCA+PiAyMzYgMjM2IGxrJ1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2ZnLW5vdGF0aW9uJyxcbiAgaW50ZW50czogWydHVUlMRF9NRVNTQUdFUyddLFxuICBwYXJ0aWFsczogWydNRVNTQUdFJ10sXG5cbiAgcHJlbG9hZDogc2VxdWVsaXplID0+IHtcbiAgICBzZXF1ZWxpemUuZGVmaW5lKCdmZ2lucHV0Jywge1xuICAgICAgZ3VpbGQ6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgcHJpbWFyeUtleTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgICAgcHJpbWFyeUtleTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGNyZWF0ZWRCeTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgIGdhbWU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgICBjYXB0aW9uOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgICAgaW5wdXQ6IERhdGFUeXBlcy5TVFJJTkdcbiAgICB9KVxuICB9LFxuXG4gIGV2ZW50czoge1xuICAgIGFzeW5jIG1lc3NhZ2VDcmVhdGUgKGdsb2JhbCwgbWVzc2FnZSkge1xuICAgICAgY29uc3QgeyBjbGllbnQsIGNvbmZpZywgc2VxdWVsaXplIH0gPSBnbG9iYWxcbiAgICAgIGlmIChtZXNzYWdlLmF1dGhvci5pZCA9PT0gY2xpZW50LnVzZXIuaWQgfHwgIW1lc3NhZ2UubWVtYmVyKSByZXR1cm5cblxuICAgICAgY29uc3QgZ3VpbGRJZCA9IG1lc3NhZ2UuZ3VpbGRJZFxuICAgICAgY29uc3QgeyBwcmVmaXggfSA9IGNvbmZpZ1tndWlsZElkXVxuXG4gICAgICBpZiAobWVzc2FnZS5jb250ZW50LnN0YXJ0c1dpdGgocHJlZml4KSkge1xuICAgICAgICBjb25zdCBuYW1lID0gbWVzc2FnZS5jb250ZW50LnNwbGl0KCcgJykucG9wKCkucmVwbGFjZShwcmVmaXgsICcnKVxuICAgICAgICBjb25zdCByb3cgPSBidWlsdGluW25hbWVdIHx8IChcbiAgICAgICAgICBhd2FpdCBzZXF1ZWxpemUubW9kZWxzLmZnaW5wdXQuZmluZE9uZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBndWlsZDogbWVzc2FnZS5ndWlsZC5pZCwgbmFtZSB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuXG4gICAgICAgIGlmIChyb3cpIHtcbiAgICAgICAgICBjb25zdCBpbnB1dHMgPSBuZXcgTWFwKFsuLi5iYXNpY0lucHV0cywgLi4uZ2FtZUlucHV0cy5nZXQocm93LmdhbWUpXSlcbiAgICAgICAgICBzZW5kSW5wdXQoaW5wdXRzLCByb3cuaW5wdXQuc3BsaXQoJyAnKSwgbWVzc2FnZSwgcm93LmNhcHRpb24pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgY29tbWFuZHM6IHtcbiAgICBmZ2k6IHtcbiAgICAgIHVzYWdlOiAnZmdpIFtnYW1lXSBbaW5wdXRzXScsXG4gICAgICBkZXNjOiAnQ29udmVydHMgYSBsaXN0IG9mIGlucHV0cyBpbnRvIGFuIGltYWdlJyxcbiAgICAgIGV4YW1wbGU6ICdmZ2kgc2YgMjM2UCAyMTRLJyxcbiAgICAgIGV4ZWN1dGU6IGFzeW5jICh7IHBhcmFtIH0sIHsgbWVzc2FnZSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IFssIGdhbWUsIGkxXSA9IHBhcmFtXG4gICAgICAgIGlmICghZ2FtZSB8fCAhaTEpIHJldHVybiBtZXNzYWdlLnJlcGx5KCdNaXNzaW5nIGFyZ3VtZW50cy4gRXhhbXBsZTogPmZnaSBzZiAyMzZQIDIxNEsnKVxuICAgICAgICBpZiAoIWdhbWVJbnB1dHMuaGFzKGdhbWUpKSByZXR1cm4gbWVzc2FnZS5yZXBseShgXCIke2dhbWV9XCIgaXMgbm90IGEgdmFsaWQgZ2FtZS4gQXZhaWxhYmxlIGdhbWVzOiAke0FycmF5LmZyb20oZ2FtZUlucHV0cy5rZXlzKCkpLmpvaW4oJyAnKX1gKVxuXG4gICAgICAgIGNvbnN0IGlucHV0cyA9IG5ldyBNYXAoWy4uLmJhc2ljSW5wdXRzLCAuLi5nYW1lSW5wdXRzLmdldChnYW1lKV0pXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcmFtLnNsaWNlKDIpLm1hcChpID0+IHNvbHZlSW5wdXQoaW5wdXRzLCBpLnRvTG93ZXJDYXNlKCkpKS5mbGF0KClcblxuICAgICAgICBzZW5kSW5wdXQoaW5wdXRzLCByZXN1bHQsIG1lc3NhZ2UpXG4gICAgICB9XG4gICAgfSxcbiAgICBmZ3NhdmU6IHtcbiAgICAgIHVzYWdlOiAnZmdzYXZlIFtnYW1lXSBbbmFtZV0gW2lucHV0c10nLFxuICAgICAgZGVzYzogJ1NhdmVzIGEgbGlzdCBvZiBpbnB1dHMgaW50byBhIGNvbW1hbmQnLFxuICAgICAgZXhhbXBsZTogJ2ZnaSBzZiB0ZXN0TmFtZSAyMzZQIDIxNEsnLFxuICAgICAgZXhlY3V0ZTogYXN5bmMgKHsgcGFyYW0sIHNlcXVlbGl6ZSB9LCB7IG1lc3NhZ2UgfSkgPT4ge1xuICAgICAgICBjb25zdCBbLCBnYW1lLCBuYW1lLCBpMV0gPSBwYXJhbVxuICAgICAgICBpZiAoIWdhbWUgfHwgIW5hbWUgfHwgIWkxKSByZXR1cm4gbWVzc2FnZS5yZXBseSgnTWlzc2luZyBhcmd1bWVudHMuIEV4YW1wbGU6ID5mZ2kgc2YgdGVzdE5hbWUgMjM2UCAyMTRLJylcbiAgICAgICAgaWYgKCFnYW1lSW5wdXRzLmhhcyhnYW1lKSkgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYFwiJHtnYW1lfVwiIGlzIG5vdCBhIHZhbGlkIGdhbWUuIEF2YWlsYWJsZSBnYW1lczogJHtBcnJheS5mcm9tKGdhbWVJbnB1dHMua2V5cygpKS5qb2luKCcgJyl9YClcblxuICAgICAgICBjb25zdCBpbnB1dHMgPSBuZXcgTWFwKFsuLi5iYXNpY0lucHV0cywgLi4uZ2FtZUlucHV0cy5nZXQoZ2FtZSldKVxuICAgICAgICBjb25zdCBpbnB1dCA9IHBhcmFtLnNsaWNlKDMpLm1hcChpID0+IHNvbHZlSW5wdXQoaW5wdXRzLCBpLnRvTG93ZXJDYXNlKCkpKS5mbGF0KCkuam9pbignICcpXG5cbiAgICAgICAgYXdhaXQgc2VxdWVsaXplLm1vZGVscy5mZ2lucHV0LmNyZWF0ZSh7IGd1aWxkOiBtZXNzYWdlLmd1aWxkLmlkLCBuYW1lLCBjcmVhdGVkQnk6IG1lc3NhZ2UuYXV0aG9yLmlkLCBnYW1lLCBpbnB1dCB9KVxuXG4gICAgICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGBTYXZlZCBjb21tYW5kIFwiJHtpbnB1dH1cIiBhcyBcIiR7bmFtZX1cImApXG4gICAgICB9XG4gICAgfSxcbiAgICBmZ2NhcHRpb246IHtcbiAgICAgIHVzYWdlOiAnZmdjYXB0aW9uIFtuYW1lXSBbY2FwdGlvbl0nLFxuICAgICAgZGVzYzogJ0FkZHMgYSBjYXB0aW9uIHRvIGEgc2F2ZWQgaW5wdXQgY29tbWFuZCcsXG4gICAgICBleGFtcGxlOiAnZmdjYXB0aW9uIHRlc3ROYW1lIFRoaXMgaXMgYSBjYXB0aW9uJyxcbiAgICAgIGV4ZWN1dGU6IGFzeW5jICh7IHBhcmFtLCBzZXF1ZWxpemUgfSwgeyBtZXNzYWdlIH0pID0+IHtcbiAgICAgICAgY29uc3QgWywgbmFtZSwgaTFdID0gcGFyYW1cbiAgICAgICAgaWYgKCFuYW1lIHx8ICFpMSkgcmV0dXJuIG1lc3NhZ2UucmVwbHkoJ01pc3NpbmcgYXJndW1lbnRzLiBFeGFtcGxlOiA+ZmdpIHRlc3ROYW1lIFRoaXMgaXMgYSBjYXB0aW9uJylcblxuICAgICAgICBjb25zdCByb3cgPSBhd2FpdCBzZXF1ZWxpemUubW9kZWxzLmZnaW5wdXQuZmluZE9uZSh7XG4gICAgICAgICAgd2hlcmU6IHsgZ3VpbGQ6IG1lc3NhZ2UuZ3VpbGQuaWQsIG5hbWUgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmICghcm93KSByZXR1cm4gbWVzc2FnZS5yZXBseShgXCIke25hbWV9XCIgaXMgbm90IGEgc2F2ZWQgaW5wdXQgbGlzdGApXG4gICAgICAgIHJvdy5jYXB0aW9uID0gcGFyYW0uc2xpY2UoMikuam9pbignICcpXG4gICAgICAgIGF3YWl0IHJvdy5zYXZlKClcblxuICAgICAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZChgU2F2ZWQgY2FwdGlvbiBmb3IgaW5wdXQgbGlzdCBcIiR7bmFtZX1cImApXG4gICAgICB9XG4gICAgfSxcbiAgICBmZ2dsb3NzYXJ5OiB7XG4gICAgICB1c2FnZTogJ2ZnZ2xvc3NhcnkgW3NlYXJjaCB0ZXJtXScsXG4gICAgICBkZXNjOiAnU2VhcmNoZXMgZm9yIGEgdGVybSBvbiBJbmZpbFxcJ3MgR2xvc3NhcnknLFxuICAgICAgZXhhbXBsZTogJ2ZnZ2xvc3NhcnkgbWV4aWNhbiB1cHBlcmN1dCcsXG4gICAgICBleGVjdXRlOiBhc3luYyAoeyBwYXJhbSwgc2VxdWVsaXplIH0sIHsgbWVzc2FnZSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHBhcmFtLnNsaWNlKDEpXG4gICAgICAgIGlmIChwYXJhbXMubGVuZ3RoID09PSAwKSByZXR1cm4gbWVzc2FnZS5yZXBseSgnTWlzc2luZyBzZWFyY2ggdGVybS4gRXhhbXBsZTogPmZnZ2xvc3NhcnkgbWV4aWNhbiB1cHBlcmN1dCcpXG5cbiAgICAgICAgY29uc3Qgc2VhcmNoID0gcGFyYW1zLmpvaW4oJyAnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRlcm1zLmZpbHRlcihpID0+IGkuaW5jbHVkZXMoc2VhcmNoKSlcbiAgICAgICAgY29uc3QgdXJsID0gYGh0dHBzOi8vZ2xvc3NhcnkuaW5maWwubmV0Lz90PSR7cGFyYW1zLmpvaW4oJyUyMCcpLnRvTG93ZXJDYXNlKCl9YFxuXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSByZXR1cm4gbWVzc2FnZS5yZXBseShgVGVybSBcIiR7c2VhcmNofVwiIG5vdCBmb3VuZGApXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAxKSByZXR1cm4gbWVzc2FnZS5yZXBseShgXFxgXFxgXFxgJHtnbG9zc2FyeVtyZXN1bHRbMF1dLmRlZn1cXGBcXGBcXGBTb3VyY2U6IDwke3VybH0+YClcblxuICAgICAgICBtZXNzYWdlLnJlcGx5KHVybClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==