import { request } from "./index";
import { API_BASE_URL } from "../config/app";

const apiBaseUrl = API_BASE_URL;

export const createBoard = async (lang: string, bodyParams: PostBodyParams) => {
  try {
    return await request(
      "post",
      `${apiBaseUrl}/v1/posts`,
      { country: lang },
      bodyParams
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getTabs = async (lang: string) => {
  try {
    return await request("get", `${apiBaseUrl}/v1/category`, {
      country: lang,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getBoardList = async (lang: string, categoryId: number) => {
  try {
    const res = await request("get", `${apiBaseUrl}/v1/posts`, {
      country: lang,
      category: categoryId,
      page: 1,
      size: 20,
    });
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const postLike = async (postId: number) => {
  try {
    return await request("post", `${apiBaseUrl}/v1/posts/${postId}/like`);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
