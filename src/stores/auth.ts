import create from 'zustand';
import { persist } from 'zustand/middleware';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { isBrowser } from '@/constants';

export type User = {
  userId?: string;
  walletAddress?: string;
  isNewUser?: boolean;
  avatarURI?: string;
};

interface State {
  token: string;
  expireAt: number;
  user: User;
}

interface Actions {
  isAuthed: () => boolean;
  setState: (state: Partial<State>) => void;
  clear: () => void;
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
const init = {
  token: '',
  user: {},
  expireAt: 0,
};
export const useAuthStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...init,
      isAuthed: () => {
        return !!get().token && get().expireAt > Date.now();
      },
      setState: (state) => {
        set(state);
        if (state.token) {
          const decodedToken = jwt.decode(state.token) as JwtPayload;
          set({ expireAt: (decodedToken.exp ?? 0) * 1000 });
        }
      },
      clear: () => {
        set(init);
      },
    }),
    {
      name: 'bewater', // name of item in the storage (must be unique)
      getStorage: () => {
        return isBrowser ? localStorage : dummyStorage;
      },
    },
  ),
);
