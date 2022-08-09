import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

import Qs from "qs";
import { store } from "../store";
import { logout } from "../store/slices/userSlice";
import tokenManager from "../utils/TokenManager";
import ERROR_MESSAGES from "../config/errorMessages";

export const request = (
  method: "get" | "post" | "put" | "delete",
  baseURL: string,
  queryParams?: any,
  body?: any,
  headers?: AxiosRequestHeaders
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {};
  config.paramsSerializer = (params) =>
    Qs.stringify(params, { arrayFormat: "brackets" });

  if (headers) {
    config.headers = {
      ...config.headers,
      ...headers,
    };
  }

  if (queryParams) {
    config.params = {
      ...config.params,
      ...queryParams,
    };
  }
  const accessToken = tokenManager.accessToken;
  const refreshToken = tokenManager.refreshToken;

  if (!accessToken || !refreshToken) {
    store.dispatch(logout());
    return Promise.reject(new Error("No Token"));
  }

  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${tokenManager.accessToken}`;
  }

  switch (method) {
    case "get":
      return axios.get(baseURL, config);
    case "post":
      return axios.post(baseURL, body, config);
    case "put":
      return axios.put(baseURL, body, config);
    case "delete":
      return axios.delete(baseURL, config);
    default:
      return axios.get(baseURL, config);
  }
};

axios.interceptors.response.use((res) => res, handleError);

// 공용 에러처리
export async function handleError(error: AxiosError) {
  if (error.message === "No Token") {
    throw error;
  }

  if (error.response) {
    const { status } = error.response;

    switch (status) {
      case 400:
      case 403:
      case 404:
      case 500: {
        error.message = ERROR_MESSAGES[status];
        break;
      }
      case 401:
        store.dispatch(logout());
        break;
      default: {
        error.message = ERROR_MESSAGES["UNKNOWN"];
      }
    }
  } else if (error.message === "Network Error") {
    error.message = "네트워크에 문제가 있습니다. 연결을 확인해주세요.";
  } else {
    error.message = ERROR_MESSAGES["UNKNOWN"];
  }

  throw error;
}
