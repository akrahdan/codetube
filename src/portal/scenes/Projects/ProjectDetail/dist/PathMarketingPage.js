"use strict";
exports.__esModule = true;
exports.PathMarketingPage = void 0;
var react_1 = require("react");
var react_helmet_1 = require("react-helmet");
var react_schemaorg_1 = require("react-schemaorg");
var index_module_scss_1 = require("./styles/index.module.scss");
var Header_1 = require("./Header");
var Supporting_1 = require("./Supporting");
var Projects_1 = require("./Projects");
var Syllabus_1 = require("./Syllabus");
var CTASection_1 = require("./CTASection");
var Recommendations_1 = require("./Recommendations");
var SignupSection_1 = require("portal/scenes/SignupSection");
var SigninSection_1 = require("portal/scenes/SignupSection/SigninSection");
var SignupModal_1 = require("portal/scenes/Modal/SignupModal");
var modalSlice_1 = require("state/modals/modalSlice");
var hooks_1 = require("store/hooks");
var projects_1 = require("services/projects");
var UpdateModal_1 = require("portal/scenes/Profile/UpdateModal");
exports.PathMarketingPage = function (_a) {
    var isAnonymous = _a.isAnonymous, isPaidLanding = _a.isPaidLanding, showTrialCTA = _a.showTrialCTA;
    var modal = hooks_1.useAppSelector(modalSlice_1.selectModal);
    var projects = projects_1.useFetchProjectsQuery().data;
    console.log("Projects: ", projects);
    var leadProject = projects && projects.find(function (element) { return element.lead == true; });
    var ctaCallback = function () {
        return;
    };
    var completionTime = "24hrs";
    if (!leadProject)
        return null;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("main", { className: index_module_scss_1["default"].page, "data-testid": "path-marketing-page" },
            react_1["default"].createElement(react_helmet_1.Helmet, { script: [
                    react_schemaorg_1.helmetJsonLdProp({
                        '@context': 'https://schema.org',
                        '@type': 'Course',
                        // name: path?.title,
                        // description: path?.short_description,
                        provider: {
                            '@type': 'Organization',
                            name: 'Codecademy',
                            sameAs: 'https://www.codecademy.com/'
                        },
                        educationalCredentialAwarded: 'Codecademy Certificate',
                        timeRequired: completionTime,
                        isAccessibleForFree: false
                    }),
                ] }),
            react_1["default"].createElement(Header_1.Header, { project: leadProject, ctaCallback: ctaCallback, isPaidLanding: isPaidLanding, showTrialCTA: showTrialCTA, useContentfulCTA: true, isAnonymous: isAnonymous }),
            react_1["default"].createElement(Supporting_1.Supporting, { project: leadProject }),
            react_1["default"].createElement(Projects_1.Projects, { courses: leadProject.courses }),
            react_1["default"].createElement(Syllabus_1.Syllabus, { pathId: leadProject.id, tracks: leadProject.syllabuses, ctaCallback: ctaCallback, isPaidLanding: isPaidLanding, showTrialCTA: false, useContentfulCTA: false }),
            react_1["default"].createElement(CTASection_1.CTASection, { pathId: leadProject.id, ctaCallback: ctaCallback }),
            react_1["default"].createElement(Recommendations_1.Recommendations, { related: leadProject.related, pathId: leadProject.id })),
        modal == 'signup' && react_1["default"].createElement(SignupModal_1.SignupModal, { onClose: true },
            react_1["default"].createElement(SignupSection_1.SignupSection, null)),
        modal == 'login' && react_1["default"].createElement(SignupModal_1.SignupModal, null,
            react_1["default"].createElement(SigninSection_1.SiginSection, null)),
        react_1["default"].createElement(SignupModal_1.SignupModal, null,
            react_1["default"].createElement(UpdateModal_1.UpdateModal, null))));
};
