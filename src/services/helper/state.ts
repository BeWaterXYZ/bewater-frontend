import { SWRResponse } from 'swr';
import { useMemo } from 'react';

export type ApiError = Error;
export type ImmutableFetchState<T> = {
  data?: T;
  isLoading: boolean;
  isError: boolean;
  error?: ApiError;
};
export type FetchState<T> = ImmutableFetchState<T> & {
  mutate: SWRResponse<T, Error>['mutate'];
};
export function useResultMapper<T>(
  result: SWRResponse<T, ApiError>,
): FetchState<T> {
  const { data, error, mutate } = result;
  return useMemo(
    () => ({
      data,
      error,
      isError: !!error,
      isLoading: !error && !data,
      mutate,
    }),
    [data, error, mutate],
  );
}
export function useImmutableResultMapper<T, R = T>(
  result: Pick<SWRResponse<T, ApiError>, 'data' | 'error'>,
  dataMapper: (response: T) => R,
): ImmutableFetchState<R> {
  const { data, error } = result;
  return useMemo(
    () => ({
      data: data && dataMapper(data),
      error,
      isError: !!error,
      isLoading: !error && !data,
    }),
    [data, dataMapper, error],
  );
}
