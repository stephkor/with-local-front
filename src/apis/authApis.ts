import { request } from "./index";
import { API_BASE_URL } from "../config/app";
import tokenManager from "../utils/TokenManager";
import jwt_decode from "jwt-decode";
import { logout } from "../store/slices/userSlice";
import { store } from "../store";
import { AxiosResponse } from "axios";

const apiBaseUrl = API_BASE_URL;
export const login = async (id: OauthParmas): Promise<void> => {
  try {
    const res = await request("post", `${apiBaseUrl}/v1/oauth/email/jwt`, id);
    const { access_token, refresh_token } = res.data;

    tokenManager.accessToken = access_token;
    tokenManager.refreshToken = refresh_token;

    return jwt_decode(access_token);
  } catch (e) {
    console.log(e);

    if (store.getState().user.isLoggedIn) {
      store.dispatch(logout());
    }
  }
};

export const register = async () => {
  try {
    return await request("post", `${apiBaseUrl}/v1/oauth/email/signup-test`);
  } catch (e) {
    console.log(e);

    if (store.getState().user.isLoggedIn) {
      store.dispatch(logout());
    }
  }
};
