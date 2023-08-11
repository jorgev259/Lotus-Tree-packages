"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
      return _regenerator["default"].wrap(function _callee$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            configFile = _ref.configFile, sequelize = _ref.sequelize;
            overrides = _arguments.length > 3 && _arguments[3] !== undefined ? _arguments[3] : {};
            if (!command.ownerOnly) {
              _context2.next = 4;
              break;
            }
            return _context2.abrupt("return", configFile.ownerIds.includes(message.author.id));
          case 4:
            if (!message.member.permissions.has('ADMINISTRATOR')) {
              _context2.next = 6;
              break;
            }
            return _context2.abrupt("return", true);
          case 6:
            _context2.t0 = permSort;
            _context2.next = 9;
            return permGet(sequelize, {
              where: {
                command: command.name,
                guild: message.guild.id
              }
            });
          case 9:
            _context2.t1 = _context2.sent;
            rows = (0, _context2.t0)(_context2.t1);
            if (!(rows.length === 0)) {
              _context2.next = 13;
              break;
            }
            return _context2.abrupt("return", true);
          case 13:
            _overrides$user = overrides.user, user = _overrides$user === void 0 ? false : _overrides$user, _overrides$role = overrides.role, role = _overrides$role === void 0 ? false : _overrides$role, _overrides$channel = overrides.channel, channel = _overrides$channel === void 0 ? false : _overrides$channel;
            _iterator = _createForOfIteratorHelper(rows);
            _context2.prev = 15;
            _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
              var row, type, category, name, match;
              return _regenerator["default"].wrap(function _loop$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    row = _step.value;
                    type = row.type, category = row.category, name = row.name;
                    match = category === 'user' && (message.author.id === name || user) || category === 'role' && (message.member.roles.cache.find(function (r) {
                      return r.name === name;
                    }) || role) || category === 'channel' && (message.channel.name === name || channel);
                    if (!match) {
                      _context.next = 5;
                      break;
                    }
                    return _context.abrupt("return", {
                      v: type === 'allow'
                    });
                  case 5:
                  case "end":
                    return _context.stop();
                }
              }, _loop);
            });
            _iterator.s();
          case 18:
            if ((_step = _iterator.n()).done) {
              _context2.next = 25;
              break;
            }
            return _context2.delegateYield(_loop(), "t2", 20);
          case 20:
            _ret = _context2.t2;
            if (!_ret) {
              _context2.next = 23;
              break;
            }
            return _context2.abrupt("return", _ret.v);
          case 23:
            _context2.next = 18;
            break;
          case 25:
            _context2.next = 30;
            break;
          case 27:
            _context2.prev = 27;
            _context2.t3 = _context2["catch"](15);
            _iterator.e(_context2.t3);
          case 30:
            _context2.prev = 30;
            _iterator.f();
            return _context2.finish(30);
          case 33:
            return _context2.abrupt("return", false);
          case 34:
          case "end":
            return _context2.stop();
        }
      }, _callee, null, [[15, 27, 30, 33]]);
    }))();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcmRlckNhdGVnb3J5Iiwib3JkZXJUeXBlIiwicGVybVNvcnQiLCJyb3dzIiwic29ydCIsImEiLCJiIiwiaW5kZXhPZiIsImNhdGVnb3J5IiwidHlwZSIsImNyZWF0ZWRBdCIsInBlcm1HZXQiLCJzZXF1ZWxpemUiLCJvcHRpb25zIiwibW9kZWxzIiwicGVybSIsImZpbmRBbGwiLCJtb2R1bGUiLCJleHBvcnRzIiwicGVybUNoZWNrIiwiY29tbWFuZCIsIm1lc3NhZ2UiLCJfcmVmIiwiX2FyZ3VtZW50cyIsImFyZ3VtZW50cyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiY29uZmlnRmlsZSIsIm92ZXJyaWRlcyIsIl9vdmVycmlkZXMkdXNlciIsInVzZXIiLCJfb3ZlcnJpZGVzJHJvbGUiLCJyb2xlIiwiX292ZXJyaWRlcyRjaGFubmVsIiwiY2hhbm5lbCIsIl9pdGVyYXRvciIsIl9zdGVwIiwiX2xvb3AiLCJfcmV0Iiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQyIiwicHJldiIsIm5leHQiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJvd25lck9ubHkiLCJhYnJ1cHQiLCJvd25lcklkcyIsImluY2x1ZGVzIiwiYXV0aG9yIiwiaWQiLCJtZW1iZXIiLCJwZXJtaXNzaW9ucyIsImhhcyIsInQwIiwid2hlcmUiLCJuYW1lIiwiZ3VpbGQiLCJ0MSIsInNlbnQiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsInJvdyIsIm1hdGNoIiwiX2xvb3AkIiwiX2NvbnRleHQiLCJ2YWx1ZSIsInJvbGVzIiwiY2FjaGUiLCJmaW5kIiwiciIsInYiLCJzdG9wIiwicyIsIm4iLCJkb25lIiwiZGVsZWdhdGVZaWVsZCIsInQyIiwidDMiLCJlIiwiZiIsImZpbmlzaCJdLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG9yZGVyQ2F0ZWdvcnkgPSBbJ3VzZXInLCAncm9sZScsICdjaGFubmVsJ11cbmNvbnN0IG9yZGVyVHlwZSA9IFsnZGVueScsICdhbGxvdyddXG5cbmNvbnN0IHBlcm1Tb3J0ID0gcm93cyA9PiByb3dzLnNvcnQoKGEsIGIpID0+XG4gIG9yZGVyQ2F0ZWdvcnkuaW5kZXhPZihhLmNhdGVnb3J5KSAtIG9yZGVyQ2F0ZWdvcnkuaW5kZXhPZihiLmNhdGVnb3J5KSB8fFxuICAgIG9yZGVyVHlwZS5pbmRleE9mKGEudHlwZSkgLSBvcmRlclR5cGUuaW5kZXhPZihiLnR5cGUpIHx8XG4gICAgYS5jcmVhdGVkQXQgPiBiLmNyZWF0ZWRBdFxuKVxuXG5jb25zdCBwZXJtR2V0ID0gKHNlcXVlbGl6ZSwgb3B0aW9ucykgPT4gc2VxdWVsaXplLm1vZGVscy5wZXJtLmZpbmRBbGwob3B0aW9ucylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHBlcm1Tb3J0LFxuICBwZXJtR2V0LFxuICBhc3luYyBwZXJtQ2hlY2sgKGNvbW1hbmQsIG1lc3NhZ2UsIHsgY29uZmlnRmlsZSwgc2VxdWVsaXplIH0sIG92ZXJyaWRlcyA9IHt9KSB7XG4gICAgaWYgKGNvbW1hbmQub3duZXJPbmx5KSByZXR1cm4gY29uZmlnRmlsZS5vd25lcklkcy5pbmNsdWRlcyhtZXNzYWdlLmF1dGhvci5pZClcbiAgICBpZiAobWVzc2FnZS5tZW1iZXIucGVybWlzc2lvbnMuaGFzKCdBRE1JTklTVFJBVE9SJykpIHJldHVybiB0cnVlXG5cbiAgICBjb25zdCByb3dzID0gcGVybVNvcnQoYXdhaXQgcGVybUdldChzZXF1ZWxpemUsIHsgd2hlcmU6IHsgY29tbWFuZDogY29tbWFuZC5uYW1lLCBndWlsZDogbWVzc2FnZS5ndWlsZC5pZCB9IH0pKVxuICAgIGlmIChyb3dzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWVcblxuICAgIGNvbnN0IHsgdXNlciA9IGZhbHNlLCByb2xlID0gZmFsc2UsIGNoYW5uZWwgPSBmYWxzZSB9ID0gb3ZlcnJpZGVzXG4gICAgZm9yIChjb25zdCByb3cgb2Ygcm93cykge1xuICAgICAgY29uc3QgeyB0eXBlLCBjYXRlZ29yeSwgbmFtZSB9ID0gcm93XG4gICAgICBjb25zdCBtYXRjaCA9XG4gICAgICAgICAgICAoY2F0ZWdvcnkgPT09ICd1c2VyJyAmJiAobWVzc2FnZS5hdXRob3IuaWQgPT09IG5hbWUgfHwgdXNlcikpIHx8XG4gICAgICAgICAgICAoY2F0ZWdvcnkgPT09ICdyb2xlJyAmJiAobWVzc2FnZS5tZW1iZXIucm9sZXMuY2FjaGUuZmluZChyID0+IHIubmFtZSA9PT0gbmFtZSkgfHwgcm9sZSkpIHx8XG4gICAgICAgICAgICAoY2F0ZWdvcnkgPT09ICdjaGFubmVsJyAmJiAobWVzc2FnZS5jaGFubmVsLm5hbWUgPT09IG5hbWUgfHwgY2hhbm5lbCkpXG5cbiAgICAgIGlmIChtYXRjaCkgcmV0dXJuIHR5cGUgPT09ICdhbGxvdydcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQU1BLGFBQWEsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDO0FBQ2pELElBQU1DLFNBQVMsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7QUFFbkMsSUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVFBLENBQUdDLElBQUk7RUFBQSxPQUFJQSxJQUFJLENBQUNDLElBQUksQ0FBQyxVQUFDQyxDQUFDLEVBQUVDLENBQUM7SUFBQSxPQUN0Q04sYUFBYSxDQUFDTyxPQUFPLENBQUNGLENBQUMsQ0FBQ0csUUFBUSxDQUFDLEdBQUdSLGFBQWEsQ0FBQ08sT0FBTyxDQUFDRCxDQUFDLENBQUNFLFFBQVEsQ0FBQyxJQUNuRVAsU0FBUyxDQUFDTSxPQUFPLENBQUNGLENBQUMsQ0FBQ0ksSUFBSSxDQUFDLEdBQUdSLFNBQVMsQ0FBQ00sT0FBTyxDQUFDRCxDQUFDLENBQUNHLElBQUksQ0FBQyxJQUNyREosQ0FBQyxDQUFDSyxTQUFTLEdBQUdKLENBQUMsQ0FBQ0ksU0FBUztFQUFBLENBQzdCLENBQUM7QUFBQTtBQUVELElBQU1DLE9BQU8sR0FBRyxTQUFWQSxPQUFPQSxDQUFJQyxTQUFTLEVBQUVDLE9BQU87RUFBQSxPQUFLRCxTQUFTLENBQUNFLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDQyxPQUFPLENBQUNILE9BQU8sQ0FBQztBQUFBO0FBRTlFSSxNQUFNLENBQUNDLE9BQU8sR0FBRztFQUNmaEIsUUFBUSxFQUFSQSxRQUFRO0VBQ1JTLE9BQU8sRUFBUEEsT0FBTztFQUNEUSxTQUFTLFdBQUFBLFVBQUVDLE9BQU8sRUFBRUMsT0FBTyxFQUFBQyxJQUFBLEVBQTZDO0lBQUEsSUFBQUMsVUFBQSxHQUFBQyxTQUFBO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBQyxRQUFBO01BQUEsSUFBQUMsVUFBQSxFQUFBakIsU0FBQSxFQUFBa0IsU0FBQSxFQUFBM0IsSUFBQSxFQUFBNEIsZUFBQSxFQUFBQyxJQUFBLEVBQUFDLGVBQUEsRUFBQUMsSUFBQSxFQUFBQyxrQkFBQSxFQUFBQyxPQUFBLEVBQUFDLFNBQUEsRUFBQUMsS0FBQSxFQUFBQyxLQUFBLEVBQUFDLElBQUE7TUFBQSxPQUFBZCxZQUFBLFlBQUFlLElBQUEsVUFBQUMsU0FBQUMsU0FBQTtRQUFBLGtCQUFBQSxTQUFBLENBQUFDLElBQUEsR0FBQUQsU0FBQSxDQUFBRSxJQUFBO1VBQUE7WUFBekNoQixVQUFVLEdBQUFQLElBQUEsQ0FBVk8sVUFBVSxFQUFFakIsU0FBUyxHQUFBVSxJQUFBLENBQVRWLFNBQVM7WUFBSWtCLFNBQVMsR0FBQVAsVUFBQSxDQUFBdUIsTUFBQSxRQUFBdkIsVUFBQSxRQUFBd0IsU0FBQSxHQUFBeEIsVUFBQSxNQUFHLENBQUMsQ0FBQztZQUFBLEtBQ3RFSCxPQUFPLENBQUM0QixTQUFTO2NBQUFMLFNBQUEsQ0FBQUUsSUFBQTtjQUFBO1lBQUE7WUFBQSxPQUFBRixTQUFBLENBQUFNLE1BQUEsV0FBU3BCLFVBQVUsQ0FBQ3FCLFFBQVEsQ0FBQ0MsUUFBUSxDQUFDOUIsT0FBTyxDQUFDK0IsTUFBTSxDQUFDQyxFQUFFLENBQUM7VUFBQTtZQUFBLEtBQ3pFaEMsT0FBTyxDQUFDaUMsTUFBTSxDQUFDQyxXQUFXLENBQUNDLEdBQUcsQ0FBQyxlQUFlLENBQUM7Y0FBQWIsU0FBQSxDQUFBRSxJQUFBO2NBQUE7WUFBQTtZQUFBLE9BQUFGLFNBQUEsQ0FBQU0sTUFBQSxXQUFTLElBQUk7VUFBQTtZQUFBTixTQUFBLENBQUFjLEVBQUEsR0FFbkR2RCxRQUFRO1lBQUF5QyxTQUFBLENBQUFFLElBQUE7WUFBQSxPQUFPbEMsT0FBTyxDQUFDQyxTQUFTLEVBQUU7Y0FBRThDLEtBQUssRUFBRTtnQkFBRXRDLE9BQU8sRUFBRUEsT0FBTyxDQUFDdUMsSUFBSTtnQkFBRUMsS0FBSyxFQUFFdkMsT0FBTyxDQUFDdUMsS0FBSyxDQUFDUDtjQUFHO1lBQUUsQ0FBQyxDQUFDO1VBQUE7WUFBQVYsU0FBQSxDQUFBa0IsRUFBQSxHQUFBbEIsU0FBQSxDQUFBbUIsSUFBQTtZQUF2RzNELElBQUksT0FBQXdDLFNBQUEsQ0FBQWMsRUFBQSxFQUFBZCxTQUFBLENBQUFrQixFQUFBO1lBQUEsTUFDTjFELElBQUksQ0FBQzJDLE1BQU0sS0FBSyxDQUFDO2NBQUFILFNBQUEsQ0FBQUUsSUFBQTtjQUFBO1lBQUE7WUFBQSxPQUFBRixTQUFBLENBQUFNLE1BQUEsV0FBUyxJQUFJO1VBQUE7WUFBQWxCLGVBQUEsR0FFc0JELFNBQVMsQ0FBekRFLElBQUksRUFBSkEsSUFBSSxHQUFBRCxlQUFBLGNBQUcsS0FBSyxHQUFBQSxlQUFBLEVBQUFFLGVBQUEsR0FBb0NILFNBQVMsQ0FBM0NJLElBQUksRUFBSkEsSUFBSSxHQUFBRCxlQUFBLGNBQUcsS0FBSyxHQUFBQSxlQUFBLEVBQUFFLGtCQUFBLEdBQXNCTCxTQUFTLENBQTdCTSxPQUFPLEVBQVBBLE9BQU8sR0FBQUQsa0JBQUEsY0FBRyxLQUFLLEdBQUFBLGtCQUFBO1lBQUFFLFNBQUEsR0FBQTBCLDBCQUFBLENBQ2pDNUQsSUFBSTtZQUFBd0MsU0FBQSxDQUFBQyxJQUFBO1lBQUFMLEtBQUEsZ0JBQUFiLFlBQUEsWUFBQUMsSUFBQSxVQUFBWSxNQUFBO2NBQUEsSUFBQXlCLEdBQUEsRUFBQXZELElBQUEsRUFBQUQsUUFBQSxFQUFBbUQsSUFBQSxFQUFBTSxLQUFBO2NBQUEsT0FBQXZDLFlBQUEsWUFBQWUsSUFBQSxVQUFBeUIsT0FBQUMsUUFBQTtnQkFBQSxrQkFBQUEsUUFBQSxDQUFBdkIsSUFBQSxHQUFBdUIsUUFBQSxDQUFBdEIsSUFBQTtrQkFBQTtvQkFBWG1CLEdBQUcsR0FBQTFCLEtBQUEsQ0FBQThCLEtBQUE7b0JBQ0ozRCxJQUFJLEdBQXFCdUQsR0FBRyxDQUE1QnZELElBQUksRUFBRUQsUUFBUSxHQUFXd0QsR0FBRyxDQUF0QnhELFFBQVEsRUFBRW1ELElBQUksR0FBS0ssR0FBRyxDQUFaTCxJQUFJO29CQUN0Qk0sS0FBSyxHQUNKekQsUUFBUSxLQUFLLE1BQU0sS0FBS2EsT0FBTyxDQUFDK0IsTUFBTSxDQUFDQyxFQUFFLEtBQUtNLElBQUksSUFBSTNCLElBQUksQ0FBQyxJQUMzRHhCLFFBQVEsS0FBSyxNQUFNLEtBQUthLE9BQU8sQ0FBQ2lDLE1BQU0sQ0FBQ2UsS0FBSyxDQUFDQyxLQUFLLENBQUNDLElBQUksQ0FBQyxVQUFBQyxDQUFDO3NCQUFBLE9BQUlBLENBQUMsQ0FBQ2IsSUFBSSxLQUFLQSxJQUFJO29CQUFBLEVBQUMsSUFBSXpCLElBQUksQ0FBRSxJQUN2RjFCLFFBQVEsS0FBSyxTQUFTLEtBQUthLE9BQU8sQ0FBQ2UsT0FBTyxDQUFDdUIsSUFBSSxLQUFLQSxJQUFJLElBQUl2QixPQUFPLENBQUU7b0JBQUEsS0FFeEU2QixLQUFLO3NCQUFBRSxRQUFBLENBQUF0QixJQUFBO3NCQUFBO29CQUFBO29CQUFBLE9BQUFzQixRQUFBLENBQUFsQixNQUFBO3NCQUFBd0IsQ0FBQSxFQUFTaEUsSUFBSSxLQUFLO29CQUFPO2tCQUFBO2tCQUFBO29CQUFBLE9BQUEwRCxRQUFBLENBQUFPLElBQUE7Z0JBQUE7Y0FBQSxHQUFBbkMsS0FBQTtZQUFBO1lBQUFGLFNBQUEsQ0FBQXNDLENBQUE7VUFBQTtZQUFBLEtBQUFyQyxLQUFBLEdBQUFELFNBQUEsQ0FBQXVDLENBQUEsSUFBQUMsSUFBQTtjQUFBbEMsU0FBQSxDQUFBRSxJQUFBO2NBQUE7WUFBQTtZQUFBLE9BQUFGLFNBQUEsQ0FBQW1DLGFBQUEsQ0FBQXZDLEtBQUE7VUFBQTtZQUFBQyxJQUFBLEdBQUFHLFNBQUEsQ0FBQW9DLEVBQUE7WUFBQSxLQUFBdkMsSUFBQTtjQUFBRyxTQUFBLENBQUFFLElBQUE7Y0FBQTtZQUFBO1lBQUEsT0FBQUYsU0FBQSxDQUFBTSxNQUFBLFdBQUFULElBQUEsQ0FBQWlDLENBQUE7VUFBQTtZQUFBOUIsU0FBQSxDQUFBRSxJQUFBO1lBQUE7VUFBQTtZQUFBRixTQUFBLENBQUFFLElBQUE7WUFBQTtVQUFBO1lBQUFGLFNBQUEsQ0FBQUMsSUFBQTtZQUFBRCxTQUFBLENBQUFxQyxFQUFBLEdBQUFyQyxTQUFBO1lBQUFOLFNBQUEsQ0FBQTRDLENBQUEsQ0FBQXRDLFNBQUEsQ0FBQXFDLEVBQUE7VUFBQTtZQUFBckMsU0FBQSxDQUFBQyxJQUFBO1lBQUFQLFNBQUEsQ0FBQTZDLENBQUE7WUFBQSxPQUFBdkMsU0FBQSxDQUFBd0MsTUFBQTtVQUFBO1lBQUEsT0FBQXhDLFNBQUEsQ0FBQU0sTUFBQSxXQUc3QixLQUFLO1VBQUE7VUFBQTtZQUFBLE9BQUFOLFNBQUEsQ0FBQStCLElBQUE7UUFBQTtNQUFBLEdBQUE5QyxPQUFBO0lBQUE7RUFDZDtBQUNGLENBQUMifQ==