"use strict";
exports.__esModule = true;
exports.UpdateModal = void 0;
var react_1 = require("react");
var classnames_1 = require("classnames");
var style_module_scss_1 = require("./style.module.scss");
exports.UpdateModal = function () {
    var cs = classnames_1["default"](style_module_scss_1["default"].cButton, style_module_scss_1["default"].uploadPhoto);
    return (react_1["default"].createElement("div", { "aria-labelledby": "myModalLabel", className: style_module_scss_1["default"].modalOpen, role: "dialog", tabIndex: -1, style: { display: "block" } },
        react_1["default"].createElement("div", { className: style_module_scss_1["default"].modalDialog, role: "document" },
            react_1["default"].createElement("div", { className: classnames_1["default"](style_module_scss_1["default"].modalContent, style_module_scss_1["default"].cfInvert) },
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].modalHeader },
                    react_1["default"].createElement("button", { "aria-label": "Close", className: style_module_scss_1["default"].close, type: "button" },
                        react_1["default"].createElement("span", { "aria-hidden": "true" }, " \u00D7")),
                    react_1["default"].createElement("div", { className: style_module_scss_1["default"].textCenter },
                        react_1["default"].createElement("h4", { className: style_module_scss_1["default"].mbh4 }, "Please complete your profile."))),
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].modalBody },
                    react_1["default"].createElement("form", { className: "new_user_info", id: "new_user_info", action: "/user_info", acceptCharset: "UTF-8", "data-remote": "true", method: "post" },
                        react_1["default"].createElement("div", { className: style_module_scss_1["default"].userContainer },
                            react_1["default"].createElement("div", { className: "pre-comment__col-user-avatar-container" },
                                react_1["default"].createElement("div", { className: style_module_scss_1["default"].avatarEditHolder },
                                    react_1["default"].createElement("img", { className: style_module_scss_1["default"].profilePhoto, src: process.env.PUBLIC_URL + '/img/avatar-photo.png' }),
                                    react_1["default"].createElement("div", { className: cs }, "Upload Photo"),
                                    react_1["default"].createElement("a", { className: classnames_1["default"](style_module_scss_1["default"].cButton, style_module_scss_1["default"].buttonFacebook), href: "" }, "Import from Facebook")))),
                        react_1["default"].createElement("div", { className: style_module_scss_1["default"].fieldsContainer },
                            react_1["default"].createElement("ul", null,
                                react_1["default"].createElement("li", null,
                                    react_1["default"].createElement("p", null, "Name:"),
                                    react_1["default"].createElement("div", { className: classnames_1["default"](style_module_scss_1["default"].name, style_module_scss_1["default"].first) },
                                        react_1["default"].createElement("input", { placeholder: "First Name", className: style_module_scss_1["default"].input, type: "text", name: "user_info[first_name]", id: "user_info_first_name" })),
                                    react_1["default"].createElement("div", { className: style_module_scss_1["default"].name },
                                        react_1["default"].createElement("input", { placeholder: "Last Name", className: style_module_scss_1["default"].input, type: "text", name: "user_info[last_name]", id: "user_info_last_name" }))),
                                react_1["default"].createElement("li", null,
                                    react_1["default"].createElement("p", null, "Location:"),
                                    react_1["default"].createElement("input", { placeholder: "Your Location", type: "text", name: style_module_scss_1["default"].input, id: "user_info_location" }))),
                            react_1["default"].createElement("button", { className: classnames_1["default"](style_module_scss_1["default"].cButton, style_module_scss_1["default"].cButtonPrimary), id: "cyp-submit", type: "submit" }, "Continue"))))))));
};
