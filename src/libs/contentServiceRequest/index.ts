import {
  genericRequest,
  GenericRequestInfo,
  handleResponse,
} from 'libs/genericRequest';

export type ContentServiceRequest = Omit<GenericRequestInfo, 'headers'> & {
  logAndSwallowErrors?: boolean;
  version?: 0 | 1;
  bypassCache?: boolean;
  jwt: string | undefined;
};

type ContentServicePagination = {
  page: number;
  page_size: number;
  total_documents: number;
  total_pages: number;
};

export type ContentServiceResponse<T> = {
  data: T;
  page: number;
  pagination?: ContentServicePagination;
};

// this method requires a CCDATA object on the window from which to grab auth tokens
export function contentServiceRequest<Result>({
  endpoint,
  data = {},
  query = {},
  method = 'GET',
  jwt,
  version = 0,
  bypassCache = false,
  logAndSwallowErrors = true,
}: ContentServiceRequest): Promise<Result> {
  const headers: any = {};

  if (endpoint.startsWith('/')) endpoint = endpoint.slice(1);
  if (bypassCache) headers['Cache-Bypass'] = true;
  if (jwt) headers.Authorization = `Bearer ${jwt}`;

  const fullURL = `/content/v3.${version}/${endpoint}`;

  return genericRequest({
    endpoint: fullURL,
    query,
    data,
    method,
    headers,
  }).then(
    handleResponse<Result>({
      logAndSwallowErrors,
      errorMessage: `Unable to fetch data from content service endpoint: ${fullURL}`,
    })
  );
}
