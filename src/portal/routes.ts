import loadable from "@loadable/component";
import { RouteMeta } from "libs/location/routing";

import * as routeActions from "./state/location/actions";
import * as sharedRouteActions from "libs/location/sharedRouteActions";
import * as paths from "./state/location/paths";
const Path = loadable(() => import("./scenes/Paths"));
const Profile = loadable(() => import("./scenes/Profile"));
const CoursePlayer = loadable(() => import("./scenes/CoursePlayer"));
const CourseManage = loadable(
  () => import("./scenes/Instructor/Courses/manageCourse")
);
const CreateCourse = loadable(
  () => import("./scenes/Instructor/Courses/createCourse")
);
const Dashboard = loadable(() => import("./scenes/Instructor/Dashboard"));
const Courses = loadable(() => import("./scenes/Instructor/Dashboard/Courses"));
const Communication = loadable(
  () => import("./scenes/Instructor/Dashboard/Communication")
);
const Messages = loadable(
  () => import("./scenes/Instructor/Dashboard/Communication/messages")
);
const Announcements = loadable(
  () => import("./scenes/Instructor/Dashboard/Communication/announcements")
);
const Assignments = loadable(
  () => import("./scenes/Instructor/Dashboard/Communication/assignments")
);
const QandA = loadable(
  () => import("./scenes/Instructor/Dashboard/Communication/QandA")
);
const Overview = loadable(
  () => import("./scenes/Instructor/Dashboard/Performance/Overview")
);
const Engagement = loadable(
  () => import("./scenes/Instructor/Dashboard/Performance/Engagement")
);
const Students = loadable(
  () => import("./scenes/Instructor/Dashboard/Performance/Students")
);
const Reviews = loadable(
  () => import("./scenes/Instructor/Dashboard/Performance/Reviews")
);
const Traffic = loadable(
  () => import("./scenes/Instructor/Dashboard/Performance/Traffic")
);
const courseGoals = loadable(
  () => import("./scenes/Instructor/Courses/Target")
);
const courseLanding = loadable(
  () => import("./scenes/Instructor/Courses/Landing/LandingPage")
);
const coursePricing = loadable(
  () => import("./scenes/Instructor/Courses/Pricing")
);
const courseMessages = loadable(
  () => import("./scenes/Instructor/Courses/Messages")
);

const ComposeMessage = loadable(
  () => import("./scenes/Instructor/Dashboard/Communication/messages/compose")
);

const MessagingCompose = loadable(
  () => import("./scenes/Profile/Messaging/newMessage")
);
const courseCurriculum = loadable(
  () => import("./scenes/Instructor/Courses/Curriculum")
);
const Settings = loadable(() => import("./scenes/Instructor/Courses/Settings"));
const ProjectSettings = loadable(() => import("./scenes/Instructor/Projects/Settings"))
const PayoutSettings = loadable(
  () => import("./scenes/Instructor/Dashboard/Payout")
);
const InstructorProfile = loadable(
  () => import("./scenes/Instructor/Dashboard/Profile")
);

const Projects = loadable(() => import("portal/scenes/Projects"));
const ProjectsDetail = loadable(() => import("portal/scenes/Projects/ProjectDetail"));
const CourseDetail = loadable(() => import("portal/scenes/Courses/Detail"));

const ProjectManage = loadable(
  () => import("./scenes/Instructor/Projects/manageProject")
);
const CreateProject = loadable(
  () => import("./scenes/Instructor/Projects/createProject")
);
const ProjectLanding = loadable(
  () => import("./scenes/Instructor/Projects/Landing")
);
const ProjectPricing = loadable(
  () => import("./scenes/Instructor/Projects/Pricing")
);
const ProjectTarget = loadable(
  () => import("./scenes/Instructor/Projects/Target")
);
const Learner = loadable(() => import("./scenes/Profile/Learn"));
const Messaging = loadable(() => import("./scenes/Profile/Messaging"))
const Privacy = loadable(() => import('./scenes/Privacy/Privacy'))
const Error404 = loadable(() => import("portal/scenes/Error404"));
// const Error500 = loadable(() => import('portal/scenes/Error500'));

export const routesMap = {
  [`${routeActions.path}`]: "/",
  [`${routeActions.profile}`]: "/profiles/:id",
  [`${routeActions.coursePlayer}`]: "/course-player/:id",
  [`${routeActions.courseCreate}`]: "/course/create/",
  [`${routeActions.projectCreate}`]: "/project/create/",
  [`${routeActions.projects}`]: "/projects",
  [`${routeActions.projectDetail}`]: "/projects/:slug",
  [`${routeActions.messaging}`]: "/messages",
  [`${routeActions.messageCompose}`]: "/message/compose",
  [`${routeActions.messageThreads}`]: "/messages/thread/:id",
  [`${routeActions.courseDetail}`]: "/courses/:slug",
  [`${routeActions.courseManage}`]: "/instructor/course/:id/manage/:slug",
  [`${routeActions.projectManage}`]: "/instructor/project/:id/manage/:slug",
  [`${routeActions.tutorDashboard}`]: "/instructor/courses",
  [`${routeActions.learnerStory}`]: "/learn/",
  [`${routeActions.dashboardItems}`]: "/instructor/:dashboard/:slug",
  [`${sharedRouteActions.error404}`]: "/errors/404",
  [`${routeActions.privacy}`]: "/privacy-policy",
};

