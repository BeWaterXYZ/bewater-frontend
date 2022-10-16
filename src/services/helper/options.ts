import type { SWRConfiguration } from 'swr';

export type RequestOptions = {
  onError: (err: Error) => void;
};

export function toSWROptions<Data, Error>(
  options?: RequestOptions,
): SWRConfiguration<Data, Error> {
  if (!options) return {};
  return {
    onError(err: unknown) {
      if (err instanceof Error) {
        return options.onError(err);
      } else if (typeof err === 'string') {
        return options.onError(new Error(err));
      } else {
        console.error(`Unknown error type`, typeof err, JSON.stringify(err));
        return options.onError(new Error('Unknown'));
      }
    },
  };
}
