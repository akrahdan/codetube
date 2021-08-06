"use strict";
var _a;
exports.__esModule = true;
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var redux_first_router_1 = require("redux-first-router");
var query_string_1 = require("query-string");
var routes_1 = require("portal/routes");
var auth_1 = require("services/auth");
var projects_1 = require("services/projects");
var modalSlice_1 = require("state/modals/modalSlice");
var authSlice_1 = require("state/auth/authSlice");
var playerSlice_1 = require("state/player/playerSlice");
var _b = redux_first_router_1.connectRoutes(routes_1.routesMap, {
    querySerializer: query_string_1["default"],
    initialDispatch: false,
    scrollTop: true
}), routerMiddleWare = _b.middleware, routerEnhancer = _b.enhancer, initialDispatch = _b.initialDispatch, location = _b.reducer;
exports.store = toolkit_1.configureStore({
    reducer: (_a = {
            location: location,
            auth: authSlice_1["default"],
            modal: modalSlice_1["default"],
            player: playerSlice_1["default"]
        },
        _a[auth_1.authApi.reducerPath] = auth_1.authApi.reducer,
        _a[projects_1.projectApi.reducerPath] = projects_1.projectApi.reducer,
        _a),
    middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: false
        }).concat(auth_1.authApi.middleware, routerMiddleWare);
    },
    enhancers: function (defaultEnhancers) { return defaultEnhancers.concat(routerEnhancer); }
});
initialDispatch();
