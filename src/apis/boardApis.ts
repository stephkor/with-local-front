import { request } from "./index";
import { API_BASE_URL } from "../config/app";

const apiBaseUrl = API_BASE_URL;

export const createBoard = async (lang = "ko") => {
  try {
    return await request("post", `${apiBaseUrl}/v1/posts`, lang);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
