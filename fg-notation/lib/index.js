"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _sharp = _interopRequireDefault(require("sharp"));

var _path = _interopRequireDefault(require("path"));

var _glob = _interopRequireDefault(require("glob"));

var _sequelize = require("sequelize");

var imgPath = _path["default"].join(__dirname, 'img');

var basicInputs = new Map();
var gameInputs = new Map();

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
  _sendInput = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(inputs, result, message, caption) {
    var canvas;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
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
            canvas = _context5.sent;
            return _context5.abrupt("return", message.reply({
              content: caption,
              files: [canvas]
            }));

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _sendInput.apply(this, arguments);
}

var builtin = {
  37: {
    game: 'sf',
    caption: '***LETS GO JUSTIN!***',
    input: '6 6 6 6 6 6 6 >> 6 6 6 6 6 6 6 >> 8 6 j. hk >> 2 mk >> 623 hp >> 236 236 lk'
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
    }
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbWdQYXRoIiwicGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJiYXNpY0lucHV0cyIsIk1hcCIsImdhbWVJbnB1dHMiLCJnbG9iIiwic3luYyIsIm5vZGlyIiwiZm9yRWFjaCIsInAiLCJpbnB1dCIsInNwbGl0IiwicG9wIiwicmVwbGFjZSIsInNldCIsInBhcnNlIiwicmVsYXRpdmUiLCJkaXIiLCJuYW1lIiwiaGFzIiwiZ2V0Iiwic29sdmVJbnB1dCIsImlucHV0cyIsImkiLCJsZW5ndGgiLCJzMSIsInNsaWNlIiwiRXJyb3IiLCJzZW5kSW5wdXQiLCJyZXN1bHQiLCJtZXNzYWdlIiwiY2FwdGlvbiIsImNyZWF0ZSIsIndpZHRoIiwiaGVpZ2h0IiwiY2hhbm5lbHMiLCJiYWNrZ3JvdW5kIiwiY29tcG9zaXRlIiwibWFwIiwiaXQiLCJpbmRleCIsImxlZnQiLCJ0b3AiLCJwbmciLCJ0b0J1ZmZlciIsImNhbnZhcyIsInJlcGx5IiwiY29udGVudCIsImZpbGVzIiwiYnVpbHRpbiIsImdhbWUiLCJpbnRlbnRzIiwicGFydGlhbHMiLCJwcmVsb2FkIiwic2VxdWVsaXplIiwiZGVmaW5lIiwiZ3VpbGQiLCJ0eXBlIiwiRGF0YVR5cGVzIiwiU1RSSU5HIiwicHJpbWFyeUtleSIsImNyZWF0ZWRCeSIsImV2ZW50cyIsIm1lc3NhZ2VDcmVhdGUiLCJnbG9iYWwiLCJjbGllbnQiLCJjb25maWciLCJhdXRob3IiLCJpZCIsInVzZXIiLCJtZW1iZXIiLCJndWlsZElkIiwicHJlZml4Iiwic3RhcnRzV2l0aCIsIm1vZGVscyIsImZnaW5wdXQiLCJmaW5kT25lIiwid2hlcmUiLCJyb3ciLCJjb21tYW5kcyIsImZnaSIsInVzYWdlIiwiZGVzYyIsImV4YW1wbGUiLCJleGVjdXRlIiwicGFyYW0iLCJpMSIsIkFycmF5IiwiZnJvbSIsImtleXMiLCJ0b0xvd2VyQ2FzZSIsImZsYXQiLCJmZ3NhdmUiLCJjaGFubmVsIiwic2Vu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QUVyQixzQkFBQUEsS0FBSyxFQUFFMUIsT0FBTyxDQUFDMEIsS0FBUixDQUFjWSxFQUF2QjtBQUEyQmxELHNCQUFBQSxJQUFJLEVBQUpBO0FBQTNCO0FBRDBDLG1CQUFqQyxDQUpYOztBQUFBO0FBSUQ0RCxrQkFBQUEsR0FKQzs7QUFBQSxzQkFRRkEsR0FSRTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxvREFRVWhELE9BQU8sQ0FBQ2dCLEtBQVIsYUFBa0I1QixJQUFsQixrQ0FSVjs7QUFBQTtBQVNQNEQsa0JBQUFBLEdBQUcsQ0FBQy9DLE9BQUosR0FBY3NELEtBQUssQ0FBQzNELEtBQU4sQ0FBWSxDQUFaLEVBQWUxQixJQUFmLENBQW9CLEdBQXBCLENBQWQ7QUFUTztBQUFBLHlCQVVEOEUsR0FBRyxDQUFDa0IsSUFBSixFQVZDOztBQUFBO0FBWVBsRSxrQkFBQUEsT0FBTyxDQUFDK0QsT0FBUixDQUFnQkMsSUFBaEIsMENBQXNENUUsSUFBdEQ7O0FBWk87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUpFO0FBakNIO0FBOUNHLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2hhcnAgZnJvbSAnc2hhcnAnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InXHJcbmltcG9ydCB7IERhdGFUeXBlcyB9IGZyb20gJ3NlcXVlbGl6ZSdcclxuXHJcbmNvbnN0IGltZ1BhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnaW1nJylcclxuY29uc3QgYmFzaWNJbnB1dHMgPSBuZXcgTWFwKClcclxuY29uc3QgZ2FtZUlucHV0cyA9IG5ldyBNYXAoKVxyXG5cclxuZ2xvYi5zeW5jKHBhdGguam9pbihpbWdQYXRoLCAnYmFzaWMvKionKSwgeyBub2RpcjogdHJ1ZSB9KVxyXG4gIC5mb3JFYWNoKHAgPT4ge1xyXG4gICAgY29uc3QgaW5wdXQgPSBwLnNwbGl0KCcvJykucG9wKCkucmVwbGFjZSgnLnBuZycsICcnKVxyXG4gICAgYmFzaWNJbnB1dHMuc2V0KGlucHV0LCBwKVxyXG4gIH0pXHJcblxyXG5iYXNpY0lucHV0cy5zZXQoJz4+JywgcGF0aC5qb2luKGltZ1BhdGgsICdiYXNpYy9kb3VibGVmb3J3YXJkLnBuZycpKVxyXG5cclxuZ2xvYi5zeW5jKHBhdGguam9pbihpbWdQYXRoLCAnZ2FtZXMvKionKSwgeyBub2RpcjogdHJ1ZSB9KVxyXG4gIC5mb3JFYWNoKHAgPT4ge1xyXG4gICAgY29uc3QgeyBkaXIsIG5hbWUgfSA9IHBhdGgucGFyc2UocGF0aC5yZWxhdGl2ZShwYXRoLmpvaW4oaW1nUGF0aCwgJ2dhbWVzJyksIHApKVxyXG5cclxuICAgIGlmICghZ2FtZUlucHV0cy5oYXMoZGlyKSkgZ2FtZUlucHV0cy5zZXQoZGlyLCBuZXcgTWFwKCkpXHJcbiAgICBnYW1lSW5wdXRzLmdldChkaXIpLnNldChuYW1lLCBwKVxyXG4gIH0pXHJcblxyXG5mdW5jdGlvbiBzb2x2ZUlucHV0IChpbnB1dHMsIGlucHV0KSB7XHJcbiAgaWYgKGlucHV0cy5oYXMoaW5wdXQpKSByZXR1cm4gW2lucHV0XVxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBzMSA9IGlucHV0LnNsaWNlKDAsIDAgLSBpKVxyXG4gICAgaWYgKGlucHV0cy5oYXMoczEpKSByZXR1cm4gW3MxLCAuLi5zb2x2ZUlucHV0KGlucHV0cywgaW5wdXQuc2xpY2UoMCAtIGkpKV1cclxuICB9XHJcblxyXG4gIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgXCIke2lucHV0fVwiIGFzIGEgcmVjb2duaXphYmxlIGlucHV0YClcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2VuZElucHV0IChpbnB1dHMsIHJlc3VsdCwgbWVzc2FnZSwgY2FwdGlvbikge1xyXG4gIGNvbnN0IGNhbnZhcyA9IGF3YWl0IHNoYXJwKHsgY3JlYXRlOiB7IHdpZHRoOiAxNTIgKiByZXN1bHQubGVuZ3RoLCBoZWlnaHQ6IDE1MiwgY2hhbm5lbHM6IDQsIGJhY2tncm91bmQ6ICd0cmFuc3BhcmVudCcgfSB9KVxyXG4gICAgLmNvbXBvc2l0ZShyZXN1bHQubWFwKChpdCwgaW5kZXgpID0+XHJcbiAgICAgICh7IGlucHV0OiBpbnB1dHMuZ2V0KGl0KSwgbGVmdDogaW5kZXggKiAxNTIsIHRvcDogMCwgd2lkdGg6IDE1MiwgaGVpZ2h0OiAxNTIgfSlcclxuICAgICkpXHJcbiAgICAucG5nKClcclxuICAgIC50b0J1ZmZlcigpXHJcblxyXG4gIHJldHVybiBtZXNzYWdlLnJlcGx5KHsgY29udGVudDogY2FwdGlvbiwgZmlsZXM6IFtjYW52YXNdIH0pXHJcbn1cclxuXHJcbmNvbnN0IGJ1aWx0aW4gPSB7XHJcbiAgMzc6IHtcclxuICAgIGdhbWU6ICdzZicsXHJcbiAgICBjYXB0aW9uOiAnKioqTEVUUyBHTyBKVVNUSU4hKioqJyxcclxuICAgIGlucHV0OiAnNiA2IDYgNiA2IDYgNiA+PiA2IDYgNiA2IDYgNiA2ID4+IDggNiBqLiBoayA+PiAyIG1rID4+IDYyMyBocCA+PiAyMzYgMjM2IGxrJ1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdmZy1ub3RhdGlvbicsXHJcbiAgaW50ZW50czogWydHVUlMRF9NRVNTQUdFUyddLFxyXG4gIHBhcnRpYWxzOiBbJ01FU1NBR0UnXSxcclxuXHJcbiAgcHJlbG9hZDogc2VxdWVsaXplID0+IHtcclxuICAgIHNlcXVlbGl6ZS5kZWZpbmUoJ2ZnaW5wdXQnLCB7XHJcbiAgICAgIGd1aWxkOiB7XHJcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgICBwcmltYXJ5S2V5OiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIG5hbWU6IHtcclxuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICAgIHByaW1hcnlLZXk6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgY3JlYXRlZEJ5OiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICBnYW1lOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICBjYXB0aW9uOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICBpbnB1dDogRGF0YVR5cGVzLlNUUklOR1xyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBldmVudHM6IHtcclxuICAgIGFzeW5jIG1lc3NhZ2VDcmVhdGUgKGdsb2JhbCwgbWVzc2FnZSkge1xyXG4gICAgICBjb25zdCB7IGNsaWVudCwgY29uZmlnLCBzZXF1ZWxpemUgfSA9IGdsb2JhbFxyXG4gICAgICBpZiAobWVzc2FnZS5hdXRob3IuaWQgPT09IGNsaWVudC51c2VyLmlkIHx8ICFtZXNzYWdlLm1lbWJlcikgcmV0dXJuXHJcblxyXG4gICAgICBjb25zdCBndWlsZElkID0gbWVzc2FnZS5ndWlsZElkXHJcbiAgICAgIGNvbnN0IHsgcHJlZml4IH0gPSBjb25maWdbZ3VpbGRJZF1cclxuXHJcbiAgICAgIGlmIChtZXNzYWdlLmNvbnRlbnQuc3RhcnRzV2l0aChwcmVmaXgpKSB7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IG1lc3NhZ2UuY29udGVudC5zcGxpdCgnICcpLnBvcCgpLnJlcGxhY2UocHJlZml4LCAnJylcclxuICAgICAgICBjb25zdCByb3cgPSBidWlsdGluW25hbWVdIHx8IChcclxuICAgICAgICAgIGF3YWl0IHNlcXVlbGl6ZS5tb2RlbHMuZmdpbnB1dC5maW5kT25lKHtcclxuICAgICAgICAgICAgd2hlcmU6IHsgZ3VpbGQ6IG1lc3NhZ2UuZ3VpbGQuaWQsIG5hbWUgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICApXHJcblxyXG4gICAgICAgIGlmIChyb3cpIHtcclxuICAgICAgICAgIGNvbnN0IGlucHV0cyA9IG5ldyBNYXAoWy4uLmJhc2ljSW5wdXRzLCAuLi5nYW1lSW5wdXRzLmdldChyb3cuZ2FtZSldKVxyXG4gICAgICAgICAgc2VuZElucHV0KGlucHV0cywgcm93LmlucHV0LnNwbGl0KCcgJyksIG1lc3NhZ2UsIHJvdy5jYXB0aW9uKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbW1hbmRzOiB7XHJcbiAgICBmZ2k6IHtcclxuICAgICAgdXNhZ2U6ICdmZ2kgW2dhbWVdIFtpbnB1dHNdJyxcclxuICAgICAgZGVzYzogJ0NvbnZlcnRzIGEgbGlzdCBvZiBpbnB1dHMgaW50byBhbiBpbWFnZScsXHJcbiAgICAgIGV4YW1wbGU6ICdmZ2kgc2YgMjM2UCAyMTRLJyxcclxuICAgICAgZXhlY3V0ZTogYXN5bmMgKHsgcGFyYW0gfSwgeyBtZXNzYWdlIH0pID0+IHtcclxuICAgICAgICBjb25zdCBbLCBnYW1lLCBpMV0gPSBwYXJhbVxyXG4gICAgICAgIGlmICghZ2FtZSB8fCAhaTEpIHJldHVybiBtZXNzYWdlLnJlcGx5KCdNaXNzaW5nIGFyZ3VtZW50cy4gRXhhbXBsZTogPmZnaSBzZiAyMzZQIDIxNEsnKVxyXG4gICAgICAgIGlmICghZ2FtZUlucHV0cy5oYXMoZ2FtZSkpIHJldHVybiBtZXNzYWdlLnJlcGx5KGBcIiR7Z2FtZX1cIiBpcyBub3QgYSB2YWxpZCBnYW1lLiBBdmFpbGFibGUgZ2FtZXM6ICR7QXJyYXkuZnJvbShnYW1lSW5wdXRzLmtleXMoKSkuam9pbignICcpfWApXHJcblxyXG4gICAgICAgIGNvbnN0IGlucHV0cyA9IG5ldyBNYXAoWy4uLmJhc2ljSW5wdXRzLCAuLi5nYW1lSW5wdXRzLmdldChnYW1lKV0pXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyYW0uc2xpY2UoMikubWFwKGkgPT4gc29sdmVJbnB1dChpbnB1dHMsIGkudG9Mb3dlckNhc2UoKSkpLmZsYXQoKVxyXG5cclxuICAgICAgICBzZW5kSW5wdXQoaW5wdXRzLCByZXN1bHQsIG1lc3NhZ2UpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBmZ3NhdmU6IHtcclxuICAgICAgdXNhZ2U6ICdmZ3NhdmUgW2dhbWVdIFtuYW1lXSBbaW5wdXRzXScsXHJcbiAgICAgIGRlc2M6ICdTYXZlcyBhIGxpc3Qgb2YgaW5wdXRzIGludG8gYSBjb21tYW5kJyxcclxuICAgICAgZXhhbXBsZTogJ2ZnaSBzZiB0ZXN0TmFtZSAyMzZQIDIxNEsnLFxyXG4gICAgICBleGVjdXRlOiBhc3luYyAoeyBwYXJhbSwgc2VxdWVsaXplIH0sIHsgbWVzc2FnZSB9KSA9PiB7XHJcbiAgICAgICAgY29uc3QgWywgZ2FtZSwgbmFtZSwgaTFdID0gcGFyYW1cclxuICAgICAgICBpZiAoIWdhbWUgfHwgIW5hbWUgfHwgIWkxKSByZXR1cm4gbWVzc2FnZS5yZXBseSgnTWlzc2luZyBhcmd1bWVudHMuIEV4YW1wbGU6ID5mZ2kgc2YgdGVzdE5hbWUgMjM2UCAyMTRLJylcclxuICAgICAgICBpZiAoIWdhbWVJbnB1dHMuaGFzKGdhbWUpKSByZXR1cm4gbWVzc2FnZS5yZXBseShgXCIke2dhbWV9XCIgaXMgbm90IGEgdmFsaWQgZ2FtZS4gQXZhaWxhYmxlIGdhbWVzOiAke0FycmF5LmZyb20oZ2FtZUlucHV0cy5rZXlzKCkpLmpvaW4oJyAnKX1gKVxyXG5cclxuICAgICAgICBjb25zdCBpbnB1dHMgPSBuZXcgTWFwKFsuLi5iYXNpY0lucHV0cywgLi4uZ2FtZUlucHV0cy5nZXQoZ2FtZSldKVxyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gcGFyYW0uc2xpY2UoMykubWFwKGkgPT4gc29sdmVJbnB1dChpbnB1dHMsIGkudG9Mb3dlckNhc2UoKSkpLmZsYXQoKS5qb2luKCcgJylcclxuXHJcbiAgICAgICAgYXdhaXQgc2VxdWVsaXplLm1vZGVscy5mZ2lucHV0LmNyZWF0ZSh7IGd1aWxkOiBtZXNzYWdlLmd1aWxkLmlkLCBuYW1lLCBjcmVhdGVkQnk6IG1lc3NhZ2UuYXV0aG9yLmlkLCBnYW1lLCBpbnB1dCB9KVxyXG5cclxuICAgICAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZChgU2F2ZWQgY29tbWFuZCBcIiR7aW5wdXR9XCIgYXMgXCIke25hbWV9XCJgKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZmdjYXB0aW9uOiB7XHJcbiAgICAgIHVzYWdlOiAnZmdjYXB0aW9uIFtuYW1lXSBbY2FwdGlvbl0nLFxyXG4gICAgICBkZXNjOiAnQWRkcyBhIGNhcHRpb24gdG8gYSBzYXZlZCBpbnB1dCBjb21tYW5kJyxcclxuICAgICAgZXhhbXBsZTogJ2ZnY2FwdGlvbiB0ZXN0TmFtZSBUaGlzIGlzIGEgY2FwdGlvbicsXHJcbiAgICAgIGV4ZWN1dGU6IGFzeW5jICh7IHBhcmFtLCBzZXF1ZWxpemUgfSwgeyBtZXNzYWdlIH0pID0+IHtcclxuICAgICAgICBjb25zdCBbLCBuYW1lLCBpMV0gPSBwYXJhbVxyXG4gICAgICAgIGlmICghbmFtZSB8fCAhaTEpIHJldHVybiBtZXNzYWdlLnJlcGx5KCdNaXNzaW5nIGFyZ3VtZW50cy4gRXhhbXBsZTogPmZnaSB0ZXN0TmFtZSBUaGlzIGlzIGEgY2FwdGlvbicpXHJcblxyXG4gICAgICAgIGNvbnN0IHJvdyA9IGF3YWl0IHNlcXVlbGl6ZS5tb2RlbHMuZmdpbnB1dC5maW5kT25lKHtcclxuICAgICAgICAgIHdoZXJlOiB7IGd1aWxkOiBtZXNzYWdlLmd1aWxkLmlkLCBuYW1lIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBpZiAoIXJvdykgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYFwiJHtuYW1lfVwiIGlzIG5vdCBhIHNhdmVkIGlucHV0IGxpc3RgKVxyXG4gICAgICAgIHJvdy5jYXB0aW9uID0gcGFyYW0uc2xpY2UoMikuam9pbignICcpXHJcbiAgICAgICAgYXdhaXQgcm93LnNhdmUoKVxyXG5cclxuICAgICAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZChgU2F2ZWQgY2FwdGlvbiBmb3IgaW5wdXQgbGlzdCBcIiR7bmFtZX1cImApXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19