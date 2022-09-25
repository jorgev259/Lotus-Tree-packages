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
          }
        }, _callee, null, [[1, 6]]);
      }))();
    }
  }
};
var _default = _module;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJuYW1lIiwiaW50ZW50cyIsInBhcnRpYWxzIiwiY29uZmlnIiwiZ3VpbGQiLCJnYXRla2VlcHJvbGUiLCJnYXRla2VlcHJlYWN0aW9uIiwiZ2F0ZWtlZXBhbm5vdWNlIiwiZXZlbnRzIiwibWVzc2FnZVJlYWN0aW9uQWRkIiwiZ2xvYmFscyIsInJlYWN0aW9uIiwidXNlciIsInBhcnRpYWwiLCJmZXRjaCIsImNvbnNvbGUiLCJlcnJvciIsIm1lc3NhZ2UiLCJndWlsZElkIiwiY2hhbm5lbCIsImVtb2ppIiwibWVtYmVycyIsImlkIiwibWVtYmVyIiwicm9sZXMiLCJyb2xlIiwiZmluZCIsInIiLCJjaGFubmVscyIsImMiLCJ0b0xvd2VyQ2FzZSIsImNhY2hlIiwiaGFzIiwidGltZW91dCIsImFkZCIsInJlbW92ZSIsInNlbmQiXSwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCBtb2R1bGUgPSB7XG4gIG5hbWU6ICdyZWFjdGdhdGVrZWVwJyxcbiAgaW50ZW50czogWydHVUlMRFMnLCAnR1VJTERfTUVTU0FHRVMnLCAnR1VJTERfTUVTU0FHRV9SRUFDVElPTlMnXSxcbiAgcGFydGlhbHM6IFsnTUVTU0FHRScsICdDSEFOTkVMJywgJ1JFQUNUSU9OJ10sXG5cbiAgY29uZmlnOiB7XG4gICAgZ3VpbGQ6IHtcbiAgICAgIGdhdGVrZWVwcm9sZTogJycsXG4gICAgICBnYXRla2VlcHJlYWN0aW9uOiAnJyxcbiAgICAgIGdhdGVrZWVwYW5ub3VjZTogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBldmVudHM6IHtcbiAgICBhc3luYyBtZXNzYWdlUmVhY3Rpb25BZGQgKGdsb2JhbHMsIHJlYWN0aW9uLCB1c2VyKSB7XG4gICAgICBpZiAocmVhY3Rpb24ucGFydGlhbCkge1xuICAgICAgICAvLyBJZiB0aGUgbWVzc2FnZSB0aGlzIHJlYWN0aW9uIGJlbG9uZ3MgdG8gd2FzIHJlbW92ZWQsIHRoZSBmZXRjaGluZyBtaWdodCByZXN1bHQgaW4gYW4gQVBJIGVycm9yIHdoaWNoIHNob3VsZCBiZSBoYW5kbGVkXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgcmVhY3Rpb24uZmV0Y2goKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoZW4gZmV0Y2hpbmcgdGhlIG1lc3NhZ2U6JywgZXJyb3IpXG4gICAgICAgICAgLy8gUmV0dXJuIGFzIGBtZXNzYWdlLmF1dGhvcmAgbWF5IGJlIHVuZGVmaW5lZC9udWxsXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBjb25maWcgfSA9IGdsb2JhbHNcbiAgICAgIGNvbnN0IHsgbWVzc2FnZSB9ID0gcmVhY3Rpb25cbiAgICAgIGNvbnN0IHsgZ2F0ZWtlZXByb2xlLCBnYXRla2VlcHJlYWN0aW9uLCBnYXRla2VlcGFubm91Y2UgfSA9IGNvbmZpZ1ttZXNzYWdlLmd1aWxkSWRdXG5cbiAgICAgIGlmIChtZXNzYWdlLmNoYW5uZWwubmFtZSAhPT0gJ3J1bGVzJyB8fCByZWFjdGlvbi5lbW9qaS5uYW1lICE9PSBnYXRla2VlcHJlYWN0aW9uKSByZXR1cm5cblxuICAgICAgY29uc3QgZ3VpbGQgPSBhd2FpdCBtZXNzYWdlLmd1aWxkLmZldGNoKClcbiAgICAgIGNvbnN0IG1lbWJlciA9IGF3YWl0IGd1aWxkLm1lbWJlcnMuZmV0Y2godXNlci5pZClcblxuICAgICAgY29uc3Qgcm9sZXMgPSBhd2FpdCBndWlsZC5yb2xlcy5mZXRjaCgpXG4gICAgICBjb25zdCByb2xlID0gcm9sZXMuZmluZChyID0+IHIubmFtZSA9PT0gZ2F0ZWtlZXByb2xlKVxuXG4gICAgICBjb25zdCBjaGFubmVscyA9IGF3YWl0IGd1aWxkLmNoYW5uZWxzLmZldGNoKClcbiAgICAgIGNvbnN0IGNoYW5uZWwgPSBjaGFubmVscy5maW5kKGMgPT4gYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdnZW5lcmFsJylcblxuICAgICAgaWYgKG1lbWJlci5yb2xlcy5jYWNoZS5oYXMocm9sZS5pZCkpIHJldHVybiBtZW1iZXIudGltZW91dCg1ICogNjAgKiAxMDAwLCAnQmxhbWUgTGV2aXRhJylcblxuICAgICAgbWVtYmVyLnJvbGVzLmFkZChyb2xlKVxuICAgICAgcmVhY3Rpb24ucmVtb3ZlKClcblxuICAgICAgaWYgKGdhdGVrZWVwYW5ub3VjZSkgY2hhbm5lbC5zZW5kKGBUaGFua3MgZm9yIHJlYWRpbmcgdGhlIHJ1bGVzISBXZWxjb21lLCAke21lbWJlcn0gSSBob3BlIHlvdSBlbmpveSB5b3VyIHN0YXl+IWApXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1vZHVsZVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTUEsT0FBTSxHQUFHO0VBQ2JDLElBQUksRUFBRSxlQURPO0VBRWJDLE9BQU8sRUFBRSxDQUFDLFFBQUQsRUFBVyxnQkFBWCxFQUE2Qix5QkFBN0IsQ0FGSTtFQUdiQyxRQUFRLEVBQUUsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixVQUF2QixDQUhHO0VBS2JDLE1BQU0sRUFBRTtJQUNOQyxLQUFLLEVBQUU7TUFDTEMsWUFBWSxFQUFFLEVBRFQ7TUFFTEMsZ0JBQWdCLEVBQUUsRUFGYjtNQUdMQyxlQUFlLEVBQUU7SUFIWjtFQURELENBTEs7RUFhYkMsTUFBTSxFQUFFO0lBQ0FDLGtCQURBLDhCQUNvQkMsT0FEcEIsRUFDNkJDLFFBRDdCLEVBQ3VDQyxJQUR2QyxFQUM2QztNQUFBO1FBQUE7O1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUEsS0FDN0NELFFBQVEsQ0FBQ0UsT0FEb0M7a0JBQUE7a0JBQUE7Z0JBQUE7O2dCQUFBO2dCQUFBO2dCQUFBLE9BSXZDRixRQUFRLENBQUNHLEtBQVQsRUFKdUM7O2NBQUE7Z0JBQUE7Z0JBQUE7O2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBTTdDQyxPQUFPLENBQUNDLEtBQVIsQ0FBYyxpREFBZCxlQU42QyxDQU83Qzs7Z0JBUDZDOztjQUFBO2dCQVl6Q2IsTUFaeUMsR0FZOUJPLE9BWjhCLENBWXpDUCxNQVp5QztnQkFhekNjLE9BYnlDLEdBYTdCTixRQWI2QixDQWF6Q00sT0FieUM7Z0JBQUEsd0JBY1dkLE1BQU0sQ0FBQ2MsT0FBTyxDQUFDQyxPQUFULENBZGpCLEVBY3pDYixZQWR5Qyx5QkFjekNBLFlBZHlDLEVBYzNCQyxnQkFkMkIseUJBYzNCQSxnQkFkMkIsRUFjVEMsZUFkUyx5QkFjVEEsZUFkUzs7Z0JBQUEsTUFnQjdDVSxPQUFPLENBQUNFLE9BQVIsQ0FBZ0JuQixJQUFoQixLQUF5QixPQUF6QixJQUFvQ1csUUFBUSxDQUFDUyxLQUFULENBQWVwQixJQUFmLEtBQXdCTSxnQkFoQmY7a0JBQUE7a0JBQUE7Z0JBQUE7O2dCQUFBOztjQUFBO2dCQUFBO2dCQUFBLE9Ba0I3QlcsT0FBTyxDQUFDYixLQUFSLENBQWNVLEtBQWQsRUFsQjZCOztjQUFBO2dCQWtCM0NWLEtBbEIyQztnQkFBQTtnQkFBQSxPQW1CNUJBLEtBQUssQ0FBQ2lCLE9BQU4sQ0FBY1AsS0FBZCxDQUFvQkYsSUFBSSxDQUFDVSxFQUF6QixDQW5CNEI7O2NBQUE7Z0JBbUIzQ0MsTUFuQjJDO2dCQUFBO2dCQUFBLE9BcUI3Qm5CLEtBQUssQ0FBQ29CLEtBQU4sQ0FBWVYsS0FBWixFQXJCNkI7O2NBQUE7Z0JBcUIzQ1UsS0FyQjJDO2dCQXNCM0NDLElBdEIyQyxHQXNCcENELEtBQUssQ0FBQ0UsSUFBTixDQUFXLFVBQUFDLENBQUM7a0JBQUEsT0FBSUEsQ0FBQyxDQUFDM0IsSUFBRixLQUFXSyxZQUFmO2dCQUFBLENBQVosQ0F0Qm9DO2dCQUFBO2dCQUFBLE9Bd0IxQkQsS0FBSyxDQUFDd0IsUUFBTixDQUFlZCxLQUFmLEVBeEIwQjs7Y0FBQTtnQkF3QjNDYyxRQXhCMkM7Z0JBeUIzQ1QsT0F6QjJDLEdBeUJqQ1MsUUFBUSxDQUFDRixJQUFULENBQWMsVUFBQUcsQ0FBQztrQkFBQSxPQUFJQSxDQUFDLENBQUM3QixJQUFGLENBQU84QixXQUFQLE9BQXlCLFNBQTdCO2dCQUFBLENBQWYsQ0F6QmlDOztnQkFBQSxLQTJCN0NQLE1BQU0sQ0FBQ0MsS0FBUCxDQUFhTyxLQUFiLENBQW1CQyxHQUFuQixDQUF1QlAsSUFBSSxDQUFDSCxFQUE1QixDQTNCNkM7a0JBQUE7a0JBQUE7Z0JBQUE7O2dCQUFBLGlDQTJCTEMsTUFBTSxDQUFDVSxPQUFQLENBQWUsSUFBSSxFQUFKLEdBQVMsSUFBeEIsRUFBOEIsY0FBOUIsQ0EzQks7O2NBQUE7Z0JBNkJqRFYsTUFBTSxDQUFDQyxLQUFQLENBQWFVLEdBQWIsQ0FBaUJULElBQWpCO2dCQUNBZCxRQUFRLENBQUN3QixNQUFUO2dCQUVBLElBQUk1QixlQUFKLEVBQXFCWSxPQUFPLENBQUNpQixJQUFSLGtEQUF1RGIsTUFBdkQ7O2NBaEM0QjtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUE7SUFpQ2xEO0VBbENLO0FBYkssQ0FBZjtlQW1EZXhCLE8ifQ==