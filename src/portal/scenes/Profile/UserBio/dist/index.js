"use strict";
exports.__esModule = true;
exports.UserBio = void 0;
var styles_module_scss_1 = require("./styles.module.scss");
var all_1 = require("react-icons/all");
exports.UserBio = function () {
    return (React.createElement("div", { className: styles_module_scss_1["default"].pageContent },
        React.createElement("div", { className: styles_module_scss_1["default"].visualBlock },
            React.createElement("div", { className: styles_module_scss_1["default"].userInfo },
                React.createElement("div", { className: styles_module_scss_1["default"].navLinks },
                    React.createElement("a", { className: styles_module_scss_1["default"].left },
                        React.createElement(all_1.IoCaretBack, { size: 18 }),
                        React.createElement("span", { className: styles_module_scss_1["default"].spanPadding }, "Back")),
                    React.createElement("a", { className: styles_module_scss_1["default"].right },
                        React.createElement(all_1.MdEdit, { size: 16 }),
                        React.createElement("span", { className: styles_module_scss_1["default"].spanPadding }, "Edit Profile"))),
                React.createElement("div", { className: styles_module_scss_1["default"].container },
                    React.createElement("div", { className: styles_module_scss_1["default"].photo },
                        React.createElement("img", { src: process.env.PUBLIC_URL + '/img/avatar-photo.png' })),
                    React.createElement("div", { className: styles_module_scss_1["default"].about },
                        React.createElement("div", { className: styles_module_scss_1["default"].headlineInfo },
                            React.createElement("h1", null, "Samuel Akrah"))))))));
};