export const routesMeta: Record<string, RouteMeta> = {
  [`${routeActions.path}`]: {
    scene: Path,
    pageName: "paths",
  },
  [`${routeActions.projects}`]: {
    scene: Projects,
    pageName: "projects",
  },

  [`${routeActions.projectDetail}`]: {
    scene: ProjectsDetail,
    pageName: "project_detail",
  },

  [`${routeActions.profile}`]: {
    scene: Profile,
    pageName: undefined,
  },
  [`${routeActions.courseDetail}`]: {
    scene: CourseDetail,
    pageName: undefined,
  },

  [`${routeActions.courseCreate}`]: {
    scene: CreateCourse,
    pageName: undefined,
  },
  [`${routeActions.projectCreate}`]: {
    scene: CreateProject,
    pageName: undefined,
  },

  [`${routeActions.projectManage}`]: {
    scene: ProjectManage,
    pageName: undefined,
  },

  [`${routeActions.coursePlayer}`]: {
    scene: CoursePlayer,
    pageName: undefined,
  },

  [`${routeActions.courseManage}`]: {
    scene: CourseManage,
    pageName: undefined,
  },

  [`${routeActions.tutorDashboard}`]: {
    scene: Dashboard,
    pageName: undefined,
  },

  [`${routeActions.dashboardItems}`]: {
    scene: Dashboard,
    pageName: undefined,
  },
  [`${sharedRouteActions.error404}`]: {
    scene: Error404,
    pageName: "error_404",
  },

  [`${routeActions.learnerStory}`]: {
    scene: Learner,
    pageName: undefined,
  },

  [`${routeActions.privacy}`]: {
    scene: Privacy,
    pageName: undefined,
  },

  [`${routeActions.messaging}`]: {
    scene: Messaging,
    pageName: undefined,
  },
  [`${routeActions.messageThreads}`]: {
    scene: Messaging,
    pageName: undefined,
  },
  [`${routeActions.messageCompose}`]: {
    scene: MessagingCompose,
    pageName: undefined,
  },
};

export const routesCommunication: Record<string, RouteMeta> = {
  [`${paths.Courses}`]: {
    scene: Dashboard,
    pageName: undefined,
  },
  [`${paths.Announcements}`]: {
    scene: Communication,
    pageName: undefined,
  },

  [`${paths.newMessage}`]: {
    scene: Communication,
    pageName: undefined,
  },

  [`${paths.Assignments}`]: {
    scene: Communication,
    pageName: undefined,
  },

  [`${paths.Messages}`]: {
    scene: Communication,
    pageName: undefined,
  },

  [`${paths.Qa}`]: {
    scene: Communication,
    pageName: undefined,
  },
};

export const routesDashboard: Record<string, RouteMeta> = {
  [`${paths.Courses}`]: {
    scene: Courses,
    pageName: undefined,
  },

  [`${paths.Assignments}`]: {
    scene: Assignments,
    pageName: undefined,
  },

  [`${paths.Messages}`]: {
    scene: Messages,
    pageName: undefined,
  },

  [`${paths.newMessage}`]: {
    scene: ComposeMessage,
    pageName: undefined,
  },

  [`${paths.Qa}`]: {
    scene: QandA,
    pageName: undefined,
  },
  [`${paths.Announcements}`]: {
    scene: Announcements,
    pageName: undefined,
  },
  [`${paths.Overview}`]: {
    scene: Overview,
    pageName: undefined,
  },
  [`${paths.Reviews}`]: {
    scene: Reviews,
    pageName: undefined,
  },
  [`${paths.Students}`]: {
    scene: Students,
    pageName: undefined,
  },
  [`${paths.Engagement}`]: {
    scene: Engagement,
    pageName: undefined,
  },
  [`${paths.Traffic}`]: {
    scene: Traffic,
    pageName: undefined,
  },
  [`${paths.InstructorInfo}`]: {
    scene: PayoutSettings,
    pageName: undefined,
  },
  [`${paths.InstructorProfile}`]: {
    scene: InstructorProfile,
    pageName: undefined,
  },
};

export const routesManageCourse: Record<string, RouteMeta> = {
  [`${paths.courseGoals}`]: {
    scene: courseGoals,
    pageName: undefined,
  },

  [`${paths.courseCurriculum}`]: {
    scene: courseCurriculum,
    pageName: undefined,
  },

  [`${paths.courseMessages}`]: {
    scene: courseMessages,
    pageName: undefined,
  },

  [`${paths.courseLandig}`]: {
    scene: courseLanding,
    pageName: undefined,
  },
  [`${paths.coursePricing}`]: {
    scene: coursePricing,
    pageName: undefined,
  },

  [`${paths.courseSettings}`]: {
    scene: Settings,
    pageName: undefined,
  },
};

export const routesManageProject: Record<string, RouteMeta> = {
  [`${paths.projectLandig}`]: {
    scene: ProjectLanding,
    pageName: undefined,
  },

  [`${paths.projectPricing}`]: {
    scene: ProjectPricing,
    pageName: undefined,
  },

  [`${paths.projectTargets}`]: {
    scene: ProjectTarget,
    pageName: undefined,
  },

  [`${paths.projectSettings}`]: {
    scene: ProjectSettings,
    pageName: undefined,
  },
};
