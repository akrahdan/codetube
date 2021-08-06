"use strict";
exports.__esModule = true;
exports.referrals = exports.signUp = exports.login = exports.unpausePro = exports.upgradeToPro = exports.tryProForFree = exports.proProfile = exports.freeProfile = exports.notifications = exports.forBusiness = exports.pricingDropdown = exports.communityDropdown = exports.resourcesDropdown = exports.liveClasses = exports.projectCatalog = exports.courseCatalog = exports.myHome = exports.proLogo = exports.logo = void 0;
var gamut_icons_1 = require("@codecademy/gamut-icons");
exports.logo = {
    dataTestId: 'header-logo',
    id: 'logo',
    href: '/',
    pro: false,
    trackingTarget: 'topnav_logo',
    type: 'logo'
};
exports.proLogo = {
    dataTestId: 'header-pro-logo',
    href: '/',
    id: 'pro-logo',
    pro: true,
    trackingTarget: 'topnav_logo',
    type: 'logo'
};
exports.myHome = {
    dataTestId: 'header-home',
    icon: gamut_icons_1.HouseEntranceIcon,
    id: 'my-home',
    text: 'My Home',
    href: '/learn',
    trackingTarget: 'topnav_home',
    type: 'link'
};
exports.courseCatalog = {
    dataTestId: 'header-catalog',
    icon: gamut_icons_1.BookFlipPageIcon,
    id: 'course-catalog',
    text: 'Courses',
    href: '/courses',
    trackingTarget: 'topnav_catalog',
    type: 'link'
};
exports.projectCatalog = {
    dataTestId: 'header-project',
    icon: gamut_icons_1.BookFlipPageIcon,
    id: 'project-catalog',
    text: 'Projects',
    href: '/projects',
    trackingTarget: 'topnav_projects',
    type: 'link'
};
exports.liveClasses = {
    dataTestId: 'header-project',
    icon: gamut_icons_1.BookFlipPageIcon,
    id: 'live-classes',
    text: 'Live Classes',
    href: '/classes',
    trackingTarget: 'topnav_classes',
    type: 'link'
};
exports.resourcesDropdown = {
    icon: gamut_icons_1.NotebookIcon,
    id: 'resources',
    text: 'Resources',
    popover: [
        {
            id: 'cheatsheets',
            href: '/resources/cheatsheets/all',
            trackingTarget: 'topnav_resources_cheatsheets',
            text: 'Cheatsheets',
            type: 'link'
        },
        {
            id: 'projects',
            href: '/projects',
            trackingTarget: 'topnav_resources_projects',
            text: 'Projects',
            type: 'link'
        },
        {
            id: 'articles',
            href: '/articles',
            trackingTarget: 'topnav_resources_articles',
            text: 'Articles',
            type: 'link'
        },
        {
            id: 'blog',
            href: 'https://codefluent.org/resources/blog',
            newTab: true,
            trackingTarget: 'topnav_resources_blog',
            text: 'Blog',
            type: 'link'
        },
    ],
    trackingTarget: 'topnav_resources',
    type: 'dropdown'
};
exports.communityDropdown = {
    icon: gamut_icons_1.CommunityIcon,
    id: 'community',
    text: 'Community',
    popover: [
        {
            id: 'forums',
            href: 'https://discuss.codecademy.com/',
            trackingTarget: 'topnav_community_forums',
            newTab: true,
            text: 'Forums',
            type: 'link'
        },
        {
            id: 'chat',
            href: 'https://discord.com/invite/codecademy',
            newTab: true,
            trackingTarget: 'topnav_chat',
            text: 'Chat',
            type: 'link'
        },
        {
            id: 'chapters',
            href: 'https://community.codecademy.com/',
            newTab: true,
            trackingTarget: 'topnav_community_chapters',
            text: 'Chapters',
            type: 'link'
        },
        {
            id: 'events',
            href: '/events',
            trackingTarget: 'topnav_community_events',
            text: 'Events',
            type: 'link'
        },
    ],
    trackingTarget: 'topnav_community',
    type: 'dropdown'
};
exports.pricingDropdown = {
    icon: gamut_icons_1.AccountingCoinsIcon,
    id: 'pricing',
    text: 'Pro Pricing',
    popover: [
        {
            id: 'pro-membership',
            href: '/pricing',
            trackingTarget: 'topnav_pro_membership',
            text: 'For Individuals',
            type: 'link'
        },
        {
            id: 'for-students',
            href: '/student-center',
            trackingTarget: 'topnav_pricing_students',
            text: 'For Students',
            type: 'link'
        },
    ],
    trackingTarget: 'topnav_pricing',
    type: 'dropdown'
};
exports.forBusiness = {
    icon: gamut_icons_1.BriefcaseIcon,
    id: 'for-business',
    trackingTarget: 'topnav_business',
    text: 'For Business',
    href: '/business',
    type: 'link'
};
exports.notifications = function (renderNotifications) {
    return {
        id: 'notifications',
        renderElement: renderNotifications,
        type: 'render-element'
    };
};
var profileMyProfile = {
    id: 'my-profile',
    icon: gamut_icons_1.PersonIcon,
    href: '/profiles/me',
    trackingTarget: 'avatar_my_profile',
    text: 'Profile',
    type: 'link'
};
var profileAccount = {
    id: 'account',
    icon: gamut_icons_1.GearIcon,
    href: '/account',
    trackingTarget: 'avatar_settings',
    text: 'Account + Billing',
    type: 'link'
};
var profileMyHome = {
    id: 'my-home',
    icon: gamut_icons_1.HouseEntranceIcon,
    href: '/learn',
    trackingTarget: 'avatar_dashboard',
    text: 'My Home',
    type: 'link'
};
var profileBusinessAccount = {
    id: 'business',
    icon: gamut_icons_1.PieLineGraphIcon,
    href: '/business/plans',
    trackingTarget: 'avatar_business',
    text: 'Business Account Management',
    type: 'link'
};
var profileHelpCenter = {
    id: 'help-center',
    icon: gamut_icons_1.SupportIcon,
    href: '/help',
    newTab: true,
    trackingTarget: 'avatar_help',
    text: 'Help Center',
    type: 'link'
};
var profileAdmin = {
    id: 'admin',
    dataTestId: 'admin-link',
    href: '/admin',
    trackingTarget: 'avatar_admin',
    text: 'Admin',
    type: 'link'
};
var profileCustomerSupport = {
    id: 'customer-support',
    href: '/admin/concessions',
    trackingTarget: 'avatar_customer_support',
    text: 'Customer Support',
    type: 'link'
};
var profileReportBug = {
    id: 'report-bug',
    href: 'https://codefluent.atlassian.net/servicedesk/customer/portal/9',
    newTab: true,
    trackingTarget: 'avatar_report_bug',
    text: 'Report a Bug [ADMIN]',
    type: 'link'
};
var profileLogOut = {
    id: 'log-out',
    trackingTarget: 'avatar_log_out',
    text: 'Log Out',
    type: 'link'
};
exports.freeProfile = function (user, isMobile) {
    var topSection = [profileMyProfile, profileAccount, profileMyHome];
    if (!isMobile && user.isAccountManager) {
        topSection.push(profileBusinessAccount);
    }
    topSection.push(profileHelpCenter);
    var bottomSection = [profileLogOut];
    var popover = [topSection, bottomSection];
    return {
        avatar: user.avatar,
        userDisplayName: user.displayName,
        id: 'profile',
        text: 'Profile',
        popover: popover,
        trackingTarget: 'topnav_profile',
        type: 'profile-dropdown'
    };
};
exports.proProfile = function (user, isMobile) {
    var topSection = [profileMyProfile, profileAccount, profileMyHome];
    if (!isMobile && (user.isAccountManager || user.isAdmin)) {
        topSection.push(profileBusinessAccount);
    }
    if (user.showReferrals) {
        topSection.push(exports.referrals);
    }
    topSection.push(profileHelpCenter);
    var middleSection = [];
    if (user.isAdmin) {
        middleSection.push(profileAdmin);
    }
    if (user.isCustomerSupport) {
        middleSection.push(profileCustomerSupport);
    }
    if (user.isAdmin) {
        middleSection.push(profileReportBug);
    }
    var bottomSection = [profileLogOut];
    var popover = [topSection, middleSection, bottomSection];
    return {
        avatar: user.avatar,
        userDisplayName: user.displayName,
        id: 'profile',
        text: 'Profile',
        popover: popover,
        trackingTarget: 'topnav_profile',
        type: 'profile-dropdown'
    };
};
exports.tryProForFree = function (checkoutUrl) { return ({
    dataTestId: 'upgrade-link',
    id: 'try-pro',
    text: 'Try Pro For Free',
    href: checkoutUrl || '/pro/membership',
    trackingTarget: 'topnav_pro_trial',
    type: 'fill-button'
}); };
exports.upgradeToPro = function (checkoutUrl) { return ({
    dataTestId: 'upgrade-link',
    id: 'upgrade-to-pro',
    text: 'Upgrade to Pro',
    href: checkoutUrl || '/pro/membership',
    trackingTarget: 'topnav_pro_upgrade',
    type: 'fill-button'
}); };
exports.unpausePro = {
    dataTestId: 'unpause-link',
    id: 'unpause-pro',
    text: 'Unpause Now',
    href: '/account/billing',
    trackingTarget: 'topnav_pro_unpause',
    type: 'fill-button'
};
exports.login = {
    dataTestId: 'header-sign-in',
    id: 'login',
    text: 'Log In',
    trackingTarget: 'topnav_login',
    type: 'text-button',
    redirect: true
};
exports.signUp = {
    dataTestId: 'header-sign-up',
    id: 'signup',
    text: 'Sign Up',
    trackingTarget: 'topnav_signup',
    type: 'fill-button',
    redirect: true
};
exports.referrals = {
    dataTestId: 'header-referrals',
    id: 'referrals',
    text: 'Give Pro, Get Pro',
    href: '/referrals',
    type: 'link',
    icon: gamut_icons_1.RatingStarGiveIcon,
    trackingTarget: 'avatar_referrals'
};
