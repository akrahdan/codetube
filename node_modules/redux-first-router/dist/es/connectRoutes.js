var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import createBrowserHistory from 'rudy-history/createBrowserHistory';

import createMemoryHistory from 'rudy-history/createMemoryHistory';
import { stripTrailingSlash, addLeadingSlash } from 'rudy-history/PathUtils';
import pathToAction from './pure-utils/pathToAction';
import { nestHistory } from './pure-utils/nestAction';
import isLocationAction from './pure-utils/isLocationAction';
import isRedirectAction from './pure-utils/isRedirectAction';
import isServer from './pure-utils/isServer';
import isReactNative from './pure-utils/isReactNative';
import changePageTitle, { getDocument } from './pure-utils/changePageTitle';
import attemptCallRouteThunk from './pure-utils/attemptCallRouteThunk';
import createThunk from './pure-utils/createThunk';
import pathnamePlusSearch from './pure-utils/pathnamePlusSearch';
import canUseDom from './pure-utils/canUseDom';

import { clearBlocking, createConfirm, confirmUI, setDisplayConfirmLeave, getUserConfirmation } from './pure-utils/confirmLeave';

import historyCreateAction from './action-creators/historyCreateAction';
import middlewareCreateAction from './action-creators/middlewareCreateAction';
import middlewareCreateNotFoundAction from './action-creators/middlewareCreateNotFoundAction';

import createLocationReducer, { getInitialState } from './reducer/createLocationReducer';
import { NOT_FOUND, ADD_ROUTES } from './index';

var __DEV__ = process.env.NODE_ENV !== 'production';

/** PRIMARY EXPORT - `connectRoutes(history, routeMap, options)`:
 *
 *  PURPOSE: to provide set-it-forget-it syncing of actions to the address bar and vice
 *  versa, using the pairing of action types to express-style routePaths bi-directionally.
 *
 *  EXAMPLE:
 *  with routeMap `{ FOO: '/foo/:paramName' }`,
 *
 *  pathname '/foo/bar' would become:
 *  `{ type: 'FOO', payload: { paramName: 'bar' } }`
 *
 *  AND
 *
 *  action `{ type: 'FOO', payload: { paramName: 'bar' } }`
 *  becomes: pathname '/foo/bar'
 *
 *
 *  HOW: Firstly, the middleware listens to received actions and then converts them to the
 *  pathnames it applies to the address bar (via `history.push({ pathname })`. It also formats
 *  the action to be location-aware, primarily by including a matching pathname, which the
 *  location reducer listens to, and which user reducers can also make use of.
 *
 *  However, user reducers typically only need to  be concerned with the type
 *  and payload like they are accustomed to. That's the whole purpose of this package.
 *  The idea is by matching action types to routePaths, it's set it and forget it!
 *
 *  Secondly, a history listener listens to URL changes and dispatches actions with
 *  types and payloads that match the pathname. Hurray! Browse back/next buttons now work!
 *
 *  Both the history listener and middleware are made to not get into each other's way, i.e.
 *  avoiding double dispatching and double address bar changes.
 *
 *
 *  VERY IMPORTANT NOTE ON SSR: if you're wondering, `connectRoutes()` when called returns
 *  functions in a closure that provide access to variables in a private
 *  "per instance" fashion in order to be used in SSR without leaking
 *  state between SSR requests :).
 *
 *  As much as possible has been refactored out of this file into pure or
 *  near-pure utility functions.
*/

