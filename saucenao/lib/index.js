"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _events = _interopRequireDefault(require("./events"));

var _commands = _interopRequireDefault(require("./commands"));

var _default = {
  name: 'saucenao',
  config: {
    guild: {
      saucescore: '70'
    }
  },
  preload: function preload(sequelize) {
    sequelize.define('saucenao', {
      guild: {
        type: _sequelize.DataTypes.STRING,
        primaryKey: true
      },
      channel: {
        type: _sequelize.DataTypes.STRING,
        primaryKey: true
      }
    });
  },
  events: _events["default"],
  commands: _commands["default"]
};
exports["default"] = _default;