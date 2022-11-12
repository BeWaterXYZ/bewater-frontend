import { getLogger } from './logger';

export const withTimeoutWarning = <T>(
  promise: Promise<T>,
  duration: number,
  label: string,
) => {
  const t = setTimeout(() => {
    getLogger().warn({ message: `${label} still pending in ${duration}ms` });
  }, duration);
  promise.finally(() => {
    clearTimeout(t);
  });
  return promise;
};
