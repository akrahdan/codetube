"use strict";
exports.__esModule = true;
exports.SignupSection = void 0;
var react_1 = require("react");
var RegistrationForm_1 = require("components/Forms/RegistrationForm");
var GoogleLogin_1 = require("./OauthLoginWrapper/GoogleLogin");
var FacebookLogin_1 = require("./OauthLoginWrapper/FacebookLogin");
var modalSlice_1 = require("state/modals/modalSlice");
var auth_1 = require("services/auth");
var hooks_1 = require("store/hooks");
var style_module_scss_1 = require("./style.module.scss");
exports.SignupSection = function (_a) {
    var redirectUrl = _a.redirectUrl;
    var dispatch = hooks_1.useAppDispatch();
    var facebookLogin = auth_1.useFacebookLoginMutation()[0];
    var googleLogin = auth_1.useGoogleLoginMutation()[0];
    return (react_1["default"].createElement("div", { className: style_module_scss_1["default"].cfModal },
        react_1["default"].createElement("div", { className: style_module_scss_1["default"].cfBackdrop }),
        react_1["default"].createElement("div", { className: style_module_scss_1["default"].cfModalViewport },
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].container },
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].cfModalContent, tabIndex: -1 },
                    react_1["default"].createElement("div", { className: style_module_scss_1["default"].cfInvert },
                        react_1["default"].createElement("div", { className: style_module_scss_1["default"].cfBackgroundContainer }),
                        react_1["default"].createElement("div", { className: style_module_scss_1["default"].contentContainer },
                            react_1["default"].createElement("div", { className: style_module_scss_1["default"].backgroundContent },
                                react_1["default"].createElement("div", { className: style_module_scss_1["default"].modalClose, onClick: function () { return dispatch(modalSlice_1.hideCurrentModal()); } },
                                    react_1["default"].createElement("svg", { width: "2em", height: "2em", viewBox: "0 0 24 24", fill: "none" },
                                        react_1["default"].createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6.97 6.97a.75.75 0 011.06 0L12 10.94l3.97-3.97a.75.75 0 111.06 1.06L13.06 12l3.97 3.97a.75.75 0 11-1.06 1.06L12 13.06l-3.97 3.97a.75.75 0 01-1.06-1.06L10.94 12 6.97 8.03a.75.75 0 010-1.06z", fill: "currentColor" }))),
                                react_1["default"].createElement("div", { className: style_module_scss_1["default"].cfPadding },
                                    react_1["default"].createElement("div", null,
                                        react_1["default"].createElement("h4", { className: style_module_scss_1["default"].loginTitle }, "Create Account"),
                                        react_1["default"].createElement(GoogleLogin_1.GoogleLogin, { className: style_module_scss_1["default"].cButton, onGoogleClick: facebookLogin }),
                                        react_1["default"].createElement(FacebookLogin_1.FacebookLogin, { className: style_module_scss_1["default"].cButton, onFacebookClick: googleLogin }),
                                        react_1["default"].createElement("div", { className: style_module_scss_1["default"].mp4 },
                                            react_1["default"].createElement("p", { className: style_module_scss_1["default"].orSeparator },
                                                react_1["default"].createElement("span", null, "or"))),
                                        react_1["default"].createElement(RegistrationForm_1.RegistrationForm, { redirectUrl: "/" }),
                                        react_1["default"].createElement("p", { className: style_module_scss_1["default"].passForget },
                                            react_1["default"].createElement("a", null, "Forgot your password?"))))))))))));
};
