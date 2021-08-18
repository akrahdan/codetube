"use strict";
exports.__esModule = true;
var gamut_1 = require("@codecademy/gamut");
var react_1 = require("react");
var PathCard_1 = require("components/PathCard");
var TrackLink_1 = require("components/TrackLink");
var urlHelpers_1 = require("libs/urlHelpers");
var styles_module_scss_1 = require("./styles.module.scss");
function Recommendations(props) {
    var projects = props.projects;
    return (react_1["default"].createElement(gamut_1.ContentContainer, null,
        react_1["default"].createElement(gamut_1.LayoutGrid, { className: styles_module_scss_1["default"].container, columnGap: { _: 16, sm: 32 }, rowGap: 48 },
            react_1["default"].createElement(gamut_1.Column, null,
                react_1["default"].createElement("h2", { className: styles_module_scss_1["default"].heading }, 'Upcoming Projects')),
            projects.map(function (project, index) {
                return (react_1["default"].createElement(gamut_1.Column, { size: { _: 12, sm: 6, md: 4, lg: 3 }, key: project.id, offset: { md: (index + 1) % 2 === 0 ? 0 : 3 } },
                    react_1["default"].createElement(TrackLink_1.TrackLink, { target: "/", asButton: true, to: '/', href: urlHelpers_1.choosePathPagePath(project.goal), className: styles_module_scss_1["default"].recommendationTypeLink, data: {
                            page_name: 'marketingpathlandingpage',
                            context: project.goal,
                            target: 'view_more_paths',
                            content_ids: { path_id: project.id }
                        } }, project.title),
                    react_1["default"].createElement(PathCard_1.PathCard, { project: project, trackingData: {
                            page_name: 'marketingpathlandingpage',
                            context: project.id,
                            target: 'recommendation_card',
                            content_ids: { path_id: project.id }
                        }, isFullSize: true })));
            }))));
}
exports["default"] = Recommendations;
