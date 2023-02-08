import axios, { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth';
import { CONFIGS } from '@/config';
import { isBrowser } from '@/constants';

const requestInterceptor = (config: AxiosRequestConfig) => {
  const accessToken = useAuthStore.getState().token;
  if (config.headers) {
    config.headers['authorization'] = `Bearer ${accessToken}`;
  }
  return config;
};

const agentAuthed = axios.create({
  baseURL: CONFIGS.API_ENDPOINT,
});

agentAuthed.interceptors.request.use(requestInterceptor);

const agentAnon = axios.create({
  baseURL: CONFIGS.API_ENDPOINT,
});

const agentNext = axios.create({
  baseURL: isBrowser ? window.location.origin : '',
});

export { agentAuthed, agentAnon, agentNext };
