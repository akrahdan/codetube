"use strict";
exports.__esModule = true;
exports.GlobalHeader = void 0;
var gamut_1 = require("@codecademy/gamut");
var react_1 = require("@emotion/react");
var classnames_1 = require("classnames");
var react_2 = require("react");
var __1 = require("..");
var types_1 = require("../AppHeader/AppHeaderElements/types");
var GlobalHeaderVariants_1 = require("./GlobalHeaderVariants");
var styles_module_scss_1 = require("./styles.module.scss");
var getAppHeaderItems = function (props) {
    var _a, _b;
    switch (props.type) {
        case 'anon':
            switch (props.variant) {
                case 'landing':
                    return GlobalHeaderVariants_1.anonLandingHeaderItems();
                case 'login':
                    return GlobalHeaderVariants_1.anonLoginHeaderItems();
                case 'signup':
                    return GlobalHeaderVariants_1.anonSignupHeaderItems();
                default:
                    return GlobalHeaderVariants_1.anonDefaultHeaderItems();
            }
        case 'free':
            return GlobalHeaderVariants_1.freeHeaderItems(props.user, (_a = props.renderNotifications) === null || _a === void 0 ? void 0 : _a.desktop);
        case 'pro':
            return GlobalHeaderVariants_1.proHeaderItems(props.user, (_b = props.renderNotifications) === null || _b === void 0 ? void 0 : _b.desktop);
        case 'loading':
            return GlobalHeaderVariants_1.loadingHeaderItems;
    }
};
var getMobileAppHeaderItems = function (props) {
    var _a, _b;
    switch (props.type) {
        case 'anon':
            switch (props.variant) {
                case 'landing':
                    return GlobalHeaderVariants_1.anonLandingMobileHeaderItems();
                case 'login':
                    return GlobalHeaderVariants_1.anonLoginMobileHeaderItems();
                case 'signup':
                    return GlobalHeaderVariants_1.anonSignupMobileHeaderItems();
                default:
                    return GlobalHeaderVariants_1.anonDefaultMobileHeaderItems();
            }
        case 'free':
            return GlobalHeaderVariants_1.freeMobileHeaderItems(props.user, (_a = props.renderNotifications) === null || _a === void 0 ? void 0 : _a.mobile);
        case 'pro':
            return GlobalHeaderVariants_1.proMobileHeaderItems(props.user, (_b = props.renderNotifications) === null || _b === void 0 ? void 0 : _b.mobile);
        case 'loading':
            return GlobalHeaderVariants_1.loadingMobileHeaderItems;
    }
};
exports.GlobalHeader = function (props) {
    var action = props.action, onLinkAction = props.onLinkAction;
    var _a = react_2.useState(true), isInHeaderRegion = _a[0], setIsInHeaderRegion = _a[1];
    // it is not recommended to replicate this logic in other components unless absolutely necessary, as it is
    // a workaround for style rehydration issues when using react-use/useWindowScroll. The reasoning behind this
    // workaround is discussed here: https://github.com/Codecademy/client-modules/pull/1822#discussion_r650125406
    react_2.useEffect(function () {
        var checkScroll = function () { return setIsInHeaderRegion((window === null || window === void 0 ? void 0 : window.pageYOffset) === 0); };
        checkScroll();
        document.addEventListener('scroll', checkScroll);
        return function () { return document.removeEventListener('scroll', checkScroll); };
    }, []);
    var theme = react_1.useTheme();
    var combinedAction = react_2.useCallback(function (event, item) {
        action(event, item);
        if (types_1.isAppHeaderItemWithHref(item))
            onLinkAction === null || onLinkAction === void 0 ? void 0 : onLinkAction(event, item);
    }, [action, onLinkAction]);
    var headerClasses = classnames_1["default"](styles_module_scss_1["default"].stickyHeader, isInHeaderRegion && styles_module_scss_1["default"].transitionFadeOut);
    return (react_2["default"].createElement(gamut_1.Box, { as: "header", position: "sticky", top: 0, zIndex: theme.elements.headerZ },
        react_2["default"].createElement(gamut_1.Box, { display: { _: 'none', md: 'block' }, height: theme.elements.headerHeight, className: headerClasses },
            react_2["default"].createElement(__1.AppHeader, { action: combinedAction, items: getAppHeaderItems(props), search: props.search, redirectParam: props.type === 'anon' ? props.redirectParam : undefined })),
        react_2["default"].createElement(gamut_1.Box, { display: { _: 'block', md: 'none' }, height: theme.elements.headerHeight, className: headerClasses },
            react_2["default"].createElement(__1.AppHeaderMobile, { action: combinedAction, items: getMobileAppHeaderItems(props), onSearch: props.search.onSearch, redirectParam: props.type === 'anon' ? props.redirectParam : undefined })),
        props.children));
};
