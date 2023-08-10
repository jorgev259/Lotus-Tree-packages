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
          while (1) switch (_context.prev = _context.next) {
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
              console.error('Something went wrong when fetching the message:', _context.t0);
              // Return as `message.author` may be undefined/null
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
              if (!member.roles.cache.has(role.id)) {
                _context.next = 31;
                break;
              }
              return _context.abrupt("return", member.timeout(5 * 60 * 1000, 'Blame Levita'));
            case 31:
              member.roles.add(role);
              reaction.remove();
              if (gatekeepannouce) channel.send("Thanks for reading the rules! Welcome, ".concat(member, " I hope you enjoy your stay~!"));
            case 34:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 6]]);
      }))();
    }
  }
};
var _default = _module;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJuYW1lIiwiaW50ZW50cyIsInBhcnRpYWxzIiwiY29uZmlnIiwiZ3VpbGQiLCJnYXRla2VlcHJvbGUiLCJnYXRla2VlcHJlYWN0aW9uIiwiZ2F0ZWtlZXBhbm5vdWNlIiwiZXZlbnRzIiwibWVzc2FnZVJlYWN0aW9uQWRkIiwiZ2xvYmFscyIsInJlYWN0aW9uIiwidXNlciIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwibWVzc2FnZSIsIl9jb25maWckbWVzc2FnZSRndWlsZCIsIm1lbWJlciIsInJvbGVzIiwicm9sZSIsImNoYW5uZWxzIiwiY2hhbm5lbCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJwYXJ0aWFsIiwiZmV0Y2giLCJ0MCIsImNvbnNvbGUiLCJlcnJvciIsImFicnVwdCIsImd1aWxkSWQiLCJlbW9qaSIsInNlbnQiLCJtZW1iZXJzIiwiaWQiLCJmaW5kIiwiciIsImMiLCJ0b0xvd2VyQ2FzZSIsImNhY2hlIiwiaGFzIiwidGltZW91dCIsImFkZCIsInJlbW92ZSIsInNlbmQiLCJjb25jYXQiLCJzdG9wIiwiX2RlZmF1bHQiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgbW9kdWxlID0ge1xuICBuYW1lOiAncmVhY3RnYXRla2VlcCcsXG4gIGludGVudHM6IFsnR1VJTERTJywgJ0dVSUxEX01FU1NBR0VTJywgJ0dVSUxEX01FU1NBR0VfUkVBQ1RJT05TJ10sXG4gIHBhcnRpYWxzOiBbJ01FU1NBR0UnLCAnQ0hBTk5FTCcsICdSRUFDVElPTiddLFxuXG4gIGNvbmZpZzoge1xuICAgIGd1aWxkOiB7XG4gICAgICBnYXRla2VlcHJvbGU6ICcnLFxuICAgICAgZ2F0ZWtlZXByZWFjdGlvbjogJycsXG4gICAgICBnYXRla2VlcGFubm91Y2U6IHRydWVcbiAgICB9XG4gIH0sXG5cbiAgZXZlbnRzOiB7XG4gICAgYXN5bmMgbWVzc2FnZVJlYWN0aW9uQWRkIChnbG9iYWxzLCByZWFjdGlvbiwgdXNlcikge1xuICAgICAgaWYgKHJlYWN0aW9uLnBhcnRpYWwpIHtcbiAgICAgICAgLy8gSWYgdGhlIG1lc3NhZ2UgdGhpcyByZWFjdGlvbiBiZWxvbmdzIHRvIHdhcyByZW1vdmVkLCB0aGUgZmV0Y2hpbmcgbWlnaHQgcmVzdWx0IGluIGFuIEFQSSBlcnJvciB3aGljaCBzaG91bGQgYmUgaGFuZGxlZFxuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHJlYWN0aW9uLmZldGNoKClcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGVuIGZldGNoaW5nIHRoZSBtZXNzYWdlOicsIGVycm9yKVxuICAgICAgICAgIC8vIFJldHVybiBhcyBgbWVzc2FnZS5hdXRob3JgIG1heSBiZSB1bmRlZmluZWQvbnVsbFxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgY29uZmlnIH0gPSBnbG9iYWxzXG4gICAgICBjb25zdCB7IG1lc3NhZ2UgfSA9IHJlYWN0aW9uXG4gICAgICBjb25zdCB7IGdhdGVrZWVwcm9sZSwgZ2F0ZWtlZXByZWFjdGlvbiwgZ2F0ZWtlZXBhbm5vdWNlIH0gPSBjb25maWdbbWVzc2FnZS5ndWlsZElkXVxuXG4gICAgICBpZiAobWVzc2FnZS5jaGFubmVsLm5hbWUgIT09ICdydWxlcycgfHwgcmVhY3Rpb24uZW1vamkubmFtZSAhPT0gZ2F0ZWtlZXByZWFjdGlvbikgcmV0dXJuXG5cbiAgICAgIGNvbnN0IGd1aWxkID0gYXdhaXQgbWVzc2FnZS5ndWlsZC5mZXRjaCgpXG4gICAgICBjb25zdCBtZW1iZXIgPSBhd2FpdCBndWlsZC5tZW1iZXJzLmZldGNoKHVzZXIuaWQpXG5cbiAgICAgIGNvbnN0IHJvbGVzID0gYXdhaXQgZ3VpbGQucm9sZXMuZmV0Y2goKVxuICAgICAgY29uc3Qgcm9sZSA9IHJvbGVzLmZpbmQociA9PiByLm5hbWUgPT09IGdhdGVrZWVwcm9sZSlcblxuICAgICAgY29uc3QgY2hhbm5lbHMgPSBhd2FpdCBndWlsZC5jaGFubmVscy5mZXRjaCgpXG4gICAgICBjb25zdCBjaGFubmVsID0gY2hhbm5lbHMuZmluZChjID0+IGMubmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZ2VuZXJhbCcpXG5cbiAgICAgIGlmIChtZW1iZXIucm9sZXMuY2FjaGUuaGFzKHJvbGUuaWQpKSByZXR1cm4gbWVtYmVyLnRpbWVvdXQoNSAqIDYwICogMTAwMCwgJ0JsYW1lIExldml0YScpXG5cbiAgICAgIG1lbWJlci5yb2xlcy5hZGQocm9sZSlcbiAgICAgIHJlYWN0aW9uLnJlbW92ZSgpXG5cbiAgICAgIGlmIChnYXRla2VlcGFubm91Y2UpIGNoYW5uZWwuc2VuZChgVGhhbmtzIGZvciByZWFkaW5nIHRoZSBydWxlcyEgV2VsY29tZSwgJHttZW1iZXJ9IEkgaG9wZSB5b3UgZW5qb3kgeW91ciBzdGF5fiFgKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBtb2R1bGVcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsSUFBTUEsT0FBTSxHQUFHO0VBQ2JDLElBQUksRUFBRSxlQUFlO0VBQ3JCQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUseUJBQXlCLENBQUM7RUFDaEVDLFFBQVEsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDO0VBRTVDQyxNQUFNLEVBQUU7SUFDTkMsS0FBSyxFQUFFO01BQ0xDLFlBQVksRUFBRSxFQUFFO01BQ2hCQyxnQkFBZ0IsRUFBRSxFQUFFO01BQ3BCQyxlQUFlLEVBQUU7SUFDbkI7RUFDRixDQUFDO0VBRURDLE1BQU0sRUFBRTtJQUNBQyxrQkFBa0IsV0FBQUEsbUJBQUVDLE9BQU8sRUFBRUMsUUFBUSxFQUFFQyxJQUFJLEVBQUU7TUFBQSxXQUFBQyxr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