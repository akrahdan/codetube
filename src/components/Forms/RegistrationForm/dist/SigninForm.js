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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.SigninForm = void 0;
var gamut_1 = require("@codecademy/gamut");
var lodash_1 = require("lodash");
var react_1 = require("react");
var react_use_1 = require("react-use");
var uuid_1 = require("uuid");
var react_cookies_1 = require("react-cookies");
var passwordTips_1 = require("libs/passwordTips");
var authSlice_1 = require("state/auth/authSlice");
var modalSlice_1 = require("state/modals/modalSlice");
var hooks_1 = require("store/hooks");
var auth_1 = require("services/auth");
var helpers_1 = require("./helpers");
var index_module_scss_1 = require("./styles/index.module.scss");
var types_1 = require("./types");
var validators_1 = require("./validators");
exports.SigninForm = function (_a) {
    var _b = _a.onSuccess, onSuccess = _b === void 0 ? helpers_1.redirectAfterLogin : _b, props = __rest(_a, ["onSuccess"]);
    var dispatch = hooks_1.useAppDispatch();
    // const ssoFeatureFlag = useFeatureFlag('enterprise_sso_form');
    var isMounted = react_use_1.useMountedState();
    var _c = react_1.useState(false), isDisabled = _c[0], setDisabled = _c[1];
    var _d = react_1.useState(true), submitLocked = _d[0], setSubmitLocked = _d[1];
    var _e = react_1.useState(uuid_1.v4()), recaptchaInstanceId = _e[0], setRecaptchaInstanceId = _e[1];
    var _f = react_1.useState(), serializedForm = _f[0], setSerializedForm = _f[1];
    var _g = react_1.useState(), recaptchaError = _g[0], setRecaptchaError = _g[1];
    var captcha = react_1.useRef(null);
    var _h = react_1.useMemo(function () { return ({
        emailValidation: validators_1.VALIDATORS.email(),
        passwordValidation: validators_1.VALIDATORS.password()
    }); }, []), emailValidation = _h.emailValidation, passwordValidation = _h.passwordValidation;
    var _j = auth_1.useLoginMutation(), login = _j[0], _k = _j[1], data = _k.data, error = _k.error;
    var onUpdate = function () {
        lodash_1.delay(function () { return isMounted() && submitLocked && setSubmitLocked(false); }, 500);
    };
    var submitForm = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    values.csrfmiddlewaretoken = react_cookies_1["default"].load('csrftoken');
                    return [4 /*yield*/, login(values).unwrap()];
                case 1:
                    user = _a.sent();
                    localStorage.setItem('token', user.token);
                    dispatch(authSlice_1.setCredentials(user));
                    dispatch(modalSlice_1.hideCurrentModal());
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log("Error: ", err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: index_module_scss_1["default"].registrationContainer },
        react_1["default"].createElement(gamut_1.GridForm, { className: index_module_scss_1["default"].loginForm, fields: [
                {
                    name: types_1.UserSubmitKey.EMAIL,
                    label: 'Email',
                    type: 'email',
                    defaultValue: '',
                    size: 12,
                    onUpdate: onUpdate
                },
                {
                    name: types_1.UserSubmitKey.PASSWORD,
                    label: 'Password',
                    type: 'password',
                    tooltip: {
                        children: react_1["default"].createElement(gamut_1.Markdown, { text: passwordTips_1.passwordTips }),
                        id: 'password-tooltip',
                        alignment: 'bottom-left',
                        className: index_module_scss_1["default"].tooltipContainer
                    },
                    size: 12,
                    onUpdate: onUpdate,
                    defaultValue: ''
                },
            ], submit: {
                contents: 'Log In',
                position: 'stretch',
                theme: 'brand-red',
                size: 12,
                disabled: isDisabled || submitLocked
            }, validation: "all", onSubmit: submitForm }),
        react_1["default"].createElement(gamut_1.Box, { pt: 16 }, recaptchaError && (react_1["default"].createElement("div", { className: index_module_scss_1["default"].recaptchaError }, recaptchaError))),
        react_1["default"].createElement(gamut_1.Text, { className: index_module_scss_1["default"].textDisplay },
            react_1["default"].createElement("p", { className: index_module_scss_1["default"].textCenter },
                "Need an account?",
                " ",
                react_1["default"].createElement("a", { className: index_module_scss_1["default"].textLink, onClick: function () { return dispatch(modalSlice_1.showModal('signup')); } }, "Sign up"),
                "."))));
};
