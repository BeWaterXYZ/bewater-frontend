import { CONFIGS } from "@/config";
import { isBrowser } from "@/constants";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

/**
 *  interceptors
 */

const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  if (!isBrowser) return config;
  const accessToken = await (<any>window).Clerk?.session?.getToken(); // useAuthStore.getState().token;
  if (!!accessToken && !!config.headers) {
    config.headers["authorization"] = `Bearer ${accessToken}`;
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
  if (resp.data.status === "SUCCESS" && resp.data.status_code === 200) {
    resp.data = resp.data.data;
  } else {
    throw resp;
  }
  return resp;
};

/**
 *  agentAuthed - 用于需要认证的后端 API 请求
 */
const agentAuthed = axios.create({
  baseURL: CONFIGS.API_ENDPOINT,
});

agentAuthed.interceptors.request.use(requestInterceptor);
agentAuthed.interceptors.response.use(
  responseDataInterceptor,
  responseInterceptor
);

/**
 *  agentAnon - 用于不需要认证的后端 API 请求
 */
const agentAnon = axios.create({
  baseURL: CONFIGS.API_ENDPOINT,
});

agentAnon.interceptors.response.use(
  responseDataInterceptor,
  responseInterceptor
);

/**
 *  agentNext - 用于 Next.js API 请求（不需要认证）
 */
const agentNext = axios.create({
  baseURL: isBrowser ? window.location.origin : "",
});

agentNext.interceptors.response.use(
  responseDataInterceptor,
  responseInterceptor
);

/**
 *  agentNextAuthed - 用于需要认证的 Next.js API 请求
 */
const agentNextAuthed = axios.create({
  baseURL: isBrowser ? window.location.origin : "",
});

agentNextAuthed.interceptors.request.use(requestInterceptor);
agentNextAuthed.interceptors.response.use(
  responseDataInterceptor,
  responseInterceptor
);

export { agentAuthed, agentAnon, agentNext, agentNextAuthed };
