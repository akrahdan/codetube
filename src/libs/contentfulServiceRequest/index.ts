import {
  genericRequest,
  GenericRequestInfo,
  handleResponse,
} from 'libs/genericRequest';

export type ContentfulServiceRequest = Omit<GenericRequestInfo, 'headers'> & {
  logAndSwallowErrors?: boolean;
  version?: number;
};

export function contentfulServiceRequest<Result>({
  endpoint,
  data = {},
  query = {},
  method = 'GET',
  version = 1,
  logAndSwallowErrors = true,
}: ContentfulServiceRequest) {
  const fullURL = `/contentful/v${version}/${endpoint}`;

  return genericRequest({
    endpoint: fullURL,
    query,
    data,
    method,
  }).then(
    handleResponse<Result>({
      logAndSwallowErrors,
      errorMessage: `Unable to fetch data from contentful endpoint: ${fullURL}`,
    })
  );
}
