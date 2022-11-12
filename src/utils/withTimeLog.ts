/* eslint-disable no-console */

import { nanoid } from 'nanoid';

export const withTimeLog = <T>(promise: Promise<T>, label: string) => {
  const _label = `${label} ;__${nanoid()}`;
  console.time(_label);
  void promise.then(() => {
    console.timeEnd(_label);
  });
  return promise;
};
