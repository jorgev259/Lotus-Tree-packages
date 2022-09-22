"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _module = {
  name: 'reactgatekeep',
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  config: {
    guild: {
      gatekeeprole: '',
      gatekeepreaction: '',
      gatekeepannouce: true
    }
  },
  events: {
    messageReactionAdd: function messageReactionAdd(globals, reaction, user) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var config, message, _config$message$guild, gatekeeprole, gatekeepreaction, gatekeepannouce, guild, member, roles, role, channels, channel;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!reaction.partial) {
                  _context.next = 10;
                  break;
                }

                _context.prev = 1;
                _context.next = 4;
                return reaction.fetch();

              case 4:
                _context.next = 10;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](1);
                console.error('Something went wrong when fetching the message:', _context.t0); // Return as `message.author` may be undefined/null

                return _context.abrupt("return");

              case 10:
                config = globals.config;
                message = reaction.message;
                _config$message$guild = config[message.guildId], gatekeeprole = _config$message$guild.gatekeeprole, gatekeepreaction = _config$message$guild.gatekeepreaction, gatekeepannouce = _config$message$guild.gatekeepannouce;

                if (!(message.channel.name !== 'rules' || reaction.emoji.name !== gatekeepreaction)) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt("return");

              case 15:
                _context.next = 17;
                return message.guild.fetch();

              case 17:
                guild = _context.sent;
                _context.next = 20;
                return guild.members.fetch(user.id);

              case 20:
                member = _context.sent;
                _context.next = 23;
                return guild.roles.fetch();

              case 23:
                roles = _context.sent;
                role = roles.find(function (r) {
                  return r.name === gatekeeprole;
                });
                _context.next = 27;
                return guild.channels.fetch();

              case 27:
                channels = _context.sent;
                channel = channels.find(function (c) {
                  return c.name.toLowerCase() === 'general';
                });
                member.roles.add(role);
                reaction.remove();
                if (gatekeepannouce) channel.send("Welcome, ".concat(member, " I hope you enjoy your stay~!"));

              case 32:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 6]]);
      }))();
    }
  }
};
var _default = _module;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJuYW1lIiwiaW50ZW50cyIsInBhcnRpYWxzIiwiY29uZmlnIiwiZ3VpbGQiLCJnYXRla2VlcHJvbGUiLCJnYXRla2VlcHJlYWN0aW9uIiwiZ2F0ZWtlZXBhbm5vdWNlIiwiZXZlbnRzIiwibWVzc2FnZVJlYWN0aW9uQWRkIiwiZ2xvYmFscyIsInJlYWN0aW9uIiwidXNlciIsInBhcnRpYWwiLCJmZXRjaCIsImNvbnNvbGUiLCJlcnJvciIsIm1lc3NhZ2UiLCJndWlsZElkIiwiY2hhbm5lbCIsImVtb2ppIiwibWVtYmVycyIsImlkIiwibWVtYmVyIiwicm9sZXMiLCJyb2xlIiwiZmluZCIsInIiLCJjaGFubmVscyIsImMiLCJ0b0xvd2VyQ2FzZSIsImFkZCIsInJlbW92ZSIsInNlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxPQUFNLEdBQUc7QUFDYkMsRUFBQUEsSUFBSSxFQUFFLGVBRE87QUFFYkMsRUFBQUEsT0FBTyxFQUFFLENBQUMsUUFBRCxFQUFXLGdCQUFYLEVBQTZCLHlCQUE3QixDQUZJO0FBR2JDLEVBQUFBLFFBQVEsRUFBRSxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLFVBQXZCLENBSEc7QUFLYkMsRUFBQUEsTUFBTSxFQUFFO0FBQ05DLElBQUFBLEtBQUssRUFBRTtBQUNMQyxNQUFBQSxZQUFZLEVBQUUsRUFEVDtBQUVMQyxNQUFBQSxnQkFBZ0IsRUFBRSxFQUZiO0FBR0xDLE1BQUFBLGVBQWUsRUFBRTtBQUhaO0FBREQsR0FMSztBQWFiQyxFQUFBQSxNQUFNLEVBQUU7QUFDQUMsSUFBQUEsa0JBREEsOEJBQ29CQyxPQURwQixFQUM2QkMsUUFEN0IsRUFDdUNDLElBRHZDLEVBQzZDO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUM3Q0QsUUFBUSxDQUFDRSxPQURvQztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsdUJBSXZDRixRQUFRLENBQUNHLEtBQVQsRUFKdUM7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQU03Q0MsZ0JBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLGlEQUFkLGVBTjZDLENBTzdDOztBQVA2Qzs7QUFBQTtBQVl6Q2IsZ0JBQUFBLE1BWnlDLEdBWTlCTyxPQVo4QixDQVl6Q1AsTUFaeUM7QUFhekNjLGdCQUFBQSxPQWJ5QyxHQWE3Qk4sUUFiNkIsQ0FhekNNLE9BYnlDO0FBQUEsd0NBY1dkLE1BQU0sQ0FBQ2MsT0FBTyxDQUFDQyxPQUFULENBZGpCLEVBY3pDYixZQWR5Qyx5QkFjekNBLFlBZHlDLEVBYzNCQyxnQkFkMkIseUJBYzNCQSxnQkFkMkIsRUFjVEMsZUFkUyx5QkFjVEEsZUFkUzs7QUFBQSxzQkFnQjdDVSxPQUFPLENBQUNFLE9BQVIsQ0FBZ0JuQixJQUFoQixLQUF5QixPQUF6QixJQUFvQ1csUUFBUSxDQUFDUyxLQUFULENBQWVwQixJQUFmLEtBQXdCTSxnQkFoQmY7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBLHVCQWtCN0JXLE9BQU8sQ0FBQ2IsS0FBUixDQUFjVSxLQUFkLEVBbEI2Qjs7QUFBQTtBQWtCM0NWLGdCQUFBQSxLQWxCMkM7QUFBQTtBQUFBLHVCQW1CNUJBLEtBQUssQ0FBQ2lCLE9BQU4sQ0FBY1AsS0FBZCxDQUFvQkYsSUFBSSxDQUFDVSxFQUF6QixDQW5CNEI7O0FBQUE7QUFtQjNDQyxnQkFBQUEsTUFuQjJDO0FBQUE7QUFBQSx1QkFxQjdCbkIsS0FBSyxDQUFDb0IsS0FBTixDQUFZVixLQUFaLEVBckI2Qjs7QUFBQTtBQXFCM0NVLGdCQUFBQSxLQXJCMkM7QUFzQjNDQyxnQkFBQUEsSUF0QjJDLEdBc0JwQ0QsS0FBSyxDQUFDRSxJQUFOLENBQVcsVUFBQUMsQ0FBQztBQUFBLHlCQUFJQSxDQUFDLENBQUMzQixJQUFGLEtBQVdLLFlBQWY7QUFBQSxpQkFBWixDQXRCb0M7QUFBQTtBQUFBLHVCQXdCMUJELEtBQUssQ0FBQ3dCLFFBQU4sQ0FBZWQsS0FBZixFQXhCMEI7O0FBQUE7QUF3QjNDYyxnQkFBQUEsUUF4QjJDO0FBeUIzQ1QsZ0JBQUFBLE9BekIyQyxHQXlCakNTLFFBQVEsQ0FBQ0YsSUFBVCxDQUFjLFVBQUFHLENBQUM7QUFBQSx5QkFBSUEsQ0FBQyxDQUFDN0IsSUFBRixDQUFPOEIsV0FBUCxPQUF5QixTQUE3QjtBQUFBLGlCQUFmLENBekJpQztBQTJCakRQLGdCQUFBQSxNQUFNLENBQUNDLEtBQVAsQ0FBYU8sR0FBYixDQUFpQk4sSUFBakI7QUFDQWQsZ0JBQUFBLFFBQVEsQ0FBQ3FCLE1BQVQ7QUFFQSxvQkFBSXpCLGVBQUosRUFBcUJZLE9BQU8sQ0FBQ2MsSUFBUixvQkFBeUJWLE1BQXpCOztBQTlCNEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUErQmxEO0FBaENLO0FBYkssQ0FBZjtlQWlEZXhCLE8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgbW9kdWxlID0ge1xyXG4gIG5hbWU6ICdyZWFjdGdhdGVrZWVwJyxcclxuICBpbnRlbnRzOiBbJ0dVSUxEUycsICdHVUlMRF9NRVNTQUdFUycsICdHVUlMRF9NRVNTQUdFX1JFQUNUSU9OUyddLFxyXG4gIHBhcnRpYWxzOiBbJ01FU1NBR0UnLCAnQ0hBTk5FTCcsICdSRUFDVElPTiddLFxyXG5cclxuICBjb25maWc6IHtcclxuICAgIGd1aWxkOiB7XHJcbiAgICAgIGdhdGVrZWVwcm9sZTogJycsXHJcbiAgICAgIGdhdGVrZWVwcmVhY3Rpb246ICcnLFxyXG4gICAgICBnYXRla2VlcGFubm91Y2U6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBldmVudHM6IHtcclxuICAgIGFzeW5jIG1lc3NhZ2VSZWFjdGlvbkFkZCAoZ2xvYmFscywgcmVhY3Rpb24sIHVzZXIpIHtcclxuICAgICAgaWYgKHJlYWN0aW9uLnBhcnRpYWwpIHtcclxuICAgICAgICAvLyBJZiB0aGUgbWVzc2FnZSB0aGlzIHJlYWN0aW9uIGJlbG9uZ3MgdG8gd2FzIHJlbW92ZWQsIHRoZSBmZXRjaGluZyBtaWdodCByZXN1bHQgaW4gYW4gQVBJIGVycm9yIHdoaWNoIHNob3VsZCBiZSBoYW5kbGVkXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGF3YWl0IHJlYWN0aW9uLmZldGNoKClcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hlbiBmZXRjaGluZyB0aGUgbWVzc2FnZTonLCBlcnJvcilcclxuICAgICAgICAgIC8vIFJldHVybiBhcyBgbWVzc2FnZS5hdXRob3JgIG1heSBiZSB1bmRlZmluZWQvbnVsbFxyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB7IGNvbmZpZyB9ID0gZ2xvYmFsc1xyXG4gICAgICBjb25zdCB7IG1lc3NhZ2UgfSA9IHJlYWN0aW9uXHJcbiAgICAgIGNvbnN0IHsgZ2F0ZWtlZXByb2xlLCBnYXRla2VlcHJlYWN0aW9uLCBnYXRla2VlcGFubm91Y2UgfSA9IGNvbmZpZ1ttZXNzYWdlLmd1aWxkSWRdXHJcblxyXG4gICAgICBpZiAobWVzc2FnZS5jaGFubmVsLm5hbWUgIT09ICdydWxlcycgfHwgcmVhY3Rpb24uZW1vamkubmFtZSAhPT0gZ2F0ZWtlZXByZWFjdGlvbikgcmV0dXJuXHJcblxyXG4gICAgICBjb25zdCBndWlsZCA9IGF3YWl0IG1lc3NhZ2UuZ3VpbGQuZmV0Y2goKVxyXG4gICAgICBjb25zdCBtZW1iZXIgPSBhd2FpdCBndWlsZC5tZW1iZXJzLmZldGNoKHVzZXIuaWQpXHJcblxyXG4gICAgICBjb25zdCByb2xlcyA9IGF3YWl0IGd1aWxkLnJvbGVzLmZldGNoKClcclxuICAgICAgY29uc3Qgcm9sZSA9IHJvbGVzLmZpbmQociA9PiByLm5hbWUgPT09IGdhdGVrZWVwcm9sZSlcclxuXHJcbiAgICAgIGNvbnN0IGNoYW5uZWxzID0gYXdhaXQgZ3VpbGQuY2hhbm5lbHMuZmV0Y2goKVxyXG4gICAgICBjb25zdCBjaGFubmVsID0gY2hhbm5lbHMuZmluZChjID0+IGMubmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZ2VuZXJhbCcpXHJcblxyXG4gICAgICBtZW1iZXIucm9sZXMuYWRkKHJvbGUpXHJcbiAgICAgIHJlYWN0aW9uLnJlbW92ZSgpXHJcblxyXG4gICAgICBpZiAoZ2F0ZWtlZXBhbm5vdWNlKSBjaGFubmVsLnNlbmQoYFdlbGNvbWUsICR7bWVtYmVyfSBJIGhvcGUgeW91IGVuam95IHlvdXIgc3RheX4hYClcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZVxyXG4iXX0=
