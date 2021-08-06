"use strict";
exports.__esModule = true;
exports.Projects = void 0;
var gamut_1 = require("@codecademy/gamut");
var lodash_1 = require("lodash");
var react_1 = require("react");
var ProjectCard_1 = require("components/ProjectCard");
// import { trackUserClick } from '~/libs/eventTracking';
var ContentfulContext_1 = require("portal/scenes/Paths/ContentfulContext");
var sample_1 = require("./sample");
var HalfCircle_1 = require("./icons/HalfCircle");
var styles_module_scss_1 = require("./styles.module.scss");
var byProject = function (item) {
    return item.type === 'project';
};
var byVideo = function (item) {
    return item.type === 'video';
};
exports.Projects = function (_a) {
    var courses = _a.courses;
    var _b = react_1.useContext(ContentfulContext_1["default"]), contentIds = _b.content_item_ids, sideShapesColor = _b.side_shapes_color, projectsHeadline = _b.projects_headline, videoHeadline = _b.video_headline;
    var _c = react_1.useState([]), contentItems = _c[0], setContentItems = _c[1];
    // const jwt = useSelector(selectUserJWT);
    // useEffect(() => {
    //   (async () => {
    //     if (contentIds) {
    //       const { data } = await contentServiceRequest({
    //         endpoint: 'content-items/search',
    //         version: 1,
    //         data: {
    //           id: contentIds,
    //           minimal: false,
    //         },
    //         method: 'POST',
    //         jwt,
    //       });
    //       setContentItems(data);
    //     }
    //   })();
    // }, [contentIds, jwt]);
    // const renderProjects = () =>
    //   contentItems
    //     .filter(byProject)
    //     .map((project: ProjectContentItem, index: number) => (
    //       <ProjectCard
    //         project={project}
    //         index={index}
    //         key={project.id}
    //         className={styles.projectCard}
    //         trackingData={{ target: 'path_marketing_page_projects' }}
    //         hoverShadow
    //       />
    //     ));
    var renderProjects = function () {
        return courses
            .map(function (course, index) { return (react_1["default"].createElement(ProjectCard_1.ProjectCard, { project: course, index: index, key: course.id, className: styles_module_scss_1["default"].projectCard, trackingData: { target: 'path_marketing_page_projects' }, hoverShadow: true })); });
    };
    // const renderVideos = () =>
    //   contentItems.filter(byVideo).map((video: VideoContentItem) => (
    //     <div key={video.id} style={{ width: '100%' }}>
    //       <Video
    //         videoUrl={video.video_url}
    //         videoTitle={video.title}
    //         className={styles.video}
    //         onPlay={() =>
    //           // trackUserClick({
    //           //   page_name: 'marketingpathlandingpage',
    //           //   context: 'projects_section',
    //           //   target: 'play_video',
    //           //   video_url: video.video_url,
    //           // })
    //         console.log()}
    //       />
    //       <p className={styles.videoTitle}>{video.title}</p>
    //     </div>
    //   ));
    var renderVideos = function () {
        return sample_1.Items.map(function (video) { return (react_1["default"].createElement("div", { key: video.id, style: { width: '100%' } },
            react_1["default"].createElement(gamut_1.Video, { videoUrl: video.video_url, videoTitle: video.title, className: styles_module_scss_1["default"].video, onPlay: function () {
                    // trackUserClick({
                    //   page_name: 'marketingpathlandingpage',
                    //   context: 'projects_section',
                    //   target: 'play_video',
                    //   video_url: video.video_url,
                    // })
                    return console.log();
                } }),
            react_1["default"].createElement("p", { className: styles_module_scss_1["default"].videoTitle }, video.title))); });
    };
    var projects = renderProjects();
    var video = renderVideos();
    if (lodash_1.isEmpty(projects) && lodash_1.isEmpty(video))
        return null;
    return (react_1["default"].createElement("div", { className: styles_module_scss_1["default"].container },
        react_1["default"].createElement("div", { className: styles_module_scss_1["default"].backgroundHalfCircle },
            react_1["default"].createElement(HalfCircle_1.HalfCircle, { fill: sideShapesColor !== null && sideShapesColor !== void 0 ? sideShapesColor : '#C8D7FA' })),
        react_1["default"].createElement(gamut_1.ContentContainer, null,
            react_1["default"].createElement("div", { className: styles_module_scss_1["default"].contentItemsContainer }, !lodash_1.isEmpty(projects) && (react_1["default"].createElement("div", { className: styles_module_scss_1["default"].projectContainer },
                react_1["default"].createElement("h2", null, projectsHeadline || 'Courses That Are Included'),
                react_1["default"].createElement("div", { className: styles_module_scss_1["default"].displayHorizontal }, projects)))))));
};
