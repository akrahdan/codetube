"use strict";
exports.__esModule = true;
exports.Recommendations = void 0;
var react_1 = require("react");
var ContentfulContext_1 = require("portal/scenes/Paths/ContentfulContext");
var sample_1 = require("./sample");
var Recommendations_1 = require("./Recommendations");
exports.Recommendations = function (_a) {
    var pathId = _a.pathId, related = _a.related;
    var cms = react_1.useContext(ContentfulContext_1["default"]);
    var pathIds = cms.other_path_ids;
    var _b = react_1.useState([]), paths = _b[0], setPaths = _b[1];
    return react_1["default"].createElement(Recommendations_1["default"], { projects: related, pathId: pathId, paths: sample_1.Paths, cms: cms });
};
