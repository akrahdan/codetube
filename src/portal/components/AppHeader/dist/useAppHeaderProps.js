"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.useAppHeaderProps = void 0;
var gamut_1 = require("@codecademy/gamut");
var framer_motion_1 = require("framer-motion");
var react_1 = require("react");
var SearchButton_1 = require("./Search/SearchButton");
var store_1 = require("store");
var auth_1 = require("services/auth");
var modalSlice_1 = require("state/modals/modalSlice");
var useAuth_1 = require("store/useAuth");
var useInstructor_1 = require("store/useInstructor");
var react_router_1 = require("react-router");
var AnimatedPopoverVariants = {
    enter: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
};
var animatedPopoverProps = {
    initial: 'exit',
    animate: 'enter',
    exit: 'exit',
    variants: AnimatedPopoverVariants
};
exports.useAppHeaderProps = function () {
    var _a = react_1.useState(false), isSearchVisible = _a[0], setSearchVisible = _a[1];
    // const { data: currentUser } = useGetCurrentUserQuery()
    var currentUser = useAuth_1.useAuth().user;
    var avatar = useAuth_1.useAvatar().avatar;
    var instructor = useInstructor_1.useInstructor().instructor;
    console.log("Current: ", instructor);
    var push = react_router_1.useHistory().push;
    var _b = auth_1.useLogoutMutation(), logout = _b[0], logoutResponse = _b[1].data;
    if (logoutResponse && logoutResponse.detail) {
        localStorage.clear();
    }
    var _c = react_1.useState(false), isMobileNotificationsOpen = _c[0], setIsMobileNotificationsOpen = _c[1];
    var toggleSearch = function () {
        setSearchVisible(!isSearchVisible);
    };
    var toggleMobileNotifications = function () {
        setIsMobileNotificationsOpen(!isMobileNotificationsOpen);
    };
    var handleClick = function (event, item) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (item.id === "instructor") {
                if (currentUser && currentUser.email) {
                    window.location.replace('/course/create/');
                }
                else {
                    store_1.store.dispatch(modalSlice_1.showModal('login'));
                }
            }
            if (item.id == "login" || item.id == "signup") {
                store_1.store.dispatch(modalSlice_1.showModal(item.id));
            }
            if (item.id == "log-out") {
                logout().
                    then(function (res) {
                    if (res.data.detail) {
                        localStorage.clear();
                    }
                });
            }
            return [2 /*return*/];
        });
    }); };
    var headerProps = currentUser ? {
        type: 'pro',
        action: handleClick,
        user: {
            avatar: avatar,
            displayName: currentUser.first_name ? currentUser.first_name + " " + currentUser.last_name : currentUser.email,
            isInstructor: instructor && !!instructor.id
        },
        search: {
            onEnable: function () { return console.log(); },
            onSearch: function (query) { return react_1["default"].createElement(SearchButton_1.SearchButton, { toggleSearch: toggleSearch }); },
            onTrackingClick: function (target) { return console.log(); }
        }
    } : {
        type: 'anon',
        action: handleClick,
        search: {
            onEnable: function () { return console.log(); },
            onSearch: function (query) { return react_1["default"].createElement(SearchButton_1.SearchButton, { toggleSearch: toggleSearch }); },
            onTrackingClick: function (target) { return console.log(); }
        }
    };
    var search = (react_1["default"].createElement(gamut_1.Box, { position: "relative", zIndex: 15 },
        isSearchVisible && (react_1["default"].createElement(framer_motion_1.AnimatePresence, null,
            react_1["default"].createElement(framer_motion_1.motion.div, __assign({ key: "search" }, animatedPopoverProps)),
            ")")),
        isMobileNotificationsOpen && (react_1["default"].createElement(gamut_1.Box, { display: { _: 'block', md: 'none' } },
            react_1["default"].createElement(framer_motion_1.AnimatePresence, null,
                react_1["default"].createElement(framer_motion_1.motion.div, __assign({ key: "mobile notifications" }, animatedPopoverProps, { "data-testid": "header-mobile-notifications-dropdown" })))))));
    return [headerProps, search];
};
