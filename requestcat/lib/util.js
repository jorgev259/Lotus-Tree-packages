"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchErr = catchErr;
exports.checkLockChannel = checkLockChannel;
exports.completeRequest = completeRequest;
exports.getEmbed = getEmbed;
exports.getPendingCount = void 0;
exports.getVGMDB = getVGMDB;
exports.holdRequest = holdRequest;
exports.rejectRequest = rejectRequest;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpOnly = require("@discordjs/core/http-only");
var _axios = require("axios");
function getVGMDB(_x) {
  return _getVGMDB.apply(this, arguments);
}
function _getVGMDB() {
  _getVGMDB = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(link) {
    var url, id, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          url = new URL(link);
          id = url.pathname.split('/').slice(-1);
          _context.prev = 2;
          _context.next = 5;
          return (0, _axios.get)("https://api.nemoralni.site/albums/".concat(id), {
            headers: {
              'x-api-key': 'i-m-a-pig-i-don-t-fight-for-honor-i-fight-for-a-paycheck'
            }
          });
        case 5:
          response = _context.sent;
          return _context.abrupt("return", response.data);
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 9]]);
  }));
  return _getVGMDB.apply(this, arguments);
}
var isValidUrl = function isValidUrl(s) {
  try {
    var testUrl = new URL(s);
    return !!testUrl;
  } catch (err) {
    return false;
  }
};
function getCover(_x2) {
  return _getCover.apply(this, arguments);
}
function _getCover() {
  _getCover = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(link) {
    var data, cover;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return getVGMDB(link);
        case 2:
          data = _context2.sent;
          if (data) {
            _context2.next = 5;
            break;
          }
          return _context2.abrupt("return");
        case 5:
          cover = data.album_cover;
          if (!isValidUrl(cover)) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", {
            url: cover
          });
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getCover.apply(this, arguments);
}
function getEmbed(_x3) {
  return _getEmbed.apply(this, arguments);
}
function _getEmbed() {
  _getEmbed = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(request) {
    var _request$link;
    var image, isHold;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          isHold = request.state === 'hold';
          if (!((_request$link = request.link) !== null && _request$link !== void 0 && _request$link.includes('vgmdb.net'))) {
            _context3.next = 5;
            break;
          }
          _context3.next = 4;
          return getCover(request.link);
        case 4:
          image = _context3.sent;
        case 5:
          return _context3.abrupt("return", {
            fields: [{
              name: 'Request',
              value: "".concat(request.title).concat(request.link ? " (".concat(request.link, ")") : '').concat(isHold ? ' **(ON HOLD)**' : '')
            }, {
              name: 'Requested by',
              value: "<@".concat(request.userID, "> / ").concat(request.userID),
              inline: true
            }, {
              name: 'ID',
              value: request.id.toString(),
              inline: true
            }],
            color: request.donator ? 0xedcd40 : isHold ? 0xc20404 : 0x42bfed,
            image: image
          });
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getEmbed.apply(this, arguments);
}
function editEmbed(_x4, _x5) {
  return _editEmbed.apply(this, arguments);
}
function _editEmbed() {
  _editEmbed = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(guild, request) {
    var channel, embed, m;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          channel = guild.channels.cache.find(function (c) {
            return c.name === 'open-requests';
          });
          _context4.next = 3;
          return getEmbed(request);
        case 3:
          embed = _context4.sent;
          _context4.next = 6;
          return channel.messages.fetch(request.message);
        case 6:
          m = _context4.sent;
          _context4.next = 9;
          return m.edit({
            embed: embed
          });
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _editEmbed.apply(this, arguments);
}
function catchErr(guild, err) {
  console.log(err);
  var channel = guild.channels.cache.find(function (c) {
    return c.name === 'request-talk';
  });
  channel.send('Error returned during request <@194614248511504385>');
}
function checkLockChannel(_x6, _x7) {
  return _checkLockChannel.apply(this, arguments);
}
function _checkLockChannel() {
  _checkLockChannel = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(socdb, guild) {
    var countPending, channel, membersRole, camperRole, permissions;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return getPendingCount(socdb);
        case 2:
          countPending = _context5.sent;
          channel = guild.channels.cache.find(function (c) {
            return c.name === 'request-submission';
          });
          membersRole = guild.roles.cache.find(function (r) {
            return r.name === 'Members';
          });
          camperRole = guild.roles.cache.find(function (r) {
            return r.name === 'Request Camper';
          });
          permissions = channel.permissionsFor(membersRole);
          if (!(countPending >= 20 && permissions.has(_httpOnly.PermissionsBitField.Flags.SendMessages))) {
            _context5.next = 14;
            break;
          }
          _context5.next = 10;
          return channel.permissionOverwrites.edit(membersRole, {
            SEND_MESSAGES: false
          });
        case 10:
          _context5.next = 12;
          return channel.send('Requests closed');
        case 12:
          _context5.next = 19;
          break;
        case 14:
          if (!(countPending < 20 && !permissions.has(_httpOnly.PermissionsBitField.Flags.SendMessages))) {
            _context5.next = 19;
            break;
          }
          _context5.next = 17;
          return channel.permissionOverwrites.edit(membersRole, {
            SEND_MESSAGES: true
          });
        case 17:
          _context5.next = 19;
          return channel.send("Ayo ".concat(camperRole, ", requests are open"));
        case 19:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _checkLockChannel.apply(this, arguments);
}
var getPendingCount = function getPendingCount(socdb) {
  return socdb.models.request.count({
    where: {
      state: 'pending',
      donator: false
    }
  });
};
exports.getPendingCount = getPendingCount;
function completeRequest(_x8, _x9, _x10, _x11) {
  return _completeRequest.apply(this, arguments);
}
function _completeRequest() {
  _completeRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(client, socdb, guildId, request) {
    var guild;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return client.guilds.fetch(guildId);
        case 2:
          guild = _context7.sent;
          _context7.next = 5;
          return socdb.transaction( /*#__PURE__*/function () {
            var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(transaction) {
              var reqMsg;
              return _regenerator["default"].wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.prev = 0;
                    _context6.next = 3;
                    return guild.channels.cache.find(function (c) {
                      return c.name === 'open-requests';
                    }).messages.fetch(request.message);
                  case 3:
                    reqMsg = _context6.sent;
                    _context6.next = 6;
                    return reqMsg["delete"]();
                  case 6:
                    _context6.next = 11;
                    break;
                  case 8:
                    _context6.prev = 8;
                    _context6.t0 = _context6["catch"](0);
                    catchErr(guild, _context6.t0);
                  case 11:
                    _context6.prev = 11;
                    request.state = 'complete';
                    request.message = null;
                    _context6.next = 16;
                    return request.save();
                  case 16:
                    return _context6.finish(11);
                  case 17:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6, null, [[0, 8, 11, 17]]);
            }));
            return function (_x22) {
              return _ref.apply(this, arguments);
            };
          }()).then(function () {
            return checkLockChannel(socdb, guild);
          })["catch"](function (err) {
            return catchErr(guild, err);
          });
        case 5:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _completeRequest.apply(this, arguments);
}
function holdRequest(_x12, _x13, _x14, _x15, _x16) {
  return _holdRequest.apply(this, arguments);
}
function _holdRequest() {
  _holdRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(client, socdb, guildId, request, reason) {
    var guild;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return client.guilds.fetch(guildId);
        case 2:
          guild = _context9.sent;
          _context9.next = 5;
          return socdb.transaction( /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(transaction) {
              var talkChannel;
              return _regenerator["default"].wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    talkChannel = guild.channels.cache.find(function (c) {
                      return c.name === 'request-talk';
                    });
                    request.state = 'hold';
                    request.reason = reason;
                    _context8.next = 5;
                    return request.save();
                  case 5:
                    _context8.next = 7;
                    return talkChannel.send("\"".concat(request.title).concat(request.link ? " (".concat(request.link, ")") : '', "\" from <@").concat(request.userID, "> has been put ON HOLD.\nReason: ").concat(request.reason || 'I made it the fuck up'));
                  case 7:
                    if (!request.message) {
                      _context8.next = 10;
                      break;
                    }
                    _context8.next = 10;
                    return editEmbed(guild, request);
                  case 10:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function (_x23) {
              return _ref2.apply(this, arguments);
            };
          }()).then(function () {
            return checkLockChannel(socdb, guild);
          })["catch"](function (err) {
            return catchErr(guild, err);
          });
        case 5:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _holdRequest.apply(this, arguments);
}
function rejectRequest(_x17, _x18, _x19, _x20, _x21) {
  return _rejectRequest.apply(this, arguments);
}
function _rejectRequest() {
  _rejectRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(client, socdb, guildId, request, reason) {
    var guild;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return client.guilds.fetch(guildId);
        case 2:
          guild = _context12.sent;
          _context12.next = 5;
          return socdb.transaction( /*#__PURE__*/function () {
            var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(transaction) {
              var reqMsg;
              return _regenerator["default"].wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    _context10.next = 2;
                    return guild.channels.cache.find(function (c) {
                      return c.name === 'open-requests';
                    }).messages.fetch(request.message);
                  case 2:
                    reqMsg = _context10.sent;
                    _context10.next = 5;
                    return reqMsg["delete"]();
                  case 5:
                    _context10.next = 7;
                    return request.destroy();
                  case 7:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10);
            }));
            return function (_x24) {
              return _ref3.apply(this, arguments);
            };
          }()).then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
            var talkChannel;
            return _regenerator["default"].wrap(function _callee11$(_context11) {
              while (1) switch (_context11.prev = _context11.next) {
                case 0:
                  talkChannel = guild.channels.cache.find(function (c) {
                    return c.name === 'request-talk';
                  });
                  _context11.next = 3;
                  return talkChannel.send("\"".concat(request.title).concat(request.link ? " (".concat(request.link, ")") : '', "\" from <@").concat(request.userID, "> has been rejected.\nReason: ").concat(reason || 'I made it the fuck up'));
                case 3:
                  _context11.next = 5;
                  return checkLockChannel(socdb, guild);
                case 5:
                case "end":
                  return _context11.stop();
              }
            }, _callee11);
          })))["catch"](function (err) {
            return catchErr(guild, err);
          });
        case 5:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return _rejectRequest.apply(this, arguments);
}