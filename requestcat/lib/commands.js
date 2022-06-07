"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _axios = require("axios");

var _getUrls = _interopRequireDefault(require("get-urls"));

// const moment = require('moment')
function setLockChannel(_x, _x2) {
  return _setLockChannel.apply(this, arguments);
}

function _setLockChannel() {
  _setLockChannel = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(msg, value) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return msg.guild.channels.cache.find(function (c) {
              return c.name === 'request-submission';
            }).permissionOverwrites.edit(msg.guild.roles.cache.find(function (r) {
              return r.name === 'Members';
            }), {
              SEND_MESSAGES: value
            });

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _setLockChannel.apply(this, arguments);
}

var getPendingCount = function getPendingCount(socdb) {
  return socdb.models.request.count({
    where: {
      state: 'pending',
      donator: false
    }
  });
};

module.exports = {
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

  /* hold: {
    desc: 'Marks a request as ON HOLD.',
    usage: 'hold [id] [reason]',
    async execute (client, msg, param, sequelize) {
      if (!param[2]) return msg.channel.send('Incomplete command.')
       const req = (await getId(client, param[1]))[0]
      if (!req) return msg.channel.send('Request not found.')
       const reason = param.slice(2).join(' ')
       const info = {
        request: req.Request,
        user: req['User ID'],
        hold: true,
        id: req.ID,
        msg: req.Message,
        url: req.Link
      }
       editEmbed(msg, sequelize, info)
        .then(async m => {
          const talkChannel = msg.guild.channels.cache.find(c => c.name === 'requests-talk')
          msg.guild.channels.cache.find(c => c.name === 'requests-log').send(`Request: ${info.request}\nBy: <@${info.user}>\nState: ON HOLD by ${msg.author}\nReason: ${reason}`)
           talkChannel.send(`The request ${info.request}${info.url ? ` (${info.url})` : ''} from <@${info.user}> has put ON HOLD.\nReason: ${reason}`)
           doc.useServiceAccountAuth(configFile.requestcat.google)
          await doc.loadInfo()
          const sheetHold = doc.sheetsByIndex[2]
          const sheetRequests = doc.sheetsByIndex[0]
           let userTag = ''
          msg.guild.members.fetch(info.user).then(member => {
            userTag = member.user.tag
          }).finally(async () => {
            sheetHold.addRow([info.id, info.request, userTag, info.user, req.Link, m.id])
             const rows = await sheetRequests.getRows()
            const row = rows.find(e => e.ID === info.id.toString())
            await row.delete()
          })
        })
        .catch(err => catchErr(msg, err))
    }
  }, */
  request: {
    desc: 'Request a soundtrack',
    usage: 'request [url or name]',
    execute: function execute(_ref5, _ref6) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var param, socdb, msg, donator, owner, talkChannel, pending, countPending, title, urls, link, checkUrl, info, request;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                param = _ref5.param, socdb = _ref5.socdb;
                msg = _ref6.message;

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
                  return c.name === 'requests-talk';
                });

                if (donator || owner) {
                  _context5.next = 20;
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
                  _context5.next = 20;
                  break;
                }

                _context5.next = 19;
                return setLockChannel(msg, false);

              case 19:
                return _context5.abrupt("return", msg.channel.send('There are too many open requests right now. Wait until slots are opened.'));

              case 20:
                title = param.slice(1).join(' ');
                urls = Array.from((0, _getUrls["default"])(title, {
                  normalizeProtocol: false,
                  stripWWW: false,
                  removeTrailingSlash: false,
                  sortQueryParameters: false
                }));

                if (!(urls.length > 1)) {
                  _context5.next = 24;
                  break;
                }

                return _context5.abrupt("return", msg.channel.send('You can only specify one url per request.'));

              case 24:
                link = urls[0];

                if (!(urls.length > 0)) {
                  _context5.next = 37;
                  break;
                }

                _context5.next = 28;
                return socdb.models.request.findOne({
                  where: {
                    link: link
                  }
                });

              case 28:
                checkUrl = _context5.sent;

                if (!checkUrl) {
                  _context5.next = 31;
                  break;
                }

                return _context5.abrupt("return", talkChannel.send("This soundtrack has already been requested: ".concat(link)));

              case 31:
                title = title.replace(link, '');

                if (!link.includes('vgmdb.net')) {
                  _context5.next = 37;
                  break;
                }

                _context5.next = 35;
                return getVGMDB(link);

              case 35:
                info = _context5.sent;
                if (info) title = info.name;

              case 37:
                request = {
                  title: title.trim(),
                  link: link,
                  user: msg.author.tag,
                  userID: msg.author.id,
                  donator: donator,
                  state: 'pending'
                };
                socdb.transaction( /*#__PURE__*/function () {
                  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(transaction) {
                    var row;
                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return socdb.models.request.create(request);

                          case 2:
                            row = _context3.sent;
                            _context3.next = 5;
                            return sendEmbed(msg, row);

                          case 5:
                            msg.reply('Request submitted');

                          case 6:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x3) {
                    return _ref7.apply(this, arguments);
                  };
                }()).then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
                  var countPending;
                  return _regenerator["default"].wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          if (!donator) {
                            _context4.next = 2;
                            break;
                          }

                          return _context4.abrupt("return");

                        case 2:
                          _context4.next = 4;
                          return getPendingCount(socdb);

                        case 4:
                          countPending = _context4.sent;

                          if (countPending >= 20) {
                            msg.guild.channels.cache.find(function (c) {
                              return c.name === 'request-submission';
                            }).send('Requests closed');
                            setLockChannel(msg, false);
                          }

                        case 6:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                })))["catch"](function (err) {
                  catchErr(msg, err);
                });

              case 39:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    }
  },

  /* complete: {
    desc: 'Marks a request as completed.',
    usage: 'complete [id]',
    async execute (client, msg, param, sequelize) {
      if (!param[1]) return msg.channel.send('Incomplete command.')
       const req = (await getId(client, param[1], true))[0]
      if (!req) return msg.channel.send('Request not found.')
       await sequelize.models.request.create({
        user: req['User ID'],
        request: `${req.Request}${req.Link ? ` (${req.Link})` : ''}`,
        valid: true
      })
       const sheetRequests = doc.sheetsByIndex[0]
      const rows = await sheetRequests.getRows()
      rows.find(e => e.ID === req.ID.toString()).delete()
       msg.guild.channels.cache.find(c => c.name === 'open-requests').messages.fetch(req.Message).then(async m => {
        await m.delete()
        msg.guild.channels.cache.find(c => c.name === 'requests-log').send(`Request: ${req.Request}\nBy: <@${req.User}>\nState: Completed by ${msg.author}`)
        msg.guild.channels.cache.find(c => c.name === 'last-added-soundtracks').send(`<@${req.User}`).then(m2 => m2.delete())
        const dm = await msg.guild.members.fetch(req.User)
        dm.send(`Your request '${req.Request}' has been uploaded!`).catch(e => {
          msg.guild.channels.cache.find(c => c.name === 'last-added-soundtracks').send(`<@${req.User}>`).then(m2 => m2.delete())
        })
         doc.useServiceAccountAuth(configFile.requestcat.google)
        await doc.loadInfo()
        const sheetComplete = doc.sheetsByIndex[2]
         sheetComplete.addRow([param[1], req.name || req.Request, (await msg.guild.members.fetch(req.User)).user.tag, req.User, req.vgmdb || '', moment().format('D/M/YYYY')])
         if (req.donator === 'NO') {
          const sheetRequests = doc.sheetsByIndex[0]
          const rows = await sheetRequests.getRows()
          rows.find(e => e.ID === param[1].toString()).delete()
        }
      })
    }
  }, */
  reject: {
    desc: 'Marks a request as rejected',
    usage: 'reject [id] [reason]',
    execute: function execute(_ref9, _ref10) {
      /* if (!param[2]) return msg.channel.send('Incomplete command.')
       doc.useServiceAccountAuth(configFile.requestcat.google)
      await doc.loadInfo()
       const req = await getId(param[1])
      if (!req) return msg.channel.send('Request not found.')
       const reason = param.slice(2).join(' ')
       /* sequelize.models.request.create({ user: req.User, request: req.Request, valid: false })
      if (req.Link && req.Link.includes('vgmdb.net')) {
        sequelize.models.vgmdb.destroy({ where: { url: req.Link } })
      }
       const messageId = req.Message
      await req.delete()
       const m = await msg.guild.channels.cache.find(c => c.name === 'open-requests').messages.fetch(messageId)
      await m.delete()
       msg.guild.channels.cache.find(c => c.name === 'requests-log').send(`Request: ${req.Request}\nBy: <@${req.User}>\nState: Rejected by ${msg.author}\nReason: ${reason}`)
      const talkChannel = msg.guild.channels.cache.find(c => c.name === 'requests-talk')
      talkChannel.send(`The request ${req.Request} from <@${req.User}> has been rejected.\nReason: ${reason}`)
      */

      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var client, param, sequelize, configFile, msg;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                client = _ref9.client, param = _ref9.param, sequelize = _ref9.sequelize, configFile = _ref9.configFile;
                msg = _ref10.message;

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    }
  }
};

