export const withTimeout = <T>(
  promise: Promise<T>,
  duration: number,
  label: string,
) => {
  let t: NodeJS.Timeout;
  promise.finally(() => {
    clearTimeout(t);
  });
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      t = setTimeout(() => {
        reject(Error(`Timeout after ${duration}ms: ${label}`));
      }, duration);
    }),
  ]);
};
