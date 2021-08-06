"use strict";
exports.__esModule = true;
exports.CoursesSection = void 0;
var gamut_1 = require("@codecademy/gamut");
var gamut_labs_1 = require("@codecademy/gamut-labs");
var react_1 = require("react");
var urlHelpers_1 = require("libs/urlHelpers");
var allCourses_1 = require("./allCourses");
var EnrollmentCard_1 = require("./EnrollmentCard");
var EnrollmentLoadingCard_1 = require("./EnrollmentLoadingCard");
var isLoading = false;
exports.CoursesSection = function (_a) {
    var isCurrentUser = _a.isCurrentUser, enrollments = _a.enrollments;
    var isEmpty = (allCourses_1.allCourses === null || allCourses_1.allCourses === void 0 ? void 0 : allCourses_1.allCourses.length) === 0;
    var loadingCardsToDisplay = enrollments.length > 3 ? enrollments.slice(0, 3) : enrollments;
    var renderEmptyMessage = function () { return (react_1["default"].createElement(gamut_1.Text, null,
        react_1["default"].createElement(gamut_1.Anchor, { href: urlHelpers_1.catalogPath, onClick: function () { return console.log(); }, variant: "standard" }, "Browse our catalog"),
        ' ',
        "to start a course now")); };
    var renderContent = function () {
        return isEmpty
            ? renderEmptyMessage()
            : allCourses_1.allCourses === null || allCourses_1.allCourses === void 0 ? void 0 : allCourses_1.allCourses.map(function (course) { return (react_1["default"].createElement(EnrollmentCard_1.EnrollmentCard, { key: course.id, id: course.id, onEnrollmentClick: function (value) { return console.log(); } })); });
    };
    var renderLoadingState = function () {
        return loadingCardsToDisplay.map(function (enrollment) { return (react_1["default"].createElement(EnrollmentLoadingCard_1.EnrollmentLoadingCard, { key: "enrollment-loading-card-" + enrollment.id })); });
    };
    if (!isCurrentUser && isEmpty)
        return null;
    return (react_1["default"].createElement(gamut_labs_1.ListSection, { title: "Latest Courses", onShowAllOrLessClick: function () { return console.log(); } }, isLoading ? renderLoadingState() : renderContent()));
};