export default (function () {
  var routesMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (__DEV__) {
    if (options.restoreScroll && typeof options.restoreScroll !== 'function') {
      throw new Error('[redux-first-router] invalid `restoreScroll` option. Using\n        https://github.com/faceyspacey/redux-first-router-restore-scroll\n        please call `restoreScroll` and assign it the option key\n        of the same name.');
    }
  }

  /** INTERNAL ENCLOSED STATE (PER INSTANCE FOR SSR!) */

  var _options$notFoundPath = options.notFoundPath,
      notFoundPath = _options$notFoundPath === undefined ? '/not-found' : _options$notFoundPath,
      _options$scrollTop = options.scrollTop,
      scrollTop = _options$scrollTop === undefined ? false : _options$scrollTop,
      location = options.location,
      title = options.title,
      onBeforeChange = options.onBeforeChange,
      onAfterChange = options.onAfterChange,
      onBackNext = options.onBackNext,
      restoreScroll = options.restoreScroll,
      _options$initialDispa = options.initialDispatch,
      shouldPerformInitialDispatch = _options$initialDispa === undefined ? true : _options$initialDispa,
      querySerializer = options.querySerializer,
      displayConfirmLeave = options.displayConfirmLeave,
      extra = options.extra;

  // The options must be initialized ASAP to prevent empty options being
  // received in `getOptions` after the initial events emitted

  _options = options;

  setDisplayConfirmLeave(displayConfirmLeave);

  if (options.basename) {
    options.basename = stripTrailingSlash(addLeadingSlash(options.basename));
  }

  var isBrowser = canUseDom && process.env.NODE_ENV !== 'test';
  var standard = isBrowser ? createBrowserHistory : createMemoryHistory;
  var createHistory = options.createHistory || standard;
  var entries = options.initialEntries || '/'; // fyi only memoryHistory needs initialEntries
  var initialEntries = typeof entries === 'string' ? [entries] : entries;

  var history = createHistory({
    basename: options.basename,
    initialEntries: initialEntries,
    getUserConfirmation: getUserConfirmation
  });

  // very important: used for comparison to determine address bar changes
  var currentPath = pathnamePlusSearch(history.location);

  var prevLocation = {
    // maintains previous location state in location reducer
    pathname: '',
    type: '',
    payload: {}
  };

  var selectLocationState = typeof location === 'function' ? location : location ? function (state) {
    return state[location];
  } : function (state) {
    return state.location;
  };

  var selectTitleState = typeof title === 'function' ? title : title ? function (state) {
    return state[title];
  } : function (state) {
    return state.title;
  };

  var scrollBehavior = restoreScroll && restoreScroll(history);

  var initialAction = pathToAction(currentPath, routesMap, querySerializer);
  var type = initialAction.type,
      payload = initialAction.payload,
      meta = initialAction.meta;


  var INITIAL_LOCATION_STATE = getInitialState(currentPath, meta, type, payload, routesMap, history);

  var prevState = INITIAL_LOCATION_STATE; // used only to pass  as 1st arg to `scrollBehavior.updateScroll` if used
  var nextState = {}; // used as 2nd arg to `scrollBehavior.updateScroll` and to change `document.title`
  var prevLength = 1; // used by `historyCreateAction` to calculate if moving along history.entries track

  var reducer = createLocationReducer(INITIAL_LOCATION_STATE, routesMap);
  var initialBag = { action: initialAction, extra: extra };
  var thunk = createThunk(routesMap, selectLocationState, initialBag);
  var initialDispatch = function initialDispatch() {
    return _initialDispatch && _initialDispatch();
  };

  var windowDocument = getDocument(); // get plain object for window.document if server side

  var navigators = void 0;
  var patchNavigators = void 0;
  var actionToNavigation = void 0;
  var navigationToAction = void 0;

  // this value is used to hold temp state between consecutive runs through
  // the middleware (i.e. from new dispatches triggered within the middleware)
  var tempVal = void 0;

  if (options.navigators) {
    // redux-first-router-navigation reformats the `navigators` option
    // to have the navigators nested one depth deeper, so as to include
    // the various helper functions from its package
    if (__DEV__ && !options.navigators.navigators) {
      throw new Error('[redux-first-router] invalid `navigators` option. Pass your map\n        of navigators to the default import from \'redux-first-router-navigation\'.\n        Don\'t forget: the keys are your redux state keys.');
    }

    navigators = options.navigators.navigators;
    patchNavigators = options.navigators.patchNavigators;
    actionToNavigation = options.navigators.actionToNavigation;
    navigationToAction = options.navigators.navigationToAction;

    patchNavigators(navigators);
  }

  /** MIDDLEWARE
   *  1)  dispatches actions with location info in the `meta` key by matching the received action
   *      type + payload to express style routePaths (which also results in location reducer state updating)
   *  2)  changes the address bar url and page title if the currentPathName changes, while
   *      avoiding collisions with simultaneous browser history changes
  */

  var middleware = function middleware(store) {
    return function (next) {
      return function (action) {
        // We have chosen to not change routes on errors, while letting other middleware
        // handle it. Perhaps in the future we will explicitly handle it (as an option)
        if (action.error) return next(action);

        // code-splitting functionliaty to add routes after store is initially configured
        if (action.type === ADD_ROUTES) {
          var _selectLocationState2 = selectLocationState(store.getState()),
              _type = _selectLocationState2.type;

          var _route = routesMap[_type];

          routesMap = _extends({}, routesMap, action.payload.routes);

          var result = next(action);
          var nextRoute = routesMap[_type];

          if (_route !== nextRoute) {
            if (_confirm !== null) {
              clearBlocking();
            }

            if ((typeof nextRoute === 'undefined' ? 'undefined' : _typeof(nextRoute)) === 'object' && nextRoute.confirmLeave) {
              _confirm = createConfirm(nextRoute.confirmLeave, store, selectLocationState, history, querySerializer, function () {
                return _confirm = null;
              });
            }
          }

          return result;
        }

        // navigation transformation specific to React Navigation
        var navigationAction = void 0;

        if (navigators && action.type.indexOf('Navigation/') === 0) {
          var _navigationToAction = navigationToAction(navigators, store, routesMap, action);

          navigationAction = _navigationToAction.navigationAction;
          action = _navigationToAction.action;
        }

        var route = routesMap[action.type];

        // We now support "routes" without paths for the purpose of dispatching thunks according
        // to the same idiom as full-fledged routes. The purpose is uniformity of async actions.
        // The URLs will NOT change.
        if ((typeof route === 'undefined' ? 'undefined' : _typeof(route)) === 'object' && !route.path) {
          var _nextAction = next(action);

          attemptCallRouteThunk(store.dispatch, store.getState, route, selectLocationState, { action: _nextAction, extra: extra });

          return _nextAction;
        }

        // START THE TYPICAL FLOW:

        if (action.type === NOT_FOUND && !isLocationAction(action)) {
          // user decided to dispatch `NOT_FOUND`, so we fill in the missing location info
          action = middlewareCreateNotFoundAction(action, selectLocationState(store.getState()), prevLocation, history, notFoundPath);
        } else if (route && !isLocationAction(action)) {
          // THE MAGIC: dispatched action matches a connected type, so we generate a
          // location-aware action and also as a result update location reducer state.
          action = middlewareCreateAction(action, routesMap, prevLocation, history, notFoundPath, querySerializer);
        }

        if (navigators) {
          action = actionToNavigation(navigators, action, navigationAction, route);
        }

        // DISPATCH LIFECYLE:
        var skip = void 0;
        if ((route || action.type === NOT_FOUND) && action.meta) {
          // satisify flow with `action.meta` check
          skip = _beforeRouteChange(store, history, action);
        }

        if (skip) return;
        var nextAction = next(action);

        if (route || action.type === NOT_FOUND) {
          _afterRouteChange(store, route, nextAction);
        }

        return nextAction;
      };
    };
  };

  var _beforeRouteChange = function _beforeRouteChange(store, history, action) {
    var location = action.meta.location;

    if (_confirm) {
      var message = _confirm(location.current);

      if (message) {
        confirmUI(message, store, action);
        return true; // skip if there's a message to show in the confirm UI
      }

      _confirm = null;
    }

    if (onBeforeChange) {
      var skip = void 0;

      var redirectAwareDispatch = function redirectAwareDispatch(action) {
        if (isRedirectAction(action)) {
          skip = true;
          prevLocation = location.current;
          var _nextPath = pathnamePlusSearch(location.current);
          var isHistoryChange = _nextPath === currentPath;

          // this insures a `history.push` is called instead of `history.replace`
          // even though it's a redirect, since unlike route changes triggered
          // from the browser buttons, the URL did not change yet.
          if (!isHistoryChange && !isServer()) {
            tempVal = 'onBeforeChange';
          }
        }

        return store.dispatch(action);
      };

      var bag = { action: action, extra: extra };
      onBeforeChange(redirectAwareDispatch, store.getState, bag);
      if (skip) return true;
    }

    prevState = selectLocationState(store.getState());
    prevLocation = location.current;
    prevLength = history.length;

    // addressbar updated before action dispatched like in history.listener
    _middlewareAttemptChangeUrl(location, history);

    // now we can finally set the history on the action since we get its
    // value from the `history` whose value only changes after `push()`
    if (isReactNative()) {
      location.history = nestHistory(history);
    }
  };

  var _afterRouteChange = function _afterRouteChange(store, route, action) {
    var dispatch = store.dispatch;
    var state = store.getState();
    var kind = selectLocationState(state).kind;
    var title = selectTitleState(state);
    var bag = { action: action, extra: extra };
    nextState = selectLocationState(state);

    if ((typeof route === 'undefined' ? 'undefined' : _typeof(route)) === 'object') {
      var skip = false;

      var redirectAwareDispatch = function redirectAwareDispatch(action) {
        if (isRedirectAction(action)) skip = true;
        return store.dispatch(action);
      };

      attemptCallRouteThunk(redirectAwareDispatch, store.getState, route, selectLocationState, bag);

      if (skip) return;
    }

    if (onAfterChange) {
      onAfterChange(dispatch, store.getState, bag);
    }

    if (!isServer()) {
      if (kind) {
        if (typeof onBackNext === 'function' && /back|next|pop/.test(kind)) {
          onBackNext(dispatch, store.getState, bag);
        }

        setTimeout(function () {
          changePageTitle(windowDocument, title);

          if (scrollTop) {
            return window.scrollTo(0, 0);
          }

          _updateScroll(false);
        });
      }

      if ((typeof route === 'undefined' ? 'undefined' : _typeof(route)) === 'object' && route.confirmLeave) {
        _confirm = createConfirm(route.confirmLeave, store, selectLocationState, history, querySerializer, function () {
          return _confirm = null;
        });
      }
    }
  };

  var _middlewareAttemptChangeUrl = function _middlewareAttemptChangeUrl(location, history) {
    // IMPORTANT: insure history hasn't already handled location change
    var nextPath = pathnamePlusSearch(location.current);
    if (nextPath !== currentPath) {
      // keep currentPath up to date for comparison to prevent double dispatches
      // between BROWSER back/forward button usage vs middleware-generated actions
      currentPath = nextPath; // IMPORTANT: must happen before history.push() (to prevent double handling)

      // for React Native, in the case `back` or `next` is
      // not called directly, `middlewareCreateAction` may emulate
      // `history` backNext actions to support features such
      // as scroll restoration. In those cases, we need to prevent
      // pushing new routes on to the entries array. `stealth` is
      // a React Navigation feature for changing StackNavigators
      // without triggering other navigators (such as a TabNavigator)
      // to change as well. It allows you to reset hidden StackNavigators.
      var kind = location.kind;

      var manuallyInvoked = kind && /back|next|pop|stealth/.test(kind);

      if (!manuallyInvoked) {
        var isRedirect = kind === 'redirect' && tempVal !== 'onBeforeChange';
        var method = isRedirect ? 'replace' : 'push';
        history[method](currentPath); // change address bar corresponding to matched actions from middleware
      }
    }
  };

  /** ENHANCER
   *  1)  dispatches actions with types and payload extracted from the URL pattern
   *      when the browser history changes
   *  2)  on load of the app dispatches an action corresponding to the initial url
   */

  var enhancer = function enhancer(createStore) {
    return function (reducer, preloadedState, enhancer) {
      // routesMap stored in location reducer will be stringified as it goes from the server to client
      // and as a result functions in route objects will be removed--here's how we insure we bring them back
      if (!isServer() && preloadedState && selectLocationState(preloadedState)) {
        selectLocationState(preloadedState).routesMap = routesMap;
      }

      var store = createStore(reducer, preloadedState, enhancer);
      var state = store.getState();
      var location = state && selectLocationState(state);

      if (!location || !location.pathname) {
        throw new Error('[redux-first-router] you must provide the key of the location\n        reducer state and properly assigned the location reducer to that key.');
      }

      history.listen(_historyAttemptDispatchAction.bind(null, store));

      // dispatch the first location-aware action so initial app state is based on the url on load
      if (!location.hasSSR || isServer()) {
        // only dispatch on client before SSR is setup, which passes state on to the client
        _initialDispatch = function _initialDispatch() {
          var action = historyCreateAction(currentPath, routesMap, prevLocation, history, 'load', querySerializer);

          store.dispatch(action);
        };

        if (shouldPerformInitialDispatch !== false) {
          _initialDispatch();
        }
      } else {
        // set correct prevLocation on client that has SSR so that it will be
        // assigned to `action.meta.location.prev` and the corresponding state
        prevLocation = location;

        var route = routesMap[location.type];

        if ((typeof route === 'undefined' ? 'undefined' : _typeof(route)) === 'object' && route.confirmLeave) {
          _confirm = createConfirm(route.confirmLeave, store, selectLocationState, history, querySerializer, function () {
            return _confirm = null;
          });
        }
      }

      // update the scroll position after initial rendering of page
      if (!isServer()) setTimeout(function () {
        return _updateScroll(false);
      });

      return store;
    };
  };

  var _historyAttemptDispatchAction = function _historyAttemptDispatchAction(store, location, historyAction) {
    // IMPORTANT: insure middleware hasn't already handled location change:
    var nextPath = pathnamePlusSearch(location);

    if (nextPath !== currentPath) {
      var kind = historyAction === 'REPLACE' ? 'redirect' : historyAction;

      // THE MAGIC: parse the address bar path into a matched action
      var action = historyCreateAction(nextPath, routesMap, prevLocation, history, kind.toLowerCase(), querySerializer, currentPath, prevLength);

      currentPath = nextPath; // IMPORTANT: must happen before dispatch (to prevent double handling)

      store.dispatch(action); // dispatch route type + payload corresponding to browser back/forward usage
    }
  };

  /* SIDE_EFFECTS - client-only state that must escape closure */

  _history = history;
  _scrollBehavior = scrollBehavior;
  _selectLocationState = selectLocationState;

  var _initialDispatch = void 0;
  var _confirm = null;

  _updateScroll = function _updateScroll() {
    var performedByUser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (scrollBehavior) {
      if (performedByUser || !scrollBehavior.manual) {
        scrollBehavior.updateScroll(prevState, nextState);
      }
    } else if (__DEV__ && performedByUser) {
      throw new Error('[redux-first-router] you must set the `restoreScroll` option before\n        you can call `updateScroll`');
    }
  };

  /* RETURN  */

  return {
    reducer: reducer,
    middleware: middleware,
    enhancer: enhancer,
    thunk: thunk,
    initialDispatch: initialDispatch,

    // returned only for tests (not for use in application code)
    _middlewareAttemptChangeUrl: _middlewareAttemptChangeUrl,
    _afterRouteChange: _afterRouteChange,
    _historyAttemptDispatchAction: _historyAttemptDispatchAction,
    windowDocument: windowDocument,
    history: history
  };
});

/** SIDE EFFECTS:
 *  Client code needs a simple `push`,`back` + `next` functions because it's convenient for
 *  prototyping. It will not harm SSR, so long as you don't use it server side. So if you use it, that means DO NOT
 *  simulate clicking links server side--and dont do that, dispatch actions to setup state instead.
 *
 *  THE IDIOMATIC WAY: instead use https://github.com/faceyspacey/redux-first-router-link 's `<Link />`
 *  component to generate SEO friendly urls. As its `href` prop, you pass it a path, array of path
 *  segments or action, and internally it will use `connectRoutes` to change the address bar and
 *  dispatch the correct final action from middleware.
 *
 *  NOTE ON BACK FUNCTIONALITY: The better way to accomplish a back button is to use your redux state to determine
 *  the previous URL. The location reducer will also contain relevant info. But if you must,
 *  this is here for convenience and it basically simulates the user pressing the browser
 *  back button, which of course the system picks up and parses into an action.
 */

var _history = void 0;
var _scrollBehavior = void 0;
var _updateScroll = void 0;
var _selectLocationState = void 0;
var _options = void 0;

export var push = function push(pathname) {
  return _history.push(pathname);
};

export var replace = function replace(pathname) {
  return _history.replace(pathname);
};

export var back = function back() {
  return _history.goBack();
};

export var next = function next() {
  return _history.goForward();
};

export var go = function go(n) {
  return _history.go(n);
};

export var canGo = function canGo(n) {
  return _history.canGo(n);
};

export var canGoBack = function canGoBack() {
  return !!(_history.entries && _history.entries[_history.index - 1]);
};

export var canGoForward = function canGoForward() {
  return !!(_history.entries && _history.entries[_history.index + 1]);
};

export var prevPath = function prevPath() {
  var entry = _history.entries[_history.index - 1];
  return entry && entry.pathname;
};

export var nextPath = function nextPath() {
  var entry = _history.entries[_history.index + 1];
  return entry && entry.pathname;
};

export var history = function history() {
  return _history;
};

export var scrollBehavior = function scrollBehavior() {
  return _scrollBehavior;
};

export var updateScroll = function updateScroll() {
  return _updateScroll && _updateScroll();
};

export var selectLocationState = function selectLocationState(state) {
  return _selectLocationState(state);
};

export var getOptions = function getOptions() {
  return _options || {};
};