type Role = "ADMIN" | "USER";

interface User {
  username: string;
  role: Role;
}

interface OauthParmas {
  id: string;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
}
