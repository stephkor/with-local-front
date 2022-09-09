import { API_BASE_URL } from "../config/appConfig";
import { request } from "./index";

const apiBaseUrl = API_BASE_URL;

export const getGuAddress = async (mainAddressId) => {
  const url = `${apiBaseUrl}/v1/address/${mainAddressId}/gu`;

  try {
    return await request("get", url);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
