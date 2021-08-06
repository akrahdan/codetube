"use strict";
exports.__esModule = true;
exports.useFetchProjectsQuery = exports.projectApi = void 0;
var react_1 = require("@reduxjs/toolkit/query/react");
var react_cookies_1 = require("react-cookies");
exports.projectApi = react_1.createApi({
    reducerPath: 'projectApi',
    baseQuery: react_1.fetchBaseQuery({
        baseUrl: "/",
        prepareHeaders: function (headers, _a) {
            var getState = _a.getState;
            var csrfToken = react_cookies_1["default"].load("csrftoken");
            if (csrfToken) {
                headers.set("X-CSRFToken", csrfToken);
            }
            var token = getState().auth.token || localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", "Token " + token);
            }
            headers.set("Content-Type", "application/json");
            return headers;
        }
    }),
    tagTypes: ['ProjectEntityResponse'],
    endpoints: function (build) { return ({
        fetchProjects: build.query({
            query: function () { return ({
                url: 'api/projects/',
                method: "GET",
                responseHandler: function (response) { return response.json(); }
            }); }
        })
    }); }
});
exports.useFetchProjectsQuery = exports.projectApi.useFetchProjectsQuery;
