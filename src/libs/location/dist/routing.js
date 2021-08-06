"use strict";
exports.__esModule = true;
exports.getRouteMetaForLocation = void 0;
exports.getRouteMetaForLocation = function (routesMeta, locationType) {
    var route = (function () {
        // switch (statusCode) {
        //   case 404:
        //     return routesMeta[`${sharedRouteActions.error404}`];
        //   case 500:
        //     return routesMeta[`${sharedRouteActions.error500}`];
        // }
        return routesMeta[locationType];
    })();
    if (!route) {
        throw new Error("Could not find equivalent route for '" + locationType + "'.");
    }
    return route;
};
