import { request } from "./index";
import { API_BASE_URL } from "../config/appConfig";

const apiBaseUrl = API_BASE_URL;

export const createBoard = async (lang, bodyParams) => {
  try {
    return await request(
      "post",
      `${apiBaseUrl}/v1/posts`,
      { country: lang },
      bodyParams,
      {
        "Content-type": "multipart/form-data",
        // withCredentials: true,
      }
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getTabs = async (lang) => {
  try {
    return await request("get", `${apiBaseUrl}/v1/category`, {
      country: lang,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getBoardList = async (lang, categoryId) => {
  try {
    const res = await request("get", `${apiBaseUrl}/v1/posts`, {
      country: lang,
      category: categoryId,
      page: 1,
      size: 100
    });
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const postLike = async (postId) => {
  try {
    return await request("post", `${apiBaseUrl}/v1/posts/${postId}/like`);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const postMark = async (postId) => {
  try {
    return await request("post", `${apiBaseUrl}/v1/posts/${postId}/mark`);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getComment = async (postId, lang) => {
  try {
    return await request("get", `${apiBaseUrl}/v1/posts/${postId}/comments`, {
      country: lang,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const postComment = async (postId, lang, comment) => {
  try {
    return await request(
      "post",
      `${apiBaseUrl}/v1/posts/${postId}/comments`,
      {
        country: lang,
      },
      {
        text: comment,
      }
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const postCommentLike = async (postId, commentId) => {
  try {
    return await request(
      "post",
      `${apiBaseUrl}/v1/posts/${postId}/comments/${commentId}/like`
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getDetail = async (postId, lang) => {
  try {
    return await request("get", `${apiBaseUrl}/v1/posts/${postId}`, {
      country: lang,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const postCommentReply = async (postId, lang, comment, commentId) => {
  try {
    return await request(
      "post",
      `${apiBaseUrl}/v1/posts/${postId}/comments/${commentId}`,
      {
        country: lang,
      },
      {
        text: comment,
      }
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};
