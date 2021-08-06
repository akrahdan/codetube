'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setKind = require('../pure-utils/setKind');

var _setKind2 = _interopRequireDefault(_setKind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (action, type, payload) {
  action = (0, _setKind2.default)(action, 'redirect');

  if (type) {
    action.type = type;
  }

  if (payload) {
    action.payload = payload;
  }

  return action;
};