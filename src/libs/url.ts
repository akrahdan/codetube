import Uri from 'jsuri';
import _ from 'lodash';

import { cfdata } from 'libs/cfdata';

export function createQuery(parameters: Record<string, string>) {
  const queryString = Object.keys(parameters)
    .filter((key) => parameters[key])
    .map((key) => `${key}=${parameters[key]}`)
    .join('&');
  return queryString ? `?${queryString}` : null;
}

export const addParamsAsHash = (
  url: string,
  paramHash: Record<string, boolean | number | string>
) => {
  const uri = new Uri(url);
  Object.keys(paramHash).forEach((k) => {
    if (paramHash[k]) {
      uri.deleteQueryParam(k);
      uri.addQueryParam(k, paramHash[k]);
    }
  });
  return uri.toString();
};

/**
 * @remarks
 * Trailing slashes can compound across redirects and create invalid paths such as "/learn//"
 */
function removeTrailingSlashes(path: string) {
  return path === '/' ? path : path.replace(/(\/+)$/, '');
}

export function normalizeLocationSearch(search?: string) {
  if (!search) return '';
  return `?${search.replace(/\?/g, '')}`;
}

export function createRedirectParam(
  location?: Pick<Location, 'pathname' | 'search'>
) {
  if (!location && typeof window !== 'undefined' && window.location) {
    // eslint-disable-next-line prefer-destructuring
    location = window.location;
  }

  if (!location) {
    return undefined;
  }

  return encodeURIComponent(
    removeTrailingSlashes(
      `${location.pathname}/${normalizeLocationSearch(location.search)}`
    )
  );
}

export function safeRedirectUrl(rawUri: string | undefined) {
  if (!rawUri) return '';
  const uri = new Uri(rawUri);
  // const currentUri = new Uri(
  //   __SSR__ ? cfdata.get('request_href') : window.location.href
  // );
  // const path = currentUri
  //   .setPath(uri.path())
  //   .setHost(__SSR__ ? cfdata.get('request_host') : window.location.hostname)
  //   .setQuery(uri.query())
  //   .toString();

  // return removeTrailingSlashes(path);
}

export function validUrl(str: string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return pattern.test(str);
}

export function youtubeOrVimeoUrl(str: string) {
  if (!validUrl(str)) return false;
  const pattern = new RegExp('(vimeo|youtu.be|youtube)');
  return pattern.test(str);
}
