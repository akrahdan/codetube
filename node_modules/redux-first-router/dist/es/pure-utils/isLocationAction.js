

export default (function (action) {
  return !!(action.meta && action.meta.location && action.meta.location.current);
});