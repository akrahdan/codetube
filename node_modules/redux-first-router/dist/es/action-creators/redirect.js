
import setKind from '../pure-utils/setKind';


export default (function (action, type, payload) {
  action = setKind(action, 'redirect');

  if (type) {
    action.type = type;
  }

  if (payload) {
    action.payload = payload;
  }

  return action;
});