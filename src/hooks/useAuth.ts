import { useEffect, createContext, useContext } from 'react';
import getConfig from 'next/config';
import { useLocalStorage } from 'react-use';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dayjs from 'dayjs';

import { isBrowser } from '@/constants';

import type { NextRuntimeConfig } from '@/types/next-runtime-config';
import type { Auth } from '@/models/auth';
import type { UserLocalStorage } from '@/models/user';

const {
  publicRuntimeConfig: { authRequired },
} = getConfig() as NextRuntimeConfig;

const durationBeforeTokenExpired = 1000 * 60 * 20; // 20 minutes

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
  const hasToken = !!tokens.headers['Authorization'];
  let verifiedToken = false;
  if (hasToken) {
    const token = tokens.headers['Authorization'].split(' ')[1];
    verifiedToken = verifyToken(token);
  }
  return !authRequired || (hasToken && verifiedToken);
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

export function verifyToken(token?: string): boolean {
  if (token) {
    const decodedToken = jwt.decode(token) as JwtPayload;
    const today = dayjs();
    if (!decodedToken.exp) return false;
    const expireDay = dayjs.unix(decodedToken.exp);
    const millsecondsToExpire = expireDay.diff(today);
    if (millsecondsToExpire > durationBeforeTokenExpired) {
      return true;
    }
    return false;
  }
  return false;
}
