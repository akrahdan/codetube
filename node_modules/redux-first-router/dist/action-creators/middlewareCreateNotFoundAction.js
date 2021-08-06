'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nestAction = require('../pure-utils/nestAction');

var _nestAction2 = _interopRequireDefault(_nestAction);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (action, location, prevLocation, history, notFoundPath) {
  var payload = action.payload;


  var meta = action.meta;
  var prevPath = location.pathname;

  var kind = meta && meta.location && meta.location.kind || // use case: kind === 'redirect'
  location.kind === 'load' && 'load' || 'push';

  var pathname = meta && meta.notFoundPath || kind === 'redirect' && notFoundPath || prevPath || '/';

  return (0, _nestAction2.default)(pathname, { type: _index.NOT_FOUND, payload: payload }, prevLocation, history, kind);
};