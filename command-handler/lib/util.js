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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcmRlckNhdGVnb3J5Iiwib3JkZXJUeXBlIiwicGVybVNvcnQiLCJyb3dzIiwic29ydCIsImEiLCJiIiwiaW5kZXhPZiIsImNhdGVnb3J5IiwidHlwZSIsImNyZWF0ZWRBdCIsInBlcm1HZXQiLCJzZXF1ZWxpemUiLCJvcHRpb25zIiwibW9kZWxzIiwicGVybSIsImZpbmRBbGwiLCJtb2R1bGUiLCJleHBvcnRzIiwicGVybUNoZWNrIiwiY29tbWFuZCIsIm1lc3NhZ2UiLCJjb25maWdGaWxlIiwib3ZlcnJpZGVzIiwib3duZXJPbmx5Iiwib3duZXJJZHMiLCJpbmNsdWRlcyIsImF1dGhvciIsImlkIiwibWVtYmVyIiwicGVybWlzc2lvbnMiLCJoYXMiLCJ3aGVyZSIsIm5hbWUiLCJndWlsZCIsImxlbmd0aCIsInVzZXIiLCJyb2xlIiwiY2hhbm5lbCIsInJvdyIsIm1hdGNoIiwicm9sZXMiLCJjYWNoZSIsImZpbmQiLCJyIl0sInNvdXJjZXMiOlsiLi4vc3JjL3V0aWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgb3JkZXJDYXRlZ29yeSA9IFsndXNlcicsICdyb2xlJywgJ2NoYW5uZWwnXVxuY29uc3Qgb3JkZXJUeXBlID0gWydkZW55JywgJ2FsbG93J11cblxuY29uc3QgcGVybVNvcnQgPSByb3dzID0+IHJvd3Muc29ydCgoYSwgYikgPT5cbiAgb3JkZXJDYXRlZ29yeS5pbmRleE9mKGEuY2F0ZWdvcnkpIC0gb3JkZXJDYXRlZ29yeS5pbmRleE9mKGIuY2F0ZWdvcnkpIHx8XG4gICAgb3JkZXJUeXBlLmluZGV4T2YoYS50eXBlKSAtIG9yZGVyVHlwZS5pbmRleE9mKGIudHlwZSkgfHxcbiAgICBhLmNyZWF0ZWRBdCA+IGIuY3JlYXRlZEF0XG4pXG5cbmNvbnN0IHBlcm1HZXQgPSAoc2VxdWVsaXplLCBvcHRpb25zKSA9PiBzZXF1ZWxpemUubW9kZWxzLnBlcm0uZmluZEFsbChvcHRpb25zKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGVybVNvcnQsXG4gIHBlcm1HZXQsXG4gIGFzeW5jIHBlcm1DaGVjayAoY29tbWFuZCwgbWVzc2FnZSwgeyBjb25maWdGaWxlLCBzZXF1ZWxpemUgfSwgb3ZlcnJpZGVzID0ge30pIHtcbiAgICBpZiAoY29tbWFuZC5vd25lck9ubHkpIHJldHVybiBjb25maWdGaWxlLm93bmVySWRzLmluY2x1ZGVzKG1lc3NhZ2UuYXV0aG9yLmlkKVxuICAgIGlmIChtZXNzYWdlLm1lbWJlci5wZXJtaXNzaW9ucy5oYXMoJ0FETUlOSVNUUkFUT1InKSkgcmV0dXJuIHRydWVcblxuICAgIGNvbnN0IHJvd3MgPSBwZXJtU29ydChhd2FpdCBwZXJtR2V0KHNlcXVlbGl6ZSwgeyB3aGVyZTogeyBjb21tYW5kOiBjb21tYW5kLm5hbWUsIGd1aWxkOiBtZXNzYWdlLmd1aWxkLmlkIH0gfSkpXG4gICAgaWYgKHJvd3MubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZVxuXG4gICAgY29uc3QgeyB1c2VyID0gZmFsc2UsIHJvbGUgPSBmYWxzZSwgY2hhbm5lbCA9IGZhbHNlIH0gPSBvdmVycmlkZXNcbiAgICBmb3IgKGNvbnN0IHJvdyBvZiByb3dzKSB7XG4gICAgICBjb25zdCB7IHR5cGUsIGNhdGVnb3J5LCBuYW1lIH0gPSByb3dcbiAgICAgIGNvbnN0IG1hdGNoID1cbiAgICAgICAgICAgIChjYXRlZ29yeSA9PT0gJ3VzZXInICYmIChtZXNzYWdlLmF1dGhvci5pZCA9PT0gbmFtZSB8fCB1c2VyKSkgfHxcbiAgICAgICAgICAgIChjYXRlZ29yeSA9PT0gJ3JvbGUnICYmIChtZXNzYWdlLm1lbWJlci5yb2xlcy5jYWNoZS5maW5kKHIgPT4gci5uYW1lID09PSBuYW1lKSB8fCByb2xlKSkgfHxcbiAgICAgICAgICAgIChjYXRlZ29yeSA9PT0gJ2NoYW5uZWwnICYmIChtZXNzYWdlLmNoYW5uZWwubmFtZSA9PT0gbmFtZSB8fCBjaGFubmVsKSlcblxuICAgICAgaWYgKG1hdGNoKSByZXR1cm4gdHlwZSA9PT0gJ2FsbG93J1xuICAgIH1cblxu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