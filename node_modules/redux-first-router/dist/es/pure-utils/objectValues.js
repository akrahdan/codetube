

export default (function (routes) {
  return Object.keys(routes).map(function (key) {
    return routes[key];
  });
});