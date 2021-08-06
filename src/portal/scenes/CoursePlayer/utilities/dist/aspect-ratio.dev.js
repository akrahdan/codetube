"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateAspectRatioWidth = calculateAspectRatioWidth;
exports.calculateAspectRatioHeight = calculateAspectRatioHeight;
exports.calculateAspectRatio = calculateAspectRatio;

function calculateAspectRatioWidth(height) {
  return Math.ceil(16 / 9 * height);
}

function calculateAspectRatioHeight(width) {
  return Math.ceil(width / 16 * 9);
}

function calculateAspectRatio(_ref) {
  var width = _ref.width,
      height = _ref.height;
  var size = {
    height: height,
    width: width
  };

  if (height >= width) {
    size.height = calculateAspectRatioHeight(width);
    size.width = width;
  } else {
    size.height = height;
    size.width = calculateAspectRatioWidth(height); // Calculated width will overflow the container, calculate again

    if (size.width > width) {
      size.width = width;
      size.height = calculateAspectRatioHeight(size.width);
    }
  }

  return size;
}