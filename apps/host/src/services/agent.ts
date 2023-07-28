import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { env } from "../env.mjs";
/**
 *  interceptors
 */

const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  // todo. fix Clerk
  const accessToken = await (<any>window).Clerk?.session?.getToken?.();
  if (!!accessToken && !!config.headers) {
    config.headers["authorization"] = `Bearer ${accessToken}`;
  }
  return config;
};

const responseInterceptor = (error: AxiosError) => {
  if (error.response?.status === 401) {
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
 *  agentAuthed
 */
const agentAuthed = axios.create({
  baseURL: env.NEXT_PUBLIC_API_ENDPOINT,
});

agentAuthed.interceptors.request.use(requestInterceptor);
agentAuthed.interceptors.response.use(
  responseDataInterceptor,
  responseInterceptor
);

export { agentAuthed };
