"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.completeRequest = completeRequest;
exports["default"] = void 0;
exports.holdRequest = holdRequest;
exports.rejectRequest = rejectRequest;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _axios = require("axios");

var _getUrls = _interopRequireDefault(require("get-urls"));

var _discord = require("discord.js");

function checkLockChannel(_x, _x2) {
  return _checkLockChannel.apply(this, arguments);
}

function _checkLockChannel() {
  _checkLockChannel = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(socdb, guild) {
    var countPending, channel, membersRole, permissions;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return getPendingCount(socdb);

          case 2:
            countPending = _context8.sent;
            channel = guild.channels.cache.find(function (c) {
              return c.name === 'request-submission';
            });
            membersRole = guild.roles.cache.find(function (r) {
              return r.name === 'Members';
            });
            permissions = channel.permissionsFor(membersRole);

            if (!(countPending >= 20 && permissions.has(_discord.Permissions.FLAGS.SEND_MESSAGES))) {
              _context8.next = 13;
              break;
            }

            _context8.next = 9;
            return channel.permissionOverwrites.edit(membersRole, {
              SEND_MESSAGES: false
            });

          case 9:
            _context8.next = 11;
            return channel.send('Requests closed');

          case 11:
            _context8.next = 18;
            break;

          case 13:
            if (!(countPending < 20 && !permissions.has(_discord.Permissions.FLAGS.SEND_MESSAGES))) {
              _context8.next = 18;
              break;
            }

            _context8.next = 16;
            return channel.permissionOverwrites.edit(membersRole, {
              SEND_MESSAGES: true
            });

          case 16:
            _context8.next = 18;
            return channel.send('Requests open');

          case 18:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
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

function completeRequest(_x3, _x4, _x5, _x6) {
  return _completeRequest.apply(this, arguments);
}

function _completeRequest() {
  _completeRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(client, socdb, guildId, request) {
    var guild;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return client.guilds.fetch(guildId);

          case 2:
            guild = _context10.sent;
            _context10.next = 5;
            return socdb.transaction( /*#__PURE__*/function () {
              var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(transaction) {
                var reqMsg;
                return _regenerator["default"].wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return guild.channels.cache.find(function (c) {
                          return c.name === 'open-requests';
                        }).messages.fetch(request.message);

                      case 2:
                        reqMsg = _context9.sent;
                        _context9.next = 5;
                        return reqMsg["delete"]();

                      case 5:
                        request.state = 'complete';
                        request.message = null;
                        _context9.next = 9;
                        return request.save();

                      case 9:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function (_x25) {
                return _ref14.apply(this, arguments);
              };
            }()).then(function () {
              return checkLockChannel(socdb, guild);
            })["catch"](function (err) {
              return catchErr(guild, err);
            });

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _completeRequest.apply(this, arguments);
}

function holdRequest(_x7, _x8, _x9, _x10, _x11) {
  return _holdRequest.apply(this, arguments);
}

function _holdRequest() {
  _holdRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(client, socdb, guildId, request, reason) {
    var guild;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return client.guilds.fetch(guildId);

          case 2:
            guild = _context12.sent;
            _context12.next = 5;
            return socdb.transaction( /*#__PURE__*/function () {
              var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(transaction) {
                var talkChannel;
                return _regenerator["default"].wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        talkChannel = guild.channels.cache.find(function (c) {
                          return c.name === 'request-talk';
                        });
                        request.state = 'hold';
                        request.reason = reason;
                        _context11.next = 5;
                        return request.save();

                      case 5:
                        _context11.next = 7;
                        return talkChannel.send("\"".concat(request.title).concat(request.link ? " (".concat(request.link, ")") : '', "\" has been put ON HOLD.\nReason: ").concat(request.reason || 'I made it the fuck up', " <@").concat(request.userID, ">"));

                      case 7:
                        if (!request.message) {
                          _context11.next = 10;
                          break;
                        }

                        _context11.next = 10;
                        return editEmbed(guild, request);

                      case 10:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11);
              }));

              return function (_x26) {
                return _ref15.apply(this, arguments);
              };
            }()).then(function () {
              return checkLockChannel(socdb, guild);
            })["catch"](function (err) {
              return catchErr(guild, err);
            });

          case 5:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _holdRequest.apply(this, arguments);
}

function rejectRequest(_x12, _x13, _x14, _x15, _x16) {
  return _rejectRequest.apply(this, arguments);
}

function _rejectRequest() {
  _rejectRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(client, socdb, guildId, request, reason) {
    var guild;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return client.guilds.fetch(guildId);

          case 2:
            guild = _context15.sent;
            _context15.next = 5;
            return socdb.transaction( /*#__PURE__*/function () {
              var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(transaction) {
                var reqMsg;
                return _regenerator["default"].wrap(function _callee13$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        _context13.next = 2;
                        return guild.channels.cache.find(function (c) {
                          return c.name === 'open-requests';
                        }).messages.fetch(request.message);

                      case 2:
                        reqMsg = _context13.sent;
                        _context13.next = 5;
                        return reqMsg["delete"]();

                      case 5:
                        request.state = 'complete';
                        request.reason = reason;
                        _context13.next = 9;
                        return request.save();

                      case 9:
                      case "end":
                        return _context13.stop();
                    }
                  }
                }, _callee13);
              }));

              return function (_x27) {
                return _ref16.apply(this, arguments);
              };
            }()).then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
              var talkChannel;
              return _regenerator["default"].wrap(function _callee14$(_context14) {
                while (1) {
                  switch (_context14.prev = _context14.next) {
                    case 0:
                      talkChannel = guild.channels.cache.find(function (c) {
                        return c.name === 'request-talk';
                      });
                      _context14.next = 3;
                      return talkChannel.send("The request ".concat(request.title || request.link, " from <@").concat(request.userID, "> has been rejected.\nReason: ").concat(reason || 'I made it the fuck up'));

                    case 3:
                      _context14.next = 5;
                      return checkLockChannel(socdb, guild);

                    case 5:
                    case "end":
                      return _context14.stop();
                  }
                }
              }, _callee14);
            })))["catch"](function (err) {
              return catchErr(guild, err);
            });

          case 5:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _rejectRequest.apply(this, arguments);
}

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
                return holdRequest(client, socdb, configFile.requestcat.guild, request, reason);

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
                return getPendingCount(socdb);

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
                return checkLockChannel(socdb, msg.guild);

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
                return getVGMDB(link);

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
                            return sendEmbed(msg, row);

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

                  return function (_x17) {
                    return _ref9.apply(this, arguments);
                  };
                }()).then(function () {
                  return checkLockChannel(socdb, msg.guild);
                })["catch"](function (err) {
                  return catchErr(msg.guild, err);
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
                return completeRequest(client, socdb, configFile.requestcat.guild, request);

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
                return rejectRequest(client, socdb, configFile.requestcat.guild, request, reason);

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

function getVGMDB(_x18) {
  return _getVGMDB.apply(this, arguments);
}

function _getVGMDB() {
  _getVGMDB = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(link) {
    var url, id, response;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            url = new URL(link);
            id = url.pathname.split('/').slice(-1);
            _context16.prev = 2;
            _context16.next = 5;
            return (0, _axios.get)("https://api.nemoralni.site/albums/".concat(id), {
              headers: {
                'x-api-key': 'i-m-a-pig-i-don-t-fight-for-honor-i-fight-for-a-paycheck'
              }
            });

          case 5:
            response = _context16.sent;
            return _context16.abrupt("return", response.data);

          case 9:
            _context16.prev = 9;
            _context16.t0 = _context16["catch"](2);

          case 11:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[2, 9]]);
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

function getCover(_x19) {
  return _getCover.apply(this, arguments);
}

function _getCover() {
  _getCover = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(link) {
    var data, cover;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return getVGMDB(link);

          case 2:
            data = _context17.sent;

            if (data) {
              _context17.next = 5;
              break;
            }

            return _context17.abrupt("return");

          case 5:
            cover = data.album_cover;

            if (!isValidUrl(cover)) {
              _context17.next = 8;
              break;
            }

            return _context17.abrupt("return", {
              url: cover
            });

          case 8:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));
  return _getCover.apply(this, arguments);
}

function getEmbed(_x20) {
  return _getEmbed.apply(this, arguments);
}

function _getEmbed() {
  _getEmbed = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(request) {
    var _request$link;

    var image, isHold;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            isHold = request.state === 'hold';

            if (!((_request$link = request.link) !== null && _request$link !== void 0 && _request$link.includes('vgmdb.net'))) {
              _context18.next = 5;
              break;
            }

            _context18.next = 4;
            return getCover(request.link);

          case 4:
            image = _context18.sent;

          case 5:
            return _context18.abrupt("return", {
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
            return _context18.stop();
        }
      }
    }, _callee18);
  }));
  return _getEmbed.apply(this, arguments);
}

function sendEmbed(_x21, _x22) {
  return _sendEmbed.apply(this, arguments);
}

function _sendEmbed() {
  _sendEmbed = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(msg, request) {
    var embed, sent;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return getEmbed(request);

          case 2:
            embed = _context19.sent;
            _context19.next = 5;
            return msg.guild.channels.cache.find(function (c) {
              return c.name === 'open-requests';
            }).send({
              embeds: [embed]
            });

          case 5:
            sent = _context19.sent;
            request.message = sent.id;
            _context19.next = 9;
            return request.save();

          case 9:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  }));
  return _sendEmbed.apply(this, arguments);
}

function editEmbed(_x23, _x24) {
  return _editEmbed.apply(this, arguments);
}

function _editEmbed() {
  _editEmbed = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(guild, request) {
    var channel, embed, m;
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            channel = guild.channels.cache.find(function (c) {
              return c.name === 'open-requests';
            });
            _context20.next = 3;
            return getEmbed(request);

          case 3:
            embed = _context20.sent;
            _context20.next = 6;
            return channel.messages.fetch(request.message);

          case 6:
            m = _context20.sent;
            _context20.next = 9;
            return m.edit({
              embed: embed
            });

          case 9:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
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