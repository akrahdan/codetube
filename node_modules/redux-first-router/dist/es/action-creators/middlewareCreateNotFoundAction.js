
import nestAction from '../pure-utils/nestAction';

import { NOT_FOUND } from '../index';

export default (function (action, location, prevLocation, history, notFoundPath) {
  var payload = action.payload;


  var meta = action.meta;
  var prevPath = location.pathname;

  var kind = meta && meta.location && meta.location.kind || // use case: kind === 'redirect'
  location.kind === 'load' && 'load' || 'push';

  var pathname = meta && meta.notFoundPath || kind === 'redirect' && notFoundPath || prevPath || '/';

  return nestAction(pathname, { type: NOT_FOUND, payload: payload }, prevLocation, history, kind);
});