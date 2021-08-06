"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.LoadingBox = void 0;
var gamut_1 = require("@codecademy/gamut");
var react_1 = require("react");
exports.LoadingBox = function (props) { return (react_1["default"].createElement(gamut_1.Box, __assign({ bg: "gray-100", borderRadius: "2px" }, props))); };
