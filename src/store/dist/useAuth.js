"use strict";
exports.__esModule = true;
exports.useAuth = void 0;
var react_1 = require("react");
var hooks_1 = require("./hooks");
var authSlice_1 = require("state/auth/authSlice");
exports.useAuth = function () {
    var user = hooks_1.useAppSelector(authSlice_1.selectCurrentUser);
    return react_1.useMemo(function () { return ({ user: user }); }, [user]);
};