function handleOldMessage(msg, oldMessage) {
  return new Promise(function (resolve) {
    if (!oldMessage) resolve();
    msg.guild.channels.cache.find(function (c) {
      return c.name === 'open-requests';
    }).messages.fetch(oldMessage).then(function (oldMessage) {
      return oldMessage["delete"]();
    }).then(resolve)["catch"](resolve);
  });
}

function handleVGMDB(info, sequelize) {
  return new Promise(function (resolve) {
    (0, _axios.get)(info.vgmdb.replace('vgmdb.net', 'vgmdb.info')).then(function (_ref11) {
      var data = _ref11.data;
      info.image = {
        url: data.picture_small
      };
      var vgmdbUrl = "https://vgmdb.net/".concat(data.link);
      info.request = data.name;
      info.url = vgmdbUrl;
      resolve(info); // sequelize.models.vgmdb.findOrCreate({ where: { url: vgmdbUrl } })
    })["catch"](function () {
      return resolve(info);
    });
  });
}

function getVGMDB(_x4) {
  return _getVGMDB.apply(this, arguments);
}

function _getVGMDB() {
  _getVGMDB = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(link) {
    var url, id, response;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            url = new URL(link);
            id = url.pathname.split('/').slice(-1);
            _context8.prev = 2;
            _context8.next = 5;
            return (0, _axios.get)("https://api.nemoralni.site/albums/".concat(id), {
              headers: {
                'x-api-key': 'i-m-a-pig-i-don-t-fight-for-honor-i-fight-for-a-paycheck'
              }
            });

          case 5:
            response = _context8.sent;
            return _context8.abrupt("return", response.data);

          case 9:
            _context8.prev = 9;
            _context8.t0 = _context8["catch"](2);

          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[2, 9]]);
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

