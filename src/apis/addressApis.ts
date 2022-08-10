import { API_BASE_URL } from "../config/app";
import { request } from "./index";

const apiBaseUrl = API_BASE_URL;

export const getGuAddress = async (mainAddressId: number) => {
  const url = `${apiBaseUrl}/v1/address/${mainAddressId}/gu`;

  try {
    return await request("get", url);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
