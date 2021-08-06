"use strict";
exports.__esModule = true;
exports.selectLocationPathName = exports.selectLocationType = void 0;
exports.selectLocationType = function (state) { return state.location.type; };
exports.selectLocationPathName = function (state) {
    return state.location.pathname;
};
