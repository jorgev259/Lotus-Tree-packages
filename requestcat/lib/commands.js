"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

// const moment = require('moment')
var _require = require('axios'),
    get = _require.get;

var getUrls = require('get-urls');

var _require2 = require('google-spreadsheet'),
    GoogleSpreadsheet = _require2.GoogleSpreadsheet;

var doc = new GoogleSpreadsheet('1D7X2YXffGGeLUKM9D_Q0lypuKisDuXsb3Yyj-cySiHQ');
var pages = {
  requests: 0,
  donators: 1,
  hold: 2
};

var getPage = function getPage(name) {
  return doc.sheetsByIndex[pages[name]];
};

var getRows = function getRows(name) {
  return getPage(name).getRows();
};

function getMaxId(_x) {
  return _getMaxId.apply(this, arguments);
}

function _getMaxId() {
  _getMaxId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(doc) {
    var requestRows, donators, hold;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getRows('requests');

          case 2:
            requestRows = _context6.sent.map(function (e) {
              return e.ID;
            });
            _context6.next = 5;
            return getRows('donators');

          case 5:
            donators = _context6.sent.map(function (e) {
              return e.ID;
            });
            _context6.next = 8;
            return getPage('hold').getRows();

          case 8:
            hold = _context6.sent.map(function (e) {
              return e.ID;
            });
            return _context6.abrupt("return", Math.max.apply(Math, [].concat((0, _toConsumableArray2["default"])(requestRows), (0, _toConsumableArray2["default"])(donators), (0, _toConsumableArray2["default"])(hold))));

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getMaxId.apply(this, arguments);
}

function checkPerms(_x2, _x3) {
  return _checkPerms.apply(this, arguments);
}

function _checkPerms() {
  _checkPerms = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(msg, configFile) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (!(getPage('requests').rowCount >= configFile.requestcat.count)) {
              _context7.next = 3;
              break;
            }

            _context7.next = 3;
            return msg.guild.channels.cache.find(function (c) {
              return c.name === 'requests-submission';
            }).edit({
              data: {
                permissionOverwrites: [{
                  id: msg.guild.roles.cache.find(function (r) {
                    return r.name === 'Members';
                  }),
                  deny: 'SEND_MESSAGES'
                }]
              }
            });

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _checkPerms.apply(this, arguments);
}

function getAllRows() {
  return _getAllRows.apply(this, arguments);
}

function _getAllRows() {
  _getAllRows = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var requestRows, holdRows, donatorRows;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return getRows('requests');

          case 2:
            requestRows = _context8.sent;
            _context8.next = 5;
            return getRows('hold');

          case 5:
            holdRows = _context8.sent.map(function (r) {
              r.hold = true;
              return r;
            });
            _context8.next = 8;
            return getRows('donators');

          case 8:
            donatorRows = _context8.sent.map(function (r) {
              r.donator = true;
              return r;
            });
            return _context8.abrupt("return", [].concat((0, _toConsumableArray2["default"])(requestRows), (0, _toConsumableArray2["default"])(donatorRows), (0, _toConsumableArray2["default"])(holdRows)).sort(function (a, b) {
              return a.ID - b.ID;
            }));

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _getAllRows.apply(this, arguments);
}

function getId(_x4) {
  return _getId.apply(this, arguments);
}

function _getId() {
  _getId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(id) {
    var rows;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return getAllRows();

          case 2:
            rows = _context9.sent;
            return _context9.abrupt("return", rows.find(function (r) {
              return r.ID === id;
            }));

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _getId.apply(this, arguments);
}

module.exports = {
  refresh: {
    desc: 'Reposts all open requests.',
    usage: 'refresh',
    execute: function execute(_ref, _ref2) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var client, configFile, sequelize, message, rows, runId;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                runId = function _runId(ids) {
                  if (!ids[0]) return;
                  var row = ids[0];
                  var info = {
                    request: row.Request,
                    user: row['User ID'],
                    id: row.ID,
                    oldMessage: row.Message,
                    hold: row.hold,
                    donator: row.donator
                  };

                  if (row.Link) {
                    var filterUrls = row.Link.split(' ').filter(function (e) {
                      return e.includes('vgmdb.net');
                    });
                    if (filterUrls.length > 0) info.vgmdb = filterUrls[0].replace('vgmdb.net', 'vgmdb.info').replace('(', '').replace(')', '');
                  }

                  sendEmbed(message, sequelize, info, row).then(function () {
                    ids.shift();
                    runId(ids);
                  });
                };

                client = _ref.client, configFile = _ref.configFile, sequelize = _ref.sequelize;
                message = _ref2.message;
                doc.useServiceAccountAuth(configFile.requestcat.google);
                _context.next = 6;
                return doc.loadInfo();

              case 6:
                _context.next = 8;
                return getAllRows();

              case 8:
                rows = _context.sent;
                runId(rows);

              case 10:
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
        var sequelize, configFile, msg, filterFn, requests, donators, hold;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sequelize = _ref3.sequelize, configFile = _ref3.configFile;
                msg = _ref4.message;
                doc.useServiceAccountAuth(configFile.requestcat.google);
                _context2.next = 5;
                return doc.loadInfo();

              case 5:
                filterFn = function filterFn(r) {
                  return r['User ID'] === msg.author.id;
                };

                _context2.next = 8;
                return getRows('requests');

              case 8:
                requests = _context2.sent.filter(filterFn).length;
                _context2.next = 11;
                return getRows('donators');

              case 11:
                donators = _context2.sent.filter(filterFn).length;
                _context2.next = 14;
                return getRows('hold');

              case 14:
                hold = _context2.sent.filter(filterFn).length;
                msg.reply("Pending: ".concat(requests + donators, "\nOn Hold: ").concat(hold));

              case 16:
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
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var param, configFile, sequelize, msg, donator, owner, talkChannel, rows, reqs, request, urls, url, info;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                param = _ref5.param, configFile = _ref5.configFile, sequelize = _ref5.sequelize;
                msg = _ref6.message;

                if (param[1]) {
                  _context4.next = 4;
                  break;
                }

                return _context4.abrupt("return", msg.channel.send('Please provide a url or name'));

              case 4:
                doc.useServiceAccountAuth(configFile.requestcat.google);
                _context4.next = 7;
                return doc.loadInfo();

              case 7:
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
                  _context4.next = 20;
                  break;
                }

                _context4.next = 13;
                return getRows('requests');

              case 13:
                rows = _context4.sent;
                reqs = rows.filter(function (e) {
                  return e['User ID'] === msg.author.id;
                });

                if (!(reqs.length > 0)) {
                  _context4.next = 17;
                  break;
                }

                return _context4.abrupt("return", talkChannel.send("The request '".concat(reqs[0].Request, " ").concat(reqs[0].Link ? "(".concat(reqs[0].Link, ")") : '', "' is still on place. Wait until its fulfilled or rejected.")));

              case 17:
                if (!(getPage('requests').rowCount >= configFile.requestcat.count)) {
                  _context4.next = 20;
                  break;
                }

                checkPerms(msg, configFile);
                return _context4.abrupt("return", msg.channel.send('There are too many open requests right now. Wait until slots are opened.'));

              case 20:
                request = param.slice(1).join(' ');
                urls = Array.from(getUrls(request, {
                  normalizeProtocol: false,
                  stripWWW: false,
                  removeTrailingSlash: false,
                  sortQueryParameters: false
                }));

                if (!(urls.length > 1)) {
                  _context4.next = 24;
                  break;
                }

                return _context4.abrupt("return", msg.channel.send('You can only specify one url per request.'));

              case 24:
                url = urls[0];

                if (urls.length > 0) {
                  // const row = await sequelize.models.vgmdb.findByPk(url)
                  // if (row) return talkChannel.send(`This soundtrack has already been requested (${url})`)
                  request = request.replace(url, '');
                }

                _context4.next = 28;
                return getMaxId(doc);

              case 28:
                _context4.t0 = _context4.sent;
                _context4.t1 = _context4.t0 + 1;
                _context4.t2 = request.trim();
                _context4.t3 = url;
                _context4.t4 = msg.author.id;
                _context4.t5 = donator;
                info = {
                  id: _context4.t1,
                  request: _context4.t2,
                  url: _context4.t3,
                  user: _context4.t4,
                  donator: _context4.t5
                };
                if (url && url.includes('vgmdb.net')) info.vgmdb = url;
                sendEmbed(msg, sequelize, info).then( /*#__PURE__*/function () {
                  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(m) {
                    var page;
                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            msg.channel.send('Request submitted.');
                            page = donator ? getPage('donators') : getPage('requests');
                            _context3.next = 4;
                            return page.addRow([info.id, info.request, msg.author.tag, info.user, info.url, m.id]);

                          case 4:
                            checkPerms(msg, configFile);

                          case 5:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x5) {
                    return _ref7.apply(this, arguments);
                  };
                }())["catch"](function (err) {
                  return catchErr(msg, err);
                });

              case 37:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
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
    execute: function execute(_ref8, _ref9) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var client, param, sequelize, configFile, msg, req, reason, messageId, m, talkChannel;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                client = _ref8.client, param = _ref8.param, sequelize = _ref8.sequelize, configFile = _ref8.configFile;
                msg = _ref9.message;

                if (param[2]) {
                  _context5.next = 4;
                  break;
                }

                return _context5.abrupt("return", msg.channel.send('Incomplete command.'));

              case 4:
                doc.useServiceAccountAuth(configFile.requestcat.google);
                _context5.next = 7;
                return doc.loadInfo();

              case 7:
                _context5.next = 9;
                return getId(param[1]);

              case 9:
                req = _context5.sent;

                if (req) {
                  _context5.next = 12;
                  break;
                }

                return _context5.abrupt("return", msg.channel.send('Request not found.'));

              case 12:
                reason = param.slice(2).join(' ');
                /* sequelize.models.request.create({ user: req.User, request: req.Request, valid: false })
                if (req.Link && req.Link.includes('vgmdb.net')) {
                  sequelize.models.vgmdb.destroy({ where: { url: req.Link } })
                } */

                messageId = req.Message;
                _context5.next = 16;
                return req["delete"]();

              case 16:
                _context5.next = 18;
                return msg.guild.channels.cache.find(function (c) {
                  return c.name === 'open-requests';
                }).messages.fetch(messageId);

              case 18:
                m = _context5.sent;
                _context5.next = 21;
                return m["delete"]();

              case 21:
                msg.guild.channels.cache.find(function (c) {
                  return c.name === 'requests-log';
                }).send("Request: ".concat(req.Request, "\nBy: <@").concat(req.User, ">\nState: Rejected by ").concat(msg.author, "\nReason: ").concat(reason));
                talkChannel = msg.guild.channels.cache.find(function (c) {
                  return c.name === 'requests-talk';
                });
                talkChannel.send("The request ".concat(req.Request, " from <@").concat(req.User, "> has been rejected.\nReason: ").concat(reason));

              case 24:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
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
    get(info.vgmdb.replace('vgmdb.net', 'vgmdb.info')).then(function (_ref10) {
      var data = _ref10.data;
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

function sendEmbed(_x6, _x7, _x8, _x9) {
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
  _sendEmbed = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(msg, sequelize, info, row) {
    var _info$id;

    var embed, sent;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return handleOldMessage(msg, info.oldMessage);

          case 2:
            if (!info.vgmdb) {
              _context10.next = 6;
              break;
            }

            _context10.next = 5;
            return handleVGMDB(info, sequelize);

          case 5:
            info = _context10.sent;

          case 6:
            embed = {
              fields: [{
                name: 'Request',
                value: "".concat(info.request).concat(info.url ? " (".concat(info.url, ")") : '').concat(info.hold ? ' **(ON HOLD)**' : '')
              }, {
                name: 'Requested by',
                value: "<@".concat(info.user, "> / ").concat(info.user),
                inline: true
              }, {
                name: 'ID',
                value: ((_info$id = info.id) === null || _info$id === void 0 ? void 0 : _info$id.toString()) || 'NOT FOUND',
                inline: true
              }],
              color: info.donator ? 0xedcd40 : info.hold ? 0xc20404 : 0x42bfed,
              image: info.image
            };
            _context10.next = 9;
            return msg.guild.channels.cache.find(function (c) {
              return c.name === 'open-requests';
            }).send({
              embeds: [embed]
            });

          case 9:
            sent = _context10.sent;

            if (!row) {
              _context10.next = 14;
              break;
            }

            row.Message = sent.id;
            _context10.next = 14;
            return row.save();

          case 14:
            return _context10.abrupt("return", sent);

          case 15:
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