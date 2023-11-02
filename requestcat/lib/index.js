"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = _interopRequireWildcard(require("sequelize"));
var _commands = _interopRequireDefault(require("./commands"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj["default"] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
var _default = {
  name: 'requestcat',
  commands: _commands["default"],
  events: {
    ready: function ready(globals) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var configFile, client, config, guild;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              configFile = globals.configFile, client = globals.client;
              config = configFile.sequelize;
              config.database = 'soc';
              globals.socdb = new _sequelize["default"](config);
              globals.socdb.define('request', {
                id: {
                  type: _sequelize.DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true
                },
                title: _sequelize.DataTypes.STRING,
                link: _sequelize.DataTypes.STRING,
                user: _sequelize.DataTypes.STRING,
                userID: _sequelize.DataTypes.STRING,
                state: {
                  type: _sequelize.DataTypes.STRING,
                  allowNull: false
                },
                donator: {
                  type: _sequelize.DataTypes.BOOLEAN,
                  allowNull: false
                },
                reason: _sequelize.DataTypes.STRING,
                comments: _sequelize.DataTypes.STRING,
                message: _sequelize.DataTypes.STRING
              });
              _context.prev = 5;
              _context.next = 8;
              return client.guilds.fetch('496366337036255242');
            case 8:
              guild = _context.sent;
              _context.next = 11;
              return guild.channels.fetch();
            case 11:
              _context.next = 15;
              break;
            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](5);
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[5, 13]]);
      }))();
    }
  }
};
exports["default"] = _default;