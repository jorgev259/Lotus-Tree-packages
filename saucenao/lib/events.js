"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _saucenao = _interopRequireDefault(require("saucenao"));
var _getUrls = _interopRequireDefault(require("get-urls"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var mySauce;
function handleFetch(msg, url, score) {
  mySauce(url).then(function (response) {
    var json = response.json;
    var _json$results = json.results,
      results = _json$results === void 0 ? [] : _json$results;
    var finalResults = results.filter(function (e) {
      return parseFloat(e.header.similarity) >= score && (e.data.pixiv_id || e.data.ext_urls);
    }).sort(function (a, b) {
      return a - b;
    });
    if (finalResults.length) {
      msg.channel.send("Found source: ".concat(finalResults.map(function (e) {
        return e.data.pixiv_id ? "<https://www.pixiv.net/en/artworks/".concat(e.data.pixiv_id, ">") : e.data.ext_urls.map(function (url) {
          return "<".concat(url, ">");
        }).join(' - ');
      }).join(' - ')));
    }
  }, function (error) {
    console.error('Request encountered an error');
    console.dir(error.request || error);
  });
}
var _default = exports["default"] = {
  guildCreate: function guildCreate(_ref, guild) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var sequelize, config;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            sequelize = _ref.sequelize, config = _ref.config;
            config[guild.id].saucenao = new Set();
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  ready: function ready(_ref2) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var sequelize, config, client, guilds;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            sequelize = _ref2.sequelize, config = _ref2.config, client = _ref2.client;
            _context2.next = 3;
            return client.guilds.fetch();
          case 3:
            guilds = _context2.sent;
            guilds.forEach(function (guild) {
              if (!config[guild.id]) config[guild.id] = {
                saucenao: new Set()
              };else if (!config[guild.id].saucenao) config[guild.id].saucenao = new Set();
            });
            sequelize.models.saucenao.findAll().then(function (rows) {
              rows.forEach(function (_ref3) {
                var guild = _ref3.guild,
                  channel = _ref3.channel;
                if (!config[guild]) config[guild] = {
                  saucenao: new Set()
                };else if (!config[guild].saucenao) config[guild].saucenao = new Set();
                config[guild].saucenao.add(channel);
              });
            });
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  messageCreate: function messageCreate(_ref4, message) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var config, client, configFile, saucescore, urls, _iterator, _step, url;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            config = _ref4.config, client = _ref4.client, configFile = _ref4.configFile;
            if (!mySauce) mySauce = new _saucenao["default"](configFile.saucenao);
            if (!(!config[message.guild.id].saucenao.has(message.channel.id) || message.author.bot)) {
              _context3.next = 4;
              break;
            }
            return _context3.abrupt("return");
          case 4:
            saucescore = parseInt(config[message.guild.id].saucescore);
            if (message.attachments.size > 0) message.attachments.forEach(function (attach) {
              return handleFetch(message, attach.url, saucescore);
            });
            urls = (0, _getUrls["default"])(message.content);
            if (urls.size > 0) {
              _iterator = _createForOfIteratorHelper(urls);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  url = _step.value;
                  handleFetch(message, url, saucescore);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }
          case 8:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  }
};