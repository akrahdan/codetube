"use strict";
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
exports.useCheckoutMutation = exports.useCartUpdateMutation = exports.useFetchProjectQuery = exports.useSubmitReviewMutation = exports.useUpdateProjectMutation = exports.useLazyFetchSyllabusQuery = exports.useLazyFetchProjectsQuery = exports.useLazyFetchOutcomesQuery = exports.useLazyFetchIncludedQuery = exports.useFetchSyllabusQuery = exports.useFetchOutcomesQuery = exports.useFetchIncludedQuery = exports.useEditSyllabusMutation = exports.useEditLearningOutcomeMutation = exports.useEditIncludedMutation = exports.useEditHeadingMutation = exports.useDeleteSyllabusMutation = exports.useDeleteOutcomeMutation = exports.useDeleteIncludedMutation = exports.useDeleteHeadingMutation = exports.useCreateSyllabusMutation = exports.useCreateProjectMutation = exports.useCreatePricingMutation = exports.useCreateLearningOutcomeMutation = exports.useCreateIncludedMutation = exports.useCreateHeadingMutation = exports.useFetchProjectsQuery = exports.projectApi = void 0;
var react_1 = require("@reduxjs/toolkit/query/react");
var react_cookies_1 = require("react-cookies");
exports.projectApi = react_1.createApi({
    reducerPath: "projectApi",
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
    tagTypes: ["ProjectEntityResponse"],
    endpoints: function (build) { return ({
        fetchProjects: build.query({
            query: function () { return ({
                url: "api/projects/",
                method: "GET",
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        fetchProject: build.query({
            query: function (id) { return ({
                url: "/projects/" + id,
                method: "GET",
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        createProject: build.mutation({
            query: function (body) { return ({
                url: "/projects/create/",
                method: "POST",
                body: body,
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        updateProject: build.mutation({
            query: function (data) {
                var id = data.id, body = __rest(data, ["id"]);
                return {
                    url: "/projects/" + id + "/edit/",
                    method: "PUT",
                    body: body,
                    responseHandler: function (response) { return response.json(); }
                };
            }
        }),
        createPricing: build.mutation({
            query: function (body) { return ({
                url: "/projects/pricing/create/",
                body: body,
                method: "POST",
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        cartUpdate: build.mutation({
            query: function (body) { return ({
                url: "/cart/update/",
                body: body,
                method: "POST",
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        checkout: build.mutation({
            query: function (body) { return ({
                url: "/cart/checkout/",
                body: body,
                method: "POST",
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        checkoutWave: build.mutation({
            query: function (body) { return ({
                url: "/cart/checkout_wave/",
                body: body,
                method: "POST",
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        createSyllabus: build.mutation({
            query: function (body) { return ({
                url: "/projects/syllabus/create/",
                body: body,
                method: "POST",
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        createIncluded: build.mutation({
            query: function (body) { return ({
                url: "/projects/included/create/",
                body: body,
                method: "POST",
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        createLearningOutcome: build.mutation({
            query: function (body) { return ({
                url: "/projects/outcome/create/",
                body: body,
                method: "POST",
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        createHeading: build.mutation({
            query: function (body) { return ({
                url: "/projects/heading/create/",
                body: body,
                method: "POST",
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        editSyllabus: build.mutation({
            query: function (_a) {
                var id = _a.id, body = __rest(_a, ["id"]);
                return ({
                    url: "/projects/syllabus/" + id + "/",
                    body: body,
                    method: "PUT",
                    responseHandler: function (response) { return response.json(); }
                });
            }
        }),
        editIncluded: build.mutation({
            query: function (_a) {
                var id = _a.id, body = __rest(_a, ["id"]);
                return ({
                    url: "/projects/included/" + id + "/",
                    body: body,
                    method: "PUT",
                    responseHandler: function (response) { return response.json(); }
                });
            }
        }),
        editHeading: build.mutation({
            query: function (_a) {
                var id = _a.id, body = __rest(_a, ["id"]);
                return {
                    url: "/projects/heading/" + id + "/",
                    method: "PUT",
                    body: body
                };
            }
        }),
        editLearningOutcome: build.mutation({
            query: function (id) {
                var body = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    body[_i - 1] = arguments[_i];
                }
                return ({
                    url: "/projects/outcome/" + id + "/",
                    body: body,
                    method: "PUT",
                    responseHandler: function (response) { return response.json(); }
                });
            }
        }),
        submitReview: build.mutation({
            query: function (data) {
                var id = data.id, body = __rest(data, ["id"]);
                return {
                    url: "/projects/" + id + "/review/",
                    body: body,
                    method: "PUT",
                    responseHandler: function (response) { return response.json(); }
                };
            }
        }),
        fetchOutcomes: build.query({
            query: function (pk) { return ({
                url: "/projects/" + pk + "/outcomes/",
                method: "GET",
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        fetchIncluded: build.query({
            query: function (pk) { return ({
                url: "/projects/" + pk + "/included/",
                method: "GET",
                responseHandler: function (response) { return response.json(); }
            }); }
        }),
        fetchSyllabus: build.query({
            query: function (id) {
                return {
                    url: "/projects/" + id + "/syllabuses/",
                    method: "GET"
                };
            }
        }),
        deleteSyllabus: build.mutation({
            query: function (id) {
                return {
                    url: "/projects/syllabus/" + id + "/",
                    method: "DELETE"
                };
            }
        }),
        deleteHeading: build.mutation({
            query: function (id) {
                return {
                    url: "/projects/heading/" + id + "/",
                    method: "DELETE"
                };
            }
        }),
        deleteIncluded: build.mutation({
            query: function (id) {
                return {
                    url: "/projects/included/" + id + "/",
                    method: "DELETE"
                };
            }
        }),
        deleteOutcome: build.mutation({
            query: function (id) {
                return {
                    url: "/projects/outcome/" + id + "/",
                    method: "DELETE"
                };
            }
        })
    }); }
});
exports.useFetchProjectsQuery = exports.projectApi.useFetchProjectsQuery, exports.useCreateHeadingMutation = exports.projectApi.useCreateHeadingMutation, exports.useCreateIncludedMutation = exports.projectApi.useCreateIncludedMutation, exports.useCreateLearningOutcomeMutation = exports.projectApi.useCreateLearningOutcomeMutation, exports.useCreatePricingMutation = exports.projectApi.useCreatePricingMutation, exports.useCreateProjectMutation = exports.projectApi.useCreateProjectMutation, exports.useCreateSyllabusMutation = exports.projectApi.useCreateSyllabusMutation, exports.useDeleteHeadingMutation = exports.projectApi.useDeleteHeadingMutation, exports.useDeleteIncludedMutation = exports.projectApi.useDeleteIncludedMutation, exports.useDeleteOutcomeMutation = exports.projectApi.useDeleteOutcomeMutation, exports.useDeleteSyllabusMutation = exports.projectApi.useDeleteSyllabusMutation, exports.useEditHeadingMutation = exports.projectApi.useEditHeadingMutation, exports.useEditIncludedMutation = exports.projectApi.useEditIncludedMutation, exports.useEditLearningOutcomeMutation = exports.projectApi.useEditLearningOutcomeMutation, exports.useEditSyllabusMutation = exports.projectApi.useEditSyllabusMutation, exports.useFetchIncludedQuery = exports.projectApi.useFetchIncludedQuery, exports.useFetchOutcomesQuery = exports.projectApi.useFetchOutcomesQuery, exports.useFetchSyllabusQuery = exports.projectApi.useFetchSyllabusQuery, exports.useLazyFetchIncludedQuery = exports.projectApi.useLazyFetchIncludedQuery, exports.useLazyFetchOutcomesQuery = exports.projectApi.useLazyFetchOutcomesQuery, exports.useLazyFetchProjectsQuery = exports.projectApi.useLazyFetchProjectsQuery, exports.useLazyFetchSyllabusQuery = exports.projectApi.useLazyFetchSyllabusQuery, exports.useUpdateProjectMutation = exports.projectApi.useUpdateProjectMutation, exports.useSubmitReviewMutation = exports.projectApi.useSubmitReviewMutation, exports.useFetchProjectQuery = exports.projectApi.useFetchProjectQuery, exports.useCartUpdateMutation = exports.projectApi.useCartUpdateMutation, exports.useCheckoutMutation = exports.projectApi.useCheckoutMutation;
