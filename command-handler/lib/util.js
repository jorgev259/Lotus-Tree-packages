"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var orderCategory = ['user', 'role', 'channel'];
var orderType = ['deny', 'allow'];

var permSort = function permSort(rows) {
  return rows.sort(function (a, b) {
    return orderCategory.indexOf(a.category) - orderCategory.indexOf(b.category) || orderType.indexOf(a.type) - orderType.indexOf(b.type) || a.createdAt > b.createdAt;
  });
};

var permGet = function permGet(sequelize, options) {
  return sequelize.models.perm.findAll(options);
};

module.exports = {
  permSort: permSort,
  permGet: permGet,
  permCheck: function permCheck(command, message, _ref) {
    var _arguments = arguments;
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var configFile, sequelize, overrides, rows, _overrides$user, user, _overrides$role, role, _overrides$channel, channel, _iterator, _step, _loop, _ret;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              configFile = _ref.configFile, sequelize = _ref.sequelize;
              overrides = _arguments.length > 3 && _arguments[3] !== undefined ? _arguments[3] : {};

              if (!command.ownerOnly) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", configFile.ownerIds.includes(message.author.id));

            case 4:
              if (!message.member.permissions.has('ADMINISTRATOR')) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", true);

            case 6:
              _context.t0 = permSort;
              _context.next = 9;
              return permGet(sequelize, {
                where: {
                  command: command.name,
                  guild: message.guild.id
                }
              });

            case 9:
              _context.t1 = _context.sent;
              rows = (0, _context.t0)(_context.t1);

              if (!(rows.length === 0)) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", true);

            case 13:
              _overrides$user = overrides.user, user = _overrides$user === void 0 ? false : _overrides$user, _overrides$role = overrides.role, role = _overrides$role === void 0 ? false : _overrides$role, _overrides$channel = overrides.channel, channel = _overrides$channel === void 0 ? false : _overrides$channel;
              _iterator = _createForOfIteratorHelper(rows);
              _context.prev = 15;

              _loop = function _loop() {
                var row = _step.value;
                var type = row.type,
                    category = row.category,
                    name = row.name;
                var match = category === 'user' && (message.author.id === name || user) || category === 'role' && (message.member.roles.cache.find(function (r) {
                  return r.name === name;
                }) || role) || category === 'channel' && (message.channel.name === name || channel);
                if (match) return {
                  v: type === 'allow'
                };
              };

              _iterator.s();

            case 18:
              if ((_step = _iterator.n()).done) {
                _context.next = 24;
                break;
              }

              _ret = _loop();

              if (!((0, _typeof2["default"])(_ret) === "object")) {
                _context.next = 22;
                break;
              }

              return _context.abrupt("return", _ret.v);

            case 22:
              _context.next = 18;
              break;

            case 24:
              _context.next = 29;
              break;

            case 26:
              _context.prev = 26;
              _context.t2 = _context["catch"](15);

              _iterator.e(_context.t2);

            case 29:
              _context.prev = 29;

              _iterator.f();

              return _context.finish(29);

            case 32:
              return _context.abrupt("return", false);

            case 33:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[15, 26, 29, 32]]);
    }))();
  }
};