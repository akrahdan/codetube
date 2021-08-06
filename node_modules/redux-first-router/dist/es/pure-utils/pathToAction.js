var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import { compilePath } from 'rudy-match-path';
import { stripBasename } from 'rudy-history/PathUtils';
import { NOT_FOUND, getOptions } from '../index';
import objectValues from './objectValues';

export default (function (pathname, routesMap, serializer) {
  var basename = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : getOptions().basename;
  var strict = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : getOptions().strict;

  var parts = pathname.split('?');
  var search = parts[1];
  var query = search && serializer && serializer.parse(search);
  var routes = objectValues(routesMap);
  var routeTypes = Object.keys(routesMap);

  pathname = basename ? stripBasename(parts[0], basename) : parts[0];

  var i = 0;
  var match = void 0;
  var keys = void 0;

  while (!match && i < routes.length) {
    var regPath = typeof routes[i] === 'string' ? routes[i] : routes[i].path; // route may be an object containing a route or a route string itself

    if (!regPath) {
      i++;
      continue;
    }

    var _compilePath = compilePath(regPath, { strict: strict }),
        re = _compilePath.re,
        k = _compilePath.keys;

    match = re.exec(pathname);
    keys = k;
    i++;
  }

  if (match) {
    i--;

    var capitalizedWords = _typeof(routes[i]) === 'object' && routes[i].capitalizedWords;

    var coerceNumbers = _typeof(routes[i]) === 'object' && routes[i].coerceNumbers;

    var fromPath = routes[i] && typeof routes[i].fromPath === 'function' && routes[i].fromPath;

    var userMeta = _typeof(routes[i]) === 'object' && routes[i].meta;

    var type = routeTypes[i];

    var payload = (keys || []).reduce(function (payload, key, index) {
      var val = match && match[index + 1]; // item at index 0 is the overall match, whereas those after correspond to the key's index

      if (typeof val === 'string') {
        if (fromPath) {
          val = fromPath && fromPath(val, key.name);
        } else if (coerceNumbers && isNumber(val)) {
          val = parseFloat(val);
        } else if (capitalizedWords) {
          val = val.replace(/-/g, ' ').replace(/\b\w/g, function (l) {
            return l.toUpperCase();
          }); // 'my-category' -> 'My Category'
        }
      }

      payload[key.name] = val;
      return payload;
    }, {});

    var _meta = _extends({}, userMeta ? { meta: userMeta } : {}, query ? { query: query } : {});
    return { type: type, payload: payload, meta: _meta };
  }

  // This will basically will only end up being called if the developer is manually calling history.push().
  // Or, if visitors visit an invalid URL, the developer can use the NOT_FOUND type to show a not-found page to
  var meta = _extends({ notFoundPath: pathname }, query ? { query: query } : {});
  return { type: NOT_FOUND, payload: {}, meta: meta };
});

var isNumber = function isNumber(val) {
  return (/^\d+$/.test(val)
  );
};