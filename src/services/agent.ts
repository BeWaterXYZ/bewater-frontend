import { CONFIGS } from '@/config';
import { isBrowser } from '@/constants';
import { useAuthStore } from '@/stores/auth';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

function transform(data: any) {
  let resp;

  try {
    resp = JSON.parse(data);
  } catch (error) {
    console.error(data);
    throw Error(
      `[requestClient] Error parsing response JSON data - ${JSON.stringify(
        error,
      )}`,
    );
  }

  if (resp.status_code === 200 && resp.status === 'SUCCESS') {
    return resp.data;
  } else {
    throw resp;
  }
}

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const accessToken = useAuthStore.getState().token;
  if (!!accessToken && !!config.headers) {
    config.headers['authorization'] = `Bearer ${accessToken}`;
  }
  return config;
};

const responseInterceptor = (error: AxiosError) => {
  if (error.response?.status === 401) {
    useAuthStore.setState({
      token: '',
      user: undefined,
    });
  }
  return Promise.reject(error);
};

const agentAuthed = axios.create({
  baseURL: CONFIGS.API_ENDPOINT,
  transformResponse: [transform],
});

agentAuthed.interceptors.request.use(requestInterceptor);
agentAuthed.interceptors.response.use((resp) => resp, responseInterceptor);
const agentAnon = axios.create({
  baseURL: CONFIGS.API_ENDPOINT,
  transformResponse: [transform],
});

const agentNext = axios.create({
  baseURL: isBrowser ? window.location.origin : '',
});

export { agentAuthed, agentAnon, agentNext };
