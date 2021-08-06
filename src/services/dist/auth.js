"use strict";
exports.__esModule = true;
exports.useGoogleLoginUrlMutation = exports.useFacebookLoginUrlMutation = exports.useGoogleLoginMutation = exports.useFacebookLoginMutation = exports.useGetCurrentUserQuery = exports.useLogoutMutation = exports.useSignupMutation = exports.useLoginMutation = exports.getCurrentUser = exports.authApi = void 0;
var react_1 = require("@reduxjs/toolkit/query/react");
var react_cookies_1 = require("react-cookies");
exports.authApi = react_1.createApi({
    reducerPath: 'authApi',
    baseQuery: react_1.fetchBaseQuery({
        baseUrl: "/",
        prepareHeaders: function (headers, _a) {
            var getState = _a.getState;
            var csrfToken = react_cookies_1["default"].load("csrftoken");
            if (csrfToken) {
                headers.set("X-CSRFToken", csrfToken);
            }
            var token = getState().auth.token || localStorage.getItem('token');
            if (token) {
                headers.set("Authorization", "Token " + token);
            }
            headers.set("Content-Type", "application/json");
            return headers;
        }
    }),
    tagTypes: ["LoginRequest", "SignupRequest", "Logout", "User", "UserResponse"],
    endpoints: function (build) { return ({
        login: build.mutation({
            query: function (body) { return ({
                url: "auth/login/",
                method: "POST",
                body: body,
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        signup: build.mutation({
            query: function (body) { return ({
                url: "auth/signup/",
                method: "POST",
                body: body,
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        logout: build.mutation({
            query: function (body) { return ({
                url: "rest-auth/logout/",
                method: "POST",
                body: body,
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        facebookLogin: build.mutation({
            query: function () { return ({
                url: "auth/facebook/",
                method: "POST",
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        googleLogin: build.mutation({
            query: function () { return ({
                url: "auth/google/",
                method: "POST",
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        googleLoginUrl: build.mutation({
            query: function () { return ({
                url: "auth/google/url",
                method: "POST",
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        facebookLoginUrl: build.mutation({
            query: function () { return ({
                url: "auth/facebook/url",
                method: "POST",
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        getCurrentUser: build.query({
            query: function () { return ({
                url: "rest-auth/user/",
                method: "GET",
                responseHandler: function (response) { return response.json(); }
            }); }
        })
    }); }
});
exports.getCurrentUser = exports.authApi.endpoints.getCurrentUser;
exports.useLoginMutation = exports.authApi.useLoginMutation, exports.useSignupMutation = exports.authApi.useSignupMutation, exports.useLogoutMutation = exports.authApi.useLogoutMutation, exports.useGetCurrentUserQuery = exports.authApi.useGetCurrentUserQuery, exports.useFacebookLoginMutation = exports.authApi.useFacebookLoginMutation, exports.useGoogleLoginMutation = exports.authApi.useGoogleLoginMutation, exports.useFacebookLoginUrlMutation = exports.authApi.useFacebookLoginUrlMutation, exports.useGoogleLoginUrlMutation = exports.authApi.useGoogleLoginUrlMutation;
