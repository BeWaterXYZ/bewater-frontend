import create from 'zustand';
import { persist } from 'zustand/middleware';

import { isBrowser } from '@/constants';
import { UserLocalStorage } from '@/models/user';

interface Store {
  token: string;
  user: UserLocalStorage;
}

const dummyStorage = {
  getItem: (name: string) => {
    return name;
  },
  setItem: (name: string, value: string) => {
    // eslint-disable-next-line
    console.log('set', name, value);
  },
  removeItem: (name: string) => {
    // eslint-disable-next-line
    console.log('remove', name);
  },
};
export const useAuthStore = create<Store>()(
  persist(
    () => ({
      token: '',
      user: {},
    }),
    {
      name: 'bewater', // name of item in the storage (must be unique)
      getStorage: () => {
        return isBrowser ? localStorage : dummyStorage;
      },
    },
  ),
);
