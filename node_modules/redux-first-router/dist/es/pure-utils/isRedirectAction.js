

export default (function (action) {
  return !!(action && action.meta && action.meta.location && action.meta.location.kind === 'redirect');
});