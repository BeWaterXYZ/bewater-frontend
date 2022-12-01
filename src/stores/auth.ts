import { isBrowser } from '@/constants';
import { UserLocalStorage } from '@/models/user';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface Store {
  token: string;
  user: UserLocalStorage;
}

let fakeStorage = {
  getItem: (name: string) => {
    return name;
  },
  setItem: (name: string, value: string) => {},
  removeItem: (name: string) => {},
};
export const useAuthStore = create<Store>()(
  persist(
    (set, get) => ({
      token: '',
      user: {},
    }),
    {
      name: 'bewater', // name of item in the storage (must be unique)
      getStorage: () => {
        return isBrowser ? localStorage : fakeStorage;
      },
    },
  ),
);
