import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { env } from "../env.mjs";
/**
 *  interceptors
 */

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlkZjFiMWNlLTEzYTItNDU2NS1iYWIwLThjMjBjYWNmMmQ1NiIsIndhbGxldEFkZHJlc3MiOiIweGMxNmZlMDY3NjYwYTVhYmFjZDE2N2Q4ZGFlMDdhZDIyNWM2YjE1MTAiLCJpYXQiOjE2ODYwMDc2NjYsImV4cCI6MTY4Njg3MTY2Nn0._M7joW_54g6iAQJjkXKr0bpgLMQVjpMQHclIBgytyDo";
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
