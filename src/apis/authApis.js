import { request } from "./index";
import { API_BASE_URL } from "../config/appConfig";
import tokenManager from "../utils/TokenManager";
import jwt_decode from "jwt-decode";
import { logout } from "../store/slices/userSlice";
import { store } from "src/store/slices";
import axios from "axios";

const apiBaseUrl = API_BASE_URL;
export const login = async (email, password) => {
  try {
    const res = await request(
      "post",
      `${apiBaseUrl}/v1/oauth/email/sign-in`,
      null,
      { email, password }
    );
    const { accessToken, refreshToken } = res.data.data;

    tokenManager.accessToken = accessToken;
    tokenManager.refreshToken = refreshToken;

    return jwt_decode(accessToken);
  } catch (e) {
    console.log(e);

    if (store.getState().user.isLoggedIn) {
      store.dispatch(logout());
    }

    throw e;
  }
};

export const register = async (email, password) => {
  try {
    const res = await axios
      .post(`${apiBaseUrl}/v1/oauth/email/sign-up`, {
        email,
        password,
      })
      .then((response) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.data.accessToken}`;
      });
  } catch (e) {
    console.log(e);

    if (store.getState().user.isLoggedIn) {
      store.dispatch(logout());
    }

    throw e;
  }
};

export const getMypage = async (lang) => {
  try {
    return await request("get", `${apiBaseUrl}/v1/users/my-page`, {
      country: lang,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};
