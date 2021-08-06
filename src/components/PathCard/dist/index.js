"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.PathCard = void 0;
var lodash_1 = require("lodash");
var react_1 = require("react");
var CurriculumCard_1 = require("components/CurriculumCard");
// import { trackUserImpression } from '~/libs/eventTracking';
var urlHelpers_1 = require("libs/urlHelpers");
exports.PathCard = function (_a) {
    var path = _a.path, project = _a.project, trackingData = _a.trackingData, useReduxRouter = _a.useReduxRouter, isFullSize = _a.isFullSize, dataTestId = _a.dataTestId, headingLevel = _a.headingLevel, onClick = _a.onClick;
    react_1.useEffect(function () {
        if (trackingData.page_name === 'article') {
            var page_name = trackingData.page_name, slug = trackingData.slug, target = trackingData.target;
            // trackUserImpression({ page_name, slug: slug!, target });
        }
    }, [trackingData]);
    // const tag = useSelectorWith(selectFeatureCategoryByIds, path.category_ids);
    var pathHref = urlHelpers_1.pathPagePath(project.slug);
    var linkProps = __assign({ href: pathHref, trackingData: trackingData,
        onClick: onClick }, (useReduxRouter && { routeTo: pathHref }));
    // const userEnrolledPathIds = useSelector(selectPathEnrollmentIds);
    // const userCompletedContainerIds = useSelector(selectUserCompletedContainers);
    // const progressState = userCompletedContainerIds?.[path.id]
    //   ? 'completed'
    //   : userEnrolledPathIds?.includes(path.id)
    //   ? 'inProgress'
    //   : undefined;
    var progressState = undefined;
    var difficulty = project.difficulty === 'Intermediate' ? 1 : 0;
    var scope = 'lesson';
    var scopeCount = 28;
    return (react_1["default"].createElement(CurriculumCard_1.CurriculumCard, { image: project.thumbnail_url, text: lodash_1.capitalize(project.goal) + " Path", showProLogo: true, title: project.title, tag: "React", tagColor: 'green', difficulty: 1, scope: scope, scopeCount: scopeCount, linkProps: linkProps, progressState: progressState, isFullSize: true, dataTestId: dataTestId || "path-card-" + project.slug, headingLevel: headingLevel }));
};
