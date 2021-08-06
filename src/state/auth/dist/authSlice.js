"use strict";
exports.__esModule = true;
exports.selectCurrentUser = exports.setCredentials = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var auth_1 = require("services/auth");
var initialState = { user: null, token: null };
var authSlice = toolkit_1.createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setCredentials: function (state, _a) {
            var _b = _a.payload, user = _b.user, token = _b.token;
            state.user = user;
            state.token = token;
        }
    },
    extraReducers: function (builder) {
        builder
            .addMatcher(auth_1.authApi.endpoints.logout.matchFulfilled, function (state, _a) {
            var payload = _a.payload;
            state.user = null;
            state.token = null;
        })
            .addMatcher(auth_1.authApi.endpoints.signup.matchFulfilled, function (state, _a) {
            var payload = _a.payload;
            state.user = payload.user;
            state.token = payload.token;
        });
    }
});
exports.setCredentials = authSlice.actions.setCredentials;
exports["default"] = authSlice.reducer;
exports.selectCurrentUser = function (state) { return state.auth.user; };
