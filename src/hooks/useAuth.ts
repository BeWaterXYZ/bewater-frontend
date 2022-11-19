import { useEffect, createContext, useContext } from 'react';
import getConfig from 'next/config';
import { useLocalStorage } from 'react-use';

import { isBrowser } from '@/constants';

import type { NextRuntimeConfig } from '@/types/next-runtime-config';
import type { Auth } from '@/models/auth';
import type { UserLocalStorage } from '@/models/user';

const {
  publicRuntimeConfig: { authRequired },
} = getConfig() as NextRuntimeConfig;

export const AuthContext = createContext({
  headers: {
    Authorization: '',
  },
  user: {},
} as Auth);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function isAuthed(tokens: Auth): boolean {
  return !!tokens.headers['Authorization'] || !authRequired;
}

export function useAuthToken(setTokenState: (newToken: Auth) => void) {
  const [token] = useLocalStorage<string>('authToken');
  const [user] = useLocalStorage<UserLocalStorage>('user');
  useEffect(() => {
    if (isBrowser && authRequired && token) {
      const authToken = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        user: user || {},
      };
      setTokenState(authToken);
    }
  }, [token, user, setTokenState]);
}
