/* eslint-disable camelcase */
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

class TokenManager {
  constructor() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (accessToken === null) {
      this.access_token = "";
    } else {
      try {
        this.access_token = JSON.parse(accessToken);
      } catch {
        this.access_token = "";
      }
    }

    if (refreshToken === null) {
      this.refresh_token = "";
    } else {
      try {
        this.refresh_token = JSON.parse(refreshToken);
      } catch {
        this.refresh_token = "";
      }
    }
  }

  get accessToken() {
    return this.access_token;
  }

  set accessToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(token));
    this.access_token = token;
  }

  get refreshToken() {
    return this.refresh_token;
  }

  set refreshToken(token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(token));
    this.refresh_token = token;
  }

  removeToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);

    this.access_token = "";
    this.refresh_token = "";
  }
}

export default new TokenManager();
