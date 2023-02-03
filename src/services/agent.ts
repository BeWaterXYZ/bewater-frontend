import axios, { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth';
import { CONFIGS } from '@/config';

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

export { agentAuthed, agentAnon };
