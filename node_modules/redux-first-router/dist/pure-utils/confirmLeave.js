'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDisplayConfirmLeave = exports.getUserConfirmation = exports.confirmUI = exports.createConfirm = exports.clearBlocking = undefined;

var _pathToAction = require('./pathToAction');

var _pathToAction2 = _interopRequireDefault(_pathToAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _unblock = void 0;

var _removeConfirmBlocking = void 0;
var _displayConfirmLeave = void 0;

var clearBlocking = exports.clearBlocking = function clearBlocking() {
  _unblock && _unblock();
  _removeConfirmBlocking && _removeConfirmBlocking();
};

// This is the default `displayConfirmLeave` handler.
// It receives the message to display and a callback to call when complete.
// Pass `true` to the callback to proceed with leaving the current route.

var defaultDisplayConfirmLeave = function defaultDisplayConfirmLeave(message, callback) {
  var hasConfirm = typeof window !== 'undefined' && window.confirm;

  if (!hasConfirm) {
    throw new Error('[rudy] environment requires `displayConfirmLeave` option');
  }

  var canLeave = window.confirm(message);

  callback(canLeave);
};

// createConfirm is called whenever you enter a route that has a `confirmLeave`
// option. It tells the history package to block via `history.block`, but
// to determine to do so based on our redux state-centric `confirm` handler.
// This handler is also returned for use in the middleware to block when
// leaving the current route via actions (i.e. as opposed to browser buttons)

var createConfirm = exports.createConfirm = function createConfirm(confirmLeave, store, selectLocationState, history, querySerializer, removeConfirmBlocking) {
  var confirm = function confirm(location) {
    var state = store.getState();
    var routesMap = selectLocationState(state).routesMap;
    var pathname = location.pathname;
    var action = (0, _pathToAction2.default)(pathname, routesMap, querySerializer);
    var response = confirmLeave(state, action);

    // we use the confirmLeave function manually in onBeforeChange, so we must
    // manually clear blocking that history.block would otherwise handle, plus
    // we remove additional onBeforeChange blocking via _removeConfirmBlocking
    if (!response) clearBlocking();
    return response;
  };

  _unblock = history.block(confirm);
  _removeConfirmBlocking = removeConfirmBlocking;

  return confirm;
};

// confirmUI here is triggered only by onBeforeChange:

var confirmUI = exports.confirmUI = function confirmUI(message, store, action) {
  var cb = function cb(canLeave) {
    if (canLeave) {
      clearBlocking();
      store.dispatch(action);
    }
  };

  _displayConfirmLeave(message, cb);
};

var getUserConfirmation = exports.getUserConfirmation = function getUserConfirmation(message, cb) {
  _displayConfirmLeave(message, function (canLeave) {
    if (canLeave) clearBlocking();
    cb(canLeave);
  });
};

var setDisplayConfirmLeave = exports.setDisplayConfirmLeave = function setDisplayConfirmLeave(displayConfirmLeave) {
  _displayConfirmLeave = displayConfirmLeave || defaultDisplayConfirmLeave;
};