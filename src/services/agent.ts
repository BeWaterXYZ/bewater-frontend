import { CONFIGS } from '@/config';
import { isBrowser } from '@/constants';
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

/**
 *  interceptors
 */

const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  if (!isBrowser) return config;
  const accessToken = await (<any>window).Clerk.session.getToken(); // useAuthStore.getState().token;
  if (!!accessToken && !!config.headers) {
    config.headers['authorization'] = `Bearer ${accessToken}`;
  }
  return config;
};

const responseInterceptor = (error: AxiosError) => {
  if (error.response?.status === 401) {
    // to do , clerk logout
  }
  return Promise.reject(error);
};

const responseDataInterceptor = (resp: AxiosResponse) => {
  if (resp.data.status === 'SUCCESS' && resp.data.status_code === 200) {
    resp.data = resp.data.data;
  } else {
    throw resp;
  }
  return resp;
};

/**
 *  agentAuthed
 */
const agentAuthed = axios.create({
  baseURL: CONFIGS.API_ENDPOINT,
});

agentAuthed.interceptors.request.use(requestInterceptor);
agentAuthed.interceptors.response.use(
  responseDataInterceptor,
  responseInterceptor,
);

/**
 *  agentAnon
 */
const agentAnon = axios.create({
  baseURL: CONFIGS.API_ENDPOINT,
});

agentAnon.interceptors.response.use(
  responseDataInterceptor,
  responseInterceptor,
);

const agentNext = axios.create({
  baseURL: isBrowser ? window.location.origin : '',
});

export { agentAuthed, agentAnon, agentNext };
