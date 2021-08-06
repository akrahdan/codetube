"use strict";

exports.__esModule = true;
exports.useSignupMutation = exports.useLoginMutation = exports.authApi = void 0;

var react_1 = require("@reduxjs/toolkit/query/react");

var react_cookies_1 = require("react-cookies");

exports.authApi = react_1.createApi({
  baseQuery: react_1.fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: function prepareHeaders(headers) {
      var csrfToken = react_cookies_1["default"].load("csrftoken");

      if (csrfToken) {
        headers.set("X-CSRFToken", csrfToken);
      }

      headers.set("Content-Type", "application/x-www-form-urlencoded");
      return headers;
    }
  }),
  tagTypes: ["Login", "Signup"],
  endpoints: function endpoints(build) {
    return {
      login: build.mutation({
        query: function query(body) {
          return {
            url: "accounts/login/",
            method: "POST",
            body: body,
            responseHandler: function responseHandler(response) {
              return response.json();
            }
          };
        }
      }),
      signup: build.mutation({
        query: function query(body) {
          return {
            url: "accounts/signup/",
            method: "POST",
            body: body,
            responseHandler: function responseHandler(response) {
              return response.json();
            }
          };
        }
      })
    };
  }
});
exports.useLoginMutation = exports.authApi.useLoginMutation, exports.useSignupMutation = exports.authApi.useSignupMutation;