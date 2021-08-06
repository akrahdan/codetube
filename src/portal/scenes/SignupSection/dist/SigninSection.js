"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SiginSection = void 0;
var react_1 = require("react");
var SigninForm_1 = require("components/Forms/RegistrationForm/SigninForm");
var GoogleLogin_1 = require("./OauthLoginWrapper/GoogleLogin");
var FacebookLogin_1 = require("./OauthLoginWrapper/FacebookLogin");
var auth_1 = require("services/auth");
var modalSlice_1 = require("state/modals/modalSlice");
var hooks_1 = require("store/hooks");
var style_module_scss_1 = require("./style.module.scss");
exports.SiginSection = function (_a) {
    var redirectUrl = _a.redirectUrl;
    var dispatch = hooks_1.useAppDispatch();
    var facebookLoginUrl = auth_1.useFacebookLoginUrlMutation()[0];
    var googleLoginUrl = auth_1.useGoogleLoginUrlMutation()[0];
    var handleGoogleLogin = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch('http://127.0.0.1:8000/auth/google/url')];
                case 1:
                    res = _a.sent();
                    console.log("Result: ", res);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log("Error: ", err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
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
                                        react_1["default"].createElement("h4", { className: style_module_scss_1["default"].loginTitle }, "Log In"),
                                        react_1["default"].createElement(GoogleLogin_1.GoogleLogin, { className: style_module_scss_1["default"].cButton, onGoogleClick: handleGoogleLogin }),
                                        react_1["default"].createElement(FacebookLogin_1.FacebookLogin, { className: style_module_scss_1["default"].cButton, onFacebookClick: facebookLoginUrl }),
                                        react_1["default"].createElement("div", { className: style_module_scss_1["default"].mp4 },
                                            react_1["default"].createElement("p", { className: style_module_scss_1["default"].orSeparator },
                                                react_1["default"].createElement("span", null, "or"))),
                                        react_1["default"].createElement(SigninForm_1.SigninForm, { redirectUrl: "/" }),
                                        react_1["default"].createElement("p", { className: style_module_scss_1["default"].passForget },
                                            react_1["default"].createElement("a", null, "Forgot your password?"))))))))))));
};
