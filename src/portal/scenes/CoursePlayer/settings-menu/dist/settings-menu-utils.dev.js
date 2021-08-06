"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onKeyDownLanguage = exports.onKeyPressLanguage = exports.getQualityAriaLabel = exports.getQualityFromHeight = exports.onResolutionChange = exports.requestNewUrls = void 0;

var _constants = require("../constants");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var requestNewUrls = function requestNewUrls(props) {
  var setLoading = props.setLoading,
      requestUrls = props.requestUrls;
  setLoading && setLoading(true);
  requestUrls && requestUrls();
};

exports.requestNewUrls = requestNewUrls;

var onResolutionChange = function onResolutionChange(currentResolution, props) {
  var setCurrentResolution = props.setCurrentResolution,
      setPreferredResolutions = props.setPreferredResolutions,
      mediaType = props.mediaType,
      preferredResolutions = props.preferredResolutions;
  if (currentResolution !== props.currentResolution) setCurrentResolution && setCurrentResolution(currentResolution);
  if (preferredResolutions && currentResolution !== preferredResolutions[mediaType]) setPreferredResolutions && setPreferredResolutions(_defineProperty({}, mediaType, currentResolution));
  if (mediaType !== _constants.MediaTypes.HLS) requestNewUrls(props);
};

exports.onResolutionChange = onResolutionChange;

var getQualityFromHeight = function getQualityFromHeight(height) {
  return typeof height === 'number' ? "".concat(height, "p") : height;
};

exports.getQualityFromHeight = getQualityFromHeight;

var getQualityAriaLabel = function getQualityAriaLabel(height, currentResolution) {
  return currentResolution && height === currentResolution.height ? "quality is ".concat(getQualityFromHeight(height)) : "set to ".concat(getQualityFromHeight(height));
}; // LANGUAGE


exports.getQualityAriaLabel = getQualityAriaLabel;

var onKeyPressLanguage = function onKeyPressLanguage(language, props) {
  return function (e) {
    var setClosedCaptioningLanguage = props.setClosedCaptioningLanguage;
    var keycode = e.keyCode || e.which;

    if (keycode === 13) {
      e.preventDefault();
      e.stopPropagation();
      setClosedCaptioningLanguage && setClosedCaptioningLanguage(language);
      return true;
    }
  };
};

exports.onKeyPressLanguage = onKeyPressLanguage;

var onKeyDownLanguage = function onKeyDownLanguage(language, props) {
  return function (e) {
    var setClosedCaptioningLanguage = props.setClosedCaptioningLanguage;
    var keycode = e.keyCode || e.which;

    if (keycode === 13 || e.key == ' ') {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      setClosedCaptioningLanguage && setClosedCaptioningLanguage(language);
      return true;
    }
  };
};

exports.onKeyDownLanguage = onKeyDownLanguage;