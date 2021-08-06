"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSDK = getSDK;

var _loadScript = _interopRequireDefault(require("load-script"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Util function to load an external SDK
// or return the SDK if it is already loaded
var resolves = {};

function getSDK(url, sdkGlobal) {
  var sdkReady = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var isLoaded = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {
    return true;
  };
  var fetchScript = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _loadScript["default"];

  if (window[sdkGlobal] && isLoaded(window[sdkGlobal])) {
    return Promise.resolve(window[sdkGlobal]);
  }

  return new Promise(function (resolve, reject) {
    // If we are already loading the SDK, add the resolve
    // function to the existing array of resolve functions
    if (resolves[url]) {
      resolves[url].push(resolve);
      return;
    }

    resolves[url] = [resolve];

    var onLoaded = function onLoaded(sdk) {
      // When loaded, resolve all pending promises
      resolves[url].forEach(function (resolve) {
        return resolve(sdk);
      });
    };

    if (sdkReady) {
      var previousOnReady = window[sdkReady];

      window[sdkReady] = function () {
        if (previousOnReady) previousOnReady();
        onLoaded(window[sdkGlobal]);
      };
    }

    fetchScript(url, function (err) {
      if (err) reject(err);

      if (!sdkReady) {
        onLoaded(window[sdkGlobal]);
      }
    });
  });
}