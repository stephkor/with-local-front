import { request } from "./index";
import { API_BASE_URL } from "../config/app";
import tokenManager from "../utils/TokenManager";
import jwt_decode from "jwt-decode";
import { logout } from "../store/slices/userSlice";
import { store } from "../store";

const apiBaseUrl = API_BASE_URL;

export const createBoard = async (lang = "ko") => {
  try {
    return await request("post", `${apiBaseUrl}/v1/boards`, lang);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
