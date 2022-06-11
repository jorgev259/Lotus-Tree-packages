"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _getUrls = _interopRequireDefault(require("get-urls"));

var _util = require("./util");

var _default = {
  refresh: {
    desc: 'Reposts all open requests.',
    usage: 'refresh',
    execute: function execute(_ref, _ref2) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var socdb, message, requests, request;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                socdb = _ref.socdb;
                message = _ref2.message;
                _context.next = 4;
                return socdb.models.request.findAll({
                  where: {
                    state: (0, _defineProperty2["default"])({}, _sequelize.Op.not, 'complete')
                  }
                });

              case 4:
                requests = _context.sent;
                request = requests.shift();

              case 6:
                if (!request) {
                  _context.next = 14;
                  break;
                }

                if (request) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return");

              case 9:
                _context.next = 11;
                return sendEmbed(message, request);

              case 11:
                request = requests.shift();
                _context.next = 6;
                break;

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  },
  pending: {
    desc: 'Shows how many pending requests you have.',
    execute: function execute(_ref3, _ref4) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var sequelize, configFile, socdb, msg, requests, count;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sequelize = _ref3.sequelize, configFile = _ref3.configFile, socdb = _ref3.socdb;
                msg = _ref4.message;
                _context2.next = 4;
                return socdb.models.request.findAll({
                  attributes: ['state', [sequelize.fn('COUNT', '*'), 'count']],
                  where: {
                    userID: msg.author.id
                  },
                  group: 'state'
                });

              case 4:
                requests = _context2.sent;
                count = {
                  pending: 0,
                  complete: 0,
                  hold: 0
                };
                requests.forEach(function (row) {
                  count[row.state] = row.count;
                });
                msg.reply("Pending: ".concat(count.pending, "\nOn Hold: ").concat(count.hold, "\nCompleted: ").concat(count.complete));

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  },
  hold: {
    desc: 'Marks a request as ON HOLD.',
    usage: 'hold [id] [reason]',
    execute: function execute(_ref5, _ref6) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var client, param, socdb, configFile, msg, request, reason;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                client = _ref5.client, param = _ref5.param, socdb = _ref5.socdb, configFile = _ref5.configFile;
                msg = _ref6.message;

                if (param[2]) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", msg.reply('Incomplete command.'));

              case 4:
                _context3.next = 6;
                return socdb.models.request.findByPk(param[1]);

              case 6:
                request = _context3.sent;

                if (request) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt("return", msg.reply('Request not found'));

              case 9:
                if (!(request.state === 'hold')) {
                  _context3.next = 11;
                  break;
                }

                return _context3.abrupt("return", msg.reply('Request already on hold'));

              case 11:
                reason = param.slice(2).join(' ');
                _context3.next = 14;
                return (0, _util.holdRequest)(client, socdb, configFile.requestcat.guild, request, reason);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  },
  request: {
    desc: 'Request a soundtrack',
    usage: 'request [url or name]',
    execute: function execute(_ref7, _ref8) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var param, socdb, msg, donator, owner, talkChannel, pending, countPending, title, urls, link, checkUrl, info, request;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                param = _ref7.param, socdb = _ref7.socdb;
                msg = _ref8.message;

                if (param[1]) {
                  _context5.next = 4;
                  break;
                }

                return _context5.abrupt("return", msg.channel.send('Please provide a url or name'));

              case 4:
                donator = msg.member.roles.cache.some(function (r) {
                  return r.name === 'Donators';
                });
                owner = msg.member.roles.cache.some(function (r) {
                  return r.name === 'Owner';
                });
                talkChannel = msg.guild.channels.cache.find(function (c) {
                  return c.name === 'request-talk';
                });

                if (donator || owner) {
                  _context5.next = 22;
                  break;
                }

                _context5.next = 10;
                return socdb.models.request.findOne({
                  where: {
                    userID: msg.author.id,
                    state: 'pending'
                  }
                });

              case 10:
                pending = _context5.sent;

                if (!pending) {
                  _context5.next = 13;
                  break;
                }

                return _context5.abrupt("return", talkChannel.send("The request '".concat(pending.title, " ").concat(pending.url ? "(".concat(pending.url, ")") : '', "' is still on place. Wait until its fulfilled or rejected ").concat(msg.author)));

              case 13:
                _context5.next = 15;
                return (0, _util.getPendingCount)(socdb);

              case 15:
                countPending = _context5.sent;

                if (!(countPending >= 20)) {
                  _context5.next = 22;
                  break;
                }

                _context5.next = 19;
                return msg.channel.send('There are too many open requests right now. Wait until slots are opened.');

              case 19:
                _context5.next = 21;
                return (0, _util.checkLockChannel)(socdb, msg.guild);

              case 21:
                return _context5.abrupt("return");

              case 22:
                title = param.slice(1).join(' ');
                urls = Array.from((0, _getUrls["default"])(title, {
                  normalizeProtocol: false,
                  stripWWW: false,
                  removeTrailingSlash: false,
                  sortQueryParameters: false
                }));

                if (!(urls.length > 1)) {
                  _context5.next = 26;
                  break;
                }

                return _context5.abrupt("return", msg.channel.send('You can only specify one url per request.'));

              case 26:
                link = urls[0];

                if (!(urls.length > 0)) {
                  _context5.next = 39;
                  break;
                }

                _context5.next = 30;
                return socdb.models.request.findOne({
                  where: {
                    link: link
                  }
                });

              case 30:
                checkUrl = _context5.sent;

                if (!checkUrl) {
                  _context5.next = 33;
                  break;
                }

                return _context5.abrupt("return", talkChannel.send("This soundtrack has already been requested: ".concat(link)));

              case 33:
                title = title.replace(link, '');

                if (!link.includes('vgmdb.net')) {
                  _context5.next = 39;
                  break;
                }

                _context5.next = 37;
                return (0, _util.getVGMDB)(link);

              case 37:
                info = _context5.sent;
                if (info) title = info.name;

              case 39:
                request = {
                  title: title.trim(),
                  link: link,
                  user: msg.author.tag,
                  userID: msg.author.id,
                  donator: donator,
                  state: 'pending'
                };
                socdb.transaction( /*#__PURE__*/function () {
                  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(transaction) {
                    var row;
                    return _regenerator["default"].wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return socdb.models.request.create(request, {
                              transaction: transaction
                            });

                          case 2:
                            row = _context4.sent;
                            _context4.next = 5;
                            return sendEmbed(msg, row, transaction);

                          case 5:
                            _context4.next = 7;
                            return msg.reply('Request submitted');

                          case 7:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function (_x) {
                    return _ref9.apply(this, arguments);
                  };
                }()).then(function () {
                  return (0, _util.checkLockChannel)(socdb, msg.guild);
                })["catch"](function (err) {
                  return (0, _util.catchErr)(msg.guild, err);
                });

              case 41:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    }
  },
  complete: {
    desc: 'Marks a request as completed.',
    usage: 'complete [id]',
    execute: function execute(_ref10, _ref11) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var client, param, socdb, configFile, msg, request;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                client = _ref10.client, param = _ref10.param, socdb = _ref10.socdb, configFile = _ref10.configFile;
                msg = _ref11.message;

                if (param[1]) {
                  _context6.next = 4;
                  break;
                }

                return _context6.abrupt("return", msg.reply('Incomplete command.'));

              case 4:
                _context6.next = 6;
                return socdb.models.request.findByPk(param[1]);

              case 6:
                request = _context6.sent;

                if (request) {
                  _context6.next = 9;
                  break;
                }

                return _context6.abrupt("return", msg.reply('Request not found'));

              case 9:
                if (!(request.state === 'complete')) {
                  _context6.next = 11;
                  break;
                }

                return _context6.abrupt("return", msg.reply('Request already complete'));

              case 11:
                _context6.next = 13;
                return (0, _util.completeRequest)(client, socdb, configFile.requestcat.guild, request);

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    }
  },
  reject: {
    desc: 'Marks a request as rejected',
    usage: 'reject [id] [reason]',
    execute: function execute(_ref12, _ref13) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var client, param, socdb, configFile, msg, request, reason;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                client = _ref12.client, param = _ref12.param, socdb = _ref12.socdb, configFile = _ref12.configFile;
                msg = _ref13.message;

                if (param[2]) {
                  _context7.next = 4;
                  break;
                }

                return _context7.abrupt("return", msg.reply('Incomplete command.'));

              case 4:
                _context7.next = 6;
                return socdb.models.request.findByPk(param[1]);

              case 6:
                request = _context7.sent;

                if (request) {
                  _context7.next = 9;
                  break;
                }

                return _context7.abrupt("return", msg.reply('Request not found'));

              case 9:
                reason = param.slice(2).join(' ');
                _context7.next = 12;
                return (0, _util.rejectRequest)(client, socdb, configFile.requestcat.guild, request, reason);

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    }
  }
};
exports["default"] = _default;

function sendEmbed(_x2, _x3, _x4) {
  return _sendEmbed.apply(this, arguments);
}

function _sendEmbed() {
  _sendEmbed = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(msg, request, transaction) {
    var embed, sent;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _util.getEmbed)(request);

          case 2:
            embed = _context8.sent;
            _context8.next = 5;
            return msg.guild.channels.cache.find(function (c) {
              return c.name === 'open-requests';
            }).send({
              embeds: [embed]
            });

          case 5:
            sent = _context8.sent;
            request.message = sent.id;
            _context8.next = 9;
            return request.save({
              transaction: transaction
            });

          case 9:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _sendEmbed.apply(this, arguments);
}