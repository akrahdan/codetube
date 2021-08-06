import { ADD_ROUTES } from '../index';


export default (function (routes) {
  return function (dispatch) {
    return dispatch({ type: ADD_ROUTES, payload: { routes: routes } });
  };
});