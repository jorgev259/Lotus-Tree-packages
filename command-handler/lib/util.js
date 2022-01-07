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
                }) || role) || category === 'channel' && (message.channel.id === name || channel);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbIm9yZGVyQ2F0ZWdvcnkiLCJvcmRlclR5cGUiLCJwZXJtU29ydCIsInJvd3MiLCJzb3J0IiwiYSIsImIiLCJpbmRleE9mIiwiY2F0ZWdvcnkiLCJ0eXBlIiwiY3JlYXRlZEF0IiwicGVybUdldCIsInNlcXVlbGl6ZSIsIm9wdGlvbnMiLCJtb2RlbHMiLCJwZXJtIiwiZmluZEFsbCIsIm1vZHVsZSIsImV4cG9ydHMiLCJwZXJtQ2hlY2siLCJjb21tYW5kIiwibWVzc2FnZSIsImNvbmZpZ0ZpbGUiLCJvdmVycmlkZXMiLCJvd25lck9ubHkiLCJvd25lcklkcyIsImluY2x1ZGVzIiwiYXV0aG9yIiwiaWQiLCJtZW1iZXIiLCJwZXJtaXNzaW9ucyIsImhhcyIsIndoZXJlIiwibmFtZSIsImd1aWxkIiwibGVuZ3RoIiwidXNlciIsInJvbGUiLCJjaGFubmVsIiwicm93IiwibWF0Y2giLCJyb2xlcyIsImNhY2hlIiwiZmluZCIsInIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxhQUFhLEdBQUcsQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixTQUFqQixDQUF0QjtBQUNBLElBQU1DLFNBQVMsR0FBRyxDQUFDLE1BQUQsRUFBUyxPQUFULENBQWxCOztBQUVBLElBQU1DLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUFDLElBQUk7QUFBQSxTQUFJQSxJQUFJLENBQUNDLElBQUwsQ0FBVSxVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxXQUNqQ04sYUFBYSxDQUFDTyxPQUFkLENBQXNCRixDQUFDLENBQUNHLFFBQXhCLElBQW9DUixhQUFhLENBQUNPLE9BQWQsQ0FBc0JELENBQUMsQ0FBQ0UsUUFBeEIsQ0FBcEMsSUFDRVAsU0FBUyxDQUFDTSxPQUFWLENBQWtCRixDQUFDLENBQUNJLElBQXBCLElBQTRCUixTQUFTLENBQUNNLE9BQVYsQ0FBa0JELENBQUMsQ0FBQ0csSUFBcEIsQ0FEOUIsSUFF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O0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQSwrQ0FrQnJFLEtBbEJxRTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQW1CN0U7QUF0QmMsQ0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBvcmRlckNhdGVnb3J5ID0gWyd1c2VyJywgJ3JvbGUnLCAnY2hhbm5lbCddXHJcbmNvbnN0IG9yZGVyVHlwZSA9IFsnZGVueScsICdhbGxvdyddXHJcblxyXG5jb25zdCBwZXJtU29ydCA9IHJvd3MgPT4gcm93cy5zb3J0KChhLCBiKSA9PlxyXG4gIG9yZGVyQ2F0ZWdvcnkuaW5kZXhPZihhLmNhdGVnb3J5KSAtIG9yZGVyQ2F0ZWdvcnkuaW5kZXhPZihiLmNhdGVnb3J5KSB8fFxyXG4gICAgb3JkZXJUeXBlLmluZGV4T2YoYS50eXBlKSAtIG9yZGVyVHlwZS5pbmRleE9mKGIudHlwZSkgfHxcclxuICAgIGEuY3JlYXRlZEF0ID4gYi5jcmVhdGVkQXRcclxuKVxyXG5cclxuY29uc3QgcGVybUdldCA9IChzZXF1ZWxpemUsIG9wdGlvbnMpID0+IHNlcXVlbGl6ZS5tb2RlbHMucGVybS5maW5kQWxsKG9wdGlvbnMpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBwZXJtU29ydCxcclxuICBwZXJtR2V0LFxyXG4gIGFzeW5jIHBlcm1DaGVjayAoY29tbWFuZCwgbWVzc2FnZSwgeyBjb25maWdGaWxlLCBzZXF1ZWxpemUgfSwgb3ZlcnJpZGVzID0ge30pIHtcclxuICAgIGlmIChjb21tYW5kLm93bmVyT25seSkgcmV0dXJuIGNvbmZpZ0ZpbGUub3duZXJJZHMuaW5jbHVkZXMobWVzc2FnZS5hdXRob3IuaWQpXHJcbiAgICBpZiAobWVzc2FnZS5tZW1iZXIucGVybWlzc2lvbnMuaGFzKCdBRE1JTklTVFJBVE9SJykpIHJldHVybiB0cnVlXHJcblxyXG4gICAgY29uc3Qgcm93cyA9IHBlcm1Tb3J0KGF3YWl0IHBlcm1HZXQoc2VxdWVsaXplLCB7IHdoZXJlOiB7IGNvbW1hbmQ6IGNvbW1hbmQubmFtZSwgZ3VpbGQ6IG1lc3NhZ2UuZ3VpbGQuaWQgfSB9KSlcclxuICAgIGlmIChyb3dzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWVcclxuXHJcbiAgICBjb25zdCB7IHVzZXIgPSBmYWxzZSwgcm9sZSA9IGZhbHNlLCBjaGFubmVsID0gZmFsc2UgfSA9IG92ZXJyaWRlc1xyXG4gICAgZm9yIChjb25zdCByb3cgb2Ygcm93cykge1xyXG4gICAgICBjb25zdCB7IHR5cGUsIGNhdGVnb3J5LCBuYW1lIH0gPSByb3dcclxuICAgICAgY29uc3QgbWF0Y2ggPVxyXG4gICAgICAgICAgICAoY2F0ZWdvcnkgPT09ICd1c2VyJyAmJiAobWVzc2FnZS5hdXRob3IuaWQgPT09IG5hbWUgfHwgdXNlcikpIHx8XHJcbiAgICAgICAgICAgIChjYXRlZ29yeSA9PT0gJ3JvbGUnICYmIChtZXNzYWdlLm1lbWJlci5yb2xlcy5jYWNoZS5maW5kKHIgPT4gci5uYW1lID09PSBuYW1lKSB8fCByb2xlKSkgfHxcclxuICAgICAgICAgICAgKGNhdGVnb3J5ID09PSAnY2hhbm5lbCcgJiYgKG1lc3NhZ2UuY2hhbm5lbC5pZCA9PT0gbmFtZSB8fCBjaGFubmVsKSlcclxuXHJcbiAgICAgIGlmIChtYXRjaCkgcmV0dXJuIHR5cGUgPT09ICdhbGxvdydcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbn1cclxuIl19