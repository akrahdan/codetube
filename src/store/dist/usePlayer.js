"use strict";
exports.__esModule = true;
exports.usePlayer = void 0;
var react_1 = require("react");
var hooks_1 = require("./hooks");
var playerSlice_1 = require("state/player/playerSlice");
exports.usePlayer = function () {
    var player = hooks_1.useAppSelector(playerSlice_1.selectPlayer);
    return react_1.useMemo(function () { return ({ player: player }); }, [player]);
};
