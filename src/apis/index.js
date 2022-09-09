import axios from "axios";

import Qs from "qs";
import { store } from "src/store/slices";
import { logout } from "../store/slices/userSlice";
import messages from "../config/errorMessages";
import tokenManager from "../utils/TokenManager";

export const request = (method, baseURL, queryParams, body, headers) => {
  const config = {};

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
    const { accessToken, refreshToken } = tokenManager;

    if (!accessToken || !refreshToken) {
      store.dispatch(logout());
      // return Promise.reject(new Error("No Token"));
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
export async function handleError(error) {
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
        error.message = messages[status];
        break;
      }
      case 401:
        store.dispatch(logout());
        break;
      default: {
        error.message = messages["UNKNOWN"];
      }
    }
  } else if (error.message === "Network Error") {
    error.message = "네트워크에 문제가 있습니다. 연결을 확인해주세요.";
  } else {
    error.message = messages["UNKNOWN"];
  }

  throw error;
}
