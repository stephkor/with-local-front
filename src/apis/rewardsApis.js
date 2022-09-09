import { API_BASE_URL } from "../config/appConfig";
import { request } from "./index";

export const fetchRewardApi = async () => {
  const url = `${API_BASE_URL}/v1/rewards`;

  try {
    const res = await request("get", url);
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
