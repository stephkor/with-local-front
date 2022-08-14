import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

import Qs from "qs";
import { store } from "../store";
import { logout } from "../store/slices/userSlice";
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

  axios.interceptors.request.use(async (config) => {
    //   const { accessToken, refreshToken } = tokenManager;
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ2ZjljZThiLTY0MTItNDJkNi1hYzk4LWE3ZDI3Y2U5YjA0ZSIsImlhdCI6MTY2MDQ2NzIyMiwiZXhwIjoxNjYxMDcyMDIyfQ.0oRApbgKQFI49gApmRZirQZFmgtWfwa585Bz_jEMSvs";
    const refreshToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ2ZjljZThiLTY0MTItNDJkNi1hYzk4LWE3ZDI3Y2U5YjA0ZSIsImlhdCI6MTY2MDQ2NzIyMiwiZXhwIjoxNjYzMDU5MjIyfQ.bbZzF166AhIUWahL-ECxkvE6zuJQ1T3lgV-V6KRv5Sg";

    if (!accessToken || !refreshToken) {
      store.dispatch(logout());
      return Promise.reject(new Error("No Token"));
    }

    if (config.headers) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

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
