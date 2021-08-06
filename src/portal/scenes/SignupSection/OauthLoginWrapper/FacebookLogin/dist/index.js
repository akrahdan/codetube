"use strict";
exports.__esModule = true;
exports.FacebookLogin = void 0;
var react_1 = require("react");
var classnames_1 = require("classnames");
var styles_module_scss_1 = require("./styles.module.scss");
exports.FacebookLogin = function (_a) {
    var className = _a.className, onFacebookClick = _a.onFacebookClick;
    var btnCS = classnames_1["default"](styles_module_scss_1["default"].buttonFacebook, styles_module_scss_1["default"].buttonFullwidth, className);
    return (react_1["default"].createElement("div", { className: styles_module_scss_1["default"].mb4 },
        react_1["default"].createElement("a", { className: btnCS, href: process.env.REACT_APP_API_URL + "/auth/facebook/url" },
            react_1["default"].createElement("svg", { width: "2em", height: "2em", viewBox: "0 0 24 24", fill: "none", className: styles_module_scss_1["default"].mr3 },
                react_1["default"].createElement("path", { d: "M19.117 4H4.877A.883.883 0 004 4.883v14.24a.883.883 0 00.883.877h7.664v-6.187h-2.08V11.39h2.08V9.61c0-2.066 1.263-3.2 3.106-3.2a16.73 16.73 0 011.862.096v2.166h-1.28c-1 0-1.193.48-1.193 1.176v1.542h2.398l-.32 2.423h-2.08V20h4.077a.883.883 0 00.883-.883V4.877A.883.883 0 0019.117 4z", fill: "currentColor" })),
            "Log in with Facebook")));
};