function getCover(_x5) {
  return _getCover.apply(this, arguments);
}

function _getCover() {
  _getCover = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(link) {
    var data, cover;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return getVGMDB(link);

          case 2:
            data = _context9.sent;

            if (data) {
              _context9.next = 5;
              break;
            }

            return _context9.abrupt("return");

          case 5:
            cover = data.album_cover;

            if (!isValidUrl(cover)) {
              _context9.next = 8;
              break;
            }

            return _context9.abrupt("return", {
              url: cover
            });

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _getCover.apply(this, arguments);
}

function sendEmbed(_x6, _x7) {
  return _sendEmbed.apply(this, arguments);
}
/* function handleVGMDBImage (url, embed) {
  return new Promise(resolve => {
    get(url.replace('vgmdb.net', 'vgmdb.info'))
      .then(({ data }) => {
        embed.image = { url: data.picture_small }
      })
      .finally(() => resolve(embed))
  })
}

 async function editEmbed (msg, sequelize, info) {
  let embed = {
    fields: [
      {
        name: 'Request',
        value: `${info.request}${info.url ? ` (${info.url})` : ''}${info.hold ? ' **(ON HOLD)**' : ''}`
      },
      {
        name: 'Requested by',
        value: `<@${info.user}> / ${info.user}`,
        inline: true
      },
      {
        name: 'ID',
        value: info.id && info.length > 0 ? info.id : 'NOT FOUND',
        inline: true
      }
    ],
    color: info.donator ? 0xedcd40 : (info.hold ? 0xc20404 : 0x42bfed)
  }

  if (info.url && info.url.includes('vgmdb.net')) embed = await handleVGMDBImage(info.url, embed)

  const m = await msg.guild.channels.cache.find(c => c.name === 'open-requests').messages.fetch(info.msg)
  await m.edit({ embed })
  return m
} */


function _sendEmbed() {
  _sendEmbed = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(msg, request) {
    var _request$link;

    var image, isHold, embed, sent;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            isHold = request.state === 'hold';

            if (!((_request$link = request.link) !== null && _request$link !== void 0 && _request$link.includes('vgmdb.net'))) {
              _context10.next = 5;
              break;
            }

            _context10.next = 4;
            return getCover(request.link);

          case 4:
            image = _context10.sent;

          case 5:
            embed = {
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
            };
            _context10.next = 8;
            return msg.guild.channels.cache.find(function (c) {
              return c.name === 'open-requests';
            }).send({
              embeds: [embed]
            });

          case 8:
            sent = _context10.sent;
            request.message = sent.id;
            _context10.next = 12;
            return request.save();

          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _sendEmbed.apply(this, arguments);
}

function catchErr(msg, err) {
  console.log(err);
  msg.channel.send('Something went wrong.');
}