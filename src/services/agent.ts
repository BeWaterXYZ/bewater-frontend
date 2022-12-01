import axios, { AxiosRequestConfig } from 'axios';
import getConfig from 'next/config';
import type { NextRuntimeConfig } from '@/types/next-runtime-config';
import { useAuthStore } from '@/stores/auth';

const {
  publicRuntimeConfig: { apiHost },
} = getConfig() as NextRuntimeConfig;

const requestInterceptor = (config: AxiosRequestConfig) => {
  const accessToken = useAuthStore.getState().token;
  if (config.headers) {
    config.headers['authorization'] = `Bearer ${accessToken}`;
  }
  return config;
};

const agentAuthed = axios.create({
  baseURL: apiHost,
});

agentAuthed.interceptors.request.use(requestInterceptor);

const agentAnon = axios.create({ baseURL: apiHost });

export { agentAuthed, agentAnon };
