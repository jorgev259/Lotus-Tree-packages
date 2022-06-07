"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _axios = require("axios");

// const moment = require('moment')
module.exports = {
  refresh: {
    desc: 'Reposts all open requests.',
    usage: 'refresh',
    execute: function execute(_ref, _ref2) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var client, configFile, socdb, message, requests, request;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                client = _ref.client, configFile = _ref.configFile, socdb = _ref.socdb;
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
      /* doc.useServiceAccountAuth(configFile.requestcat.google)
      await doc.loadInfo()
       const filterFn = r => r['User ID'] === msg.author.id
      const requests = (await getRows('requests')).filter(filterFn).length
      const donators = (await getRows('donators')).filter(filterFn).length
      const hold = (await getRows('hold')).filter(filterFn).length
       msg.reply(`Pending: ${requests + donators}\nOn Hold: ${hold}`) */

      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var sequelize, configFile, msg;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sequelize = _ref3.sequelize, configFile = _ref3.configFile;
                msg = _ref4.message;

              case 2:
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
      /* if (!param[1]) return msg.channel.send('Please provide a url or name')
       doc.useServiceAccountAuth(configFile.requestcat.google)
      await doc.loadInfo()
       console.log(123)
       const donator = msg.member.roles.cache.some(r => r.name === 'Donators')
      const owner = msg.member.roles.cache.some(r => r.name === 'Owner')
       const talkChannel = msg.guild.channels.cache.find(c => c.name === 'requests-talk')
      if (!(donator || owner)) {
        const rows = await getRows('requests')
        const reqs = rows.filter(e => e['User ID'] === msg.author.id)
         if (reqs.length > 0) return talkChannel.send(`The request '${reqs[0].Request} ${reqs[0].Link ? `(${reqs[0].Link})` : ''}' is still on place. Wait until its fulfilled or rejected.`)
        if (getPage('requests').rowCount >= configFile.requestcat.count) {
          checkPerms(msg, configFile)
          return msg.channel.send('There are too many open requests right now. Wait until slots are opened.')
        }
      }
      let request = param.slice(1).join(' ')
       const urls = Array.from(getUrls(request, { normalizeProtocol: false, stripWWW: false, removeTrailingSlash: false, sortQueryParameters: false }))
      if (urls.length > 1) return msg.channel.send('You can only specify one url per request.')
       const url = urls[0]
       if (urls.length > 0) {
        // const row = await sequelize.models.vgmdb.findByPk(url)
        // if (row) return talkChannel.send(`This soundtrack has already been requested (${url})`)
         request = request.replace(url, '')
      }
       const info = { id: await getMaxId(doc) + 1, request: request.trim(), url, user: msg.author.id, donator }
       if (url && url.includes('vgmdb.net')) info.vgmdb = url
       sendEmbed(msg, sequelize, info)
        .then(async m => {
          msg.channel.send('Request submitted.')
           const page = donator ? getPage('donators') : getPage('requests')
          await page.addRow([info.id, info.request, msg.author.tag, info.user, info.url, m.id])
           checkPerms(msg, configFile)
        })
        .catch(err => catchErr(msg, err))
         */

      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var param, configFile, sequelize, msg;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                param = _ref5.param, configFile = _ref5.configFile, sequelize = _ref5.sequelize;
                msg = _ref6.message;

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
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
    execute: function execute(_ref7, _ref8) {
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

      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var client, param, sequelize, configFile, msg;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                client = _ref7.client, param = _ref7.param, sequelize = _ref7.sequelize, configFile = _ref7.configFile;
                msg = _ref8.message;

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
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
    (0, _axios.get)(info.vgmdb.replace('vgmdb.net', 'vgmdb.info')).then(function (_ref9) {
      var data = _ref9.data;
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

function getVGMDB(_x) {
  return _getVGMDB.apply(this, arguments);
}

function _getVGMDB() {
  _getVGMDB = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(link) {
    var url, id, response;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            url = new URL(link);
            id = url.pathname.split('/').slice(-1);
            _context5.prev = 2;
            _context5.next = 5;
            return (0, _axios.get)("https://api.nemoralni.site/albums/".concat(id), {
              headers: {
                'x-api-key': 'i-m-a-pig-i-don-t-fight-for-honor-i-fight-for-a-paycheck'
              }
            });

          case 5:
            response = _context5.sent;
            return _context5.abrupt("return", response.data);

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](2);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 9]]);
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
  _getCover = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(link) {
    var data, cover;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getVGMDB(link);

          case 2:
            data = _context6.sent;

            if (data) {
              _context6.next = 5;
              break;
            }

            return _context6.abrupt("return");

          case 5:
            cover = data.album_cover;

            if (!isValidUrl(cover)) {
              _context6.next = 8;
              break;
            }

            return _context6.abrupt("return", {
              url: cover
            });

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getCover.apply(this, arguments);
}

function sendEmbed(_x3, _x4) {
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
  _sendEmbed = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(msg, request) {
    var _request$link;

    var image, isHold, embed, sent;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            isHold = request.state === 'hold';

            if (!((_request$link = request.link) !== null && _request$link !== void 0 && _request$link.includes('vgmdb.net'))) {
              _context7.next = 5;
              break;
            }

            _context7.next = 4;
            return getCover(request.link);

          case 4:
            image = _context7.sent;

          case 5:
            embed = {
              fields: [{
                name: 'Request',
                value: "".concat(request.title).concat(request.url ? " (".concat(request.url, ")") : '').concat(isHold ? ' **(ON HOLD)**' : '')
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
            _context7.next = 8;
            return msg.guild.channels.cache.find(function (c) {
              return c.name === 'open-requests';
            }).send({
              embeds: [embed]
            });

          case 8:
            sent = _context7.sent;
            request.message = sent.id;
            _context7.next = 12;
            return request.save();

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _sendEmbed.apply(this, arguments);
}

function catchErr(msg, err) {
  console.log(err);
  msg.channel.send('Something went wrong.');
}