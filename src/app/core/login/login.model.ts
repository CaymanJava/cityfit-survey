export interface LoginCredentials {
  username: string;
  password: string;
}

export class RefreshToken {
  refresh_token: string;
}

export class TokenInfo {

  access_token: string;

  token_type: string;

  refresh_token: string;

  expires_in: string;

  scope: string;
}
