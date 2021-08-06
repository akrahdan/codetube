import Uri from 'jsuri';
import { SuperAgentRequest } from 'superagent';

import { cfdata } from 'libs/cfdata';
import { userAttributes } from 'libs/userAttributes';

/**
 * superagent csrf plugin
 *
 * sets the csrf header token
 *
 * general usage:
 * import {csrf} from '~/libs/superagent-auth';
 *
 * request
 *      .use(csrf)
 *
 */
export function csrf(request: SuperAgentRequest) {
  const authToken = cfdata.get('authenticity_token');
  if (authToken) {
    request.set('X-CSRF-Token', authToken);
  }
}

/**
 * superagent userAuth plugin
 *
 * sets the user auth token param
 *
 * general usage:
 * import {userAuth} from '~/libs/superagent-auth';
 *
 * request
 *   .use(userAuth)
 *
 */
export function userAuth(request: SuperAgentRequest) {
  const userAuthToken = userAttributes.authenticationToken();
  if (userAuthToken) {
    const uri = new Uri(request.url).addQueryParam(
      'authentication_token',
      userAuthToken
    );
    request.url = uri.toString();
  }
  if (window.CFDATA!.current_user) {
    request.set(
      'X-Auth-Token',
      window.CFDATA!.current_user.authentication_token
    );
  }
}

/**
 * superagent API auth plugin
 *
 * sets the auth needed for API requests
 *
 * general usage:
 * import {apiAuth} from '~/libs/superagent-auth';
 *
 * request
 *      .use(apiAuth)
 *
 */
export function apiAuth(request: SuperAgentRequest) {
  const userAuthToken = userAttributes.authenticationToken();
  if (userAuthToken) {
    request.set('X-Auth-Token', userAuthToken);
    // request.set('X-User-Id', userAttributes.id());
  }
}

/**
 * superagent jwt plugin
 *
 * sets the csrf header token
 *
 * general usage:
 * import {jwtAuth} from '~/libs/superagent-auth';
 *
 * request
 *      .use(jwtAuth)
 *
 */
export function jwtAuth(request: SuperAgentRequest) {
  // const token = userAttributes.get('jwt');
  // if (token) {
  //   request.set('Authorization', `Bearer ${token}`);
  // }
}
