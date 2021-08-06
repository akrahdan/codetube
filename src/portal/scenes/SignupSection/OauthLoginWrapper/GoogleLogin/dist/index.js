"use strict";
exports.__esModule = true;
exports.GoogleLogin = void 0;
var react_1 = require("react");
var classnames_1 = require("classnames");
var styles_module_scss_1 = require("./styles.module.scss");
exports.GoogleLogin = function (_a) {
    var className = _a.className, onGoogleClick = _a.onGoogleClick;
    var btnCS = classnames_1["default"](styles_module_scss_1["default"].buttonGoogle, styles_module_scss_1["default"].buttonFullwidth, className);
    return (react_1["default"].createElement("div", { className: styles_module_scss_1["default"].mb4 },
        react_1["default"].createElement("a", { className: btnCS, href: process.env.REACT_APP_API_URL + "/auth/google/url" },
            react_1["default"].createElement("svg", { width: "2em", height: "2em", viewBox: "0 0 24 24", fill: "none", className: styles_module_scss_1["default"].mr3 },
                react_1["default"].createElement("rect", { width: 24, height: 24, rx: 2, fill: "#fff" }),
                react_1["default"].createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M19.68 12.182c0-.567-.05-1.113-.145-1.636H12v3.094h4.305a3.68 3.68 0 01-1.596 2.415v2.007h2.585c1.513-1.393 2.386-3.444 2.386-5.88z", fill: "#4285F4" }),
                react_1["default"].createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 20c2.16 0 3.97-.716 5.294-1.938l-2.585-2.008c-.716.48-1.633.764-2.71.764-2.083 0-3.846-1.407-4.475-3.298H4.85v2.073A7.997 7.997 0 0012 20z", fill: "#34A853" }),
                react_1["default"].createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.524 13.52c-.16-.48-.251-.993-.251-1.52s.09-1.04.25-1.52V8.407H4.852A7.997 7.997 0 004 12c0 1.29.31 2.513.85 3.593l2.674-2.073z", fill: "#FBBC05" }),
                react_1["default"].createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 7.182c1.175 0 2.229.403 3.058 1.196l2.295-2.294C15.967 4.793 14.156 4 12 4a7.997 7.997 0 00-7.15 4.407l2.674 2.073C8.153 8.59 9.916 7.182 12 7.182z", fill: "#EA4335" })),
            "Log in with Google")));
};
