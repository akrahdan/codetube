import { stringify } from 'query-string';

import { cfdata } from 'libs/cfdata';

import { userAttributes } from 'libs/userAttributes';

export type GenericRequestInfo = {
  endpoint: string;
  data?: any;
  query?: any;
  headers?: any;
  method?: string;
};

export type FetchBody = string | FormData | undefined;

// async, returns a promise
// this method requires a CCDATA object on the window from which to grab auth tokens
// this is for JSON requests only
export function genericRequest({
  endpoint,
  data = {},
  query = {},
  headers = {},
  method = 'GET',
}: GenericRequestInfo) {
  const hasDataArg = data && Object.keys(data).length;
  const isFormData = data instanceof FormData;

  if ((method === 'GET' || method === 'HEAD') && hasDataArg) {
    throw new Error(
      "GET and HEAD requests do not have data objects, only query params are allowed, please make sure you're using the correct method"
    );
  }

  const combinedHeaders = {
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    Accept: 'application/json',
    ...headers,
  };

  const authToken = cfdata['authenticity_token'];
  if (authToken) {
    combinedHeaders['X-CSRF-Token'] = authToken;
  }

  const userAuthToken = userAttributes.authenticationToken();
  if (userAuthToken) {
    combinedHeaders['X-Auth-Token'] = userAuthToken;
    query.authentication_token = userAuthToken;
  }

  const stringifiedQuery = Object.keys(query).length
    ? `?${stringify(query)}`
    : '';

  const fullURL = `${endpoint}${stringifiedQuery}`;

  // This generally only happens on the React Renderer where some component spins off an async effect
  // This will help us narrow down which request is being triggered, hopefully...
  if (!fetch) {
    throw new Error(
      [
        'Oh no 😭 something is trying to fetch in the renderer!',
        JSON.stringify({ fullURL, method }),
      ].join(' \n')
    );
  }

  let body: FetchBody;

  if (isFormData) {
    body = data;
  } else if (hasDataArg) {
    body = JSON.stringify(data);
  }

  return fetch(fullURL, {
    body,
    headers: combinedHeaders,
    method: method.toUpperCase(),
    credentials: 'same-origin',
  });
}

export type HandleResponseInfo = {
  errorMessage?: string;
  logAndSwallowErrors?: boolean;
};

export function handleResponse<Result>({
  errorMessage,
  logAndSwallowErrors,
}: HandleResponseInfo) {
  return function (response: Response): Promise<Result> {
    if (response.ok) {
      try {
        return response.json() as Promise<Result>;
      } catch (e) {
        console.error({
          message: errorMessage,
        });
        if (!logAndSwallowErrors) {
          throw e;
        } else {
          return {} as any;
        }
      }
    } else {
      console.error({
        message: `${errorMessage}, status: ${response.status}`,
      });
      if (!logAndSwallowErrors) {
        throw new Error(response.statusText);
      } else {
        return {} as any;
      }
    }
  };
}
