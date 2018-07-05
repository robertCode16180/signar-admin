export interface LoginResponse {

  access_token: string;
  expiration: number;

}

export interface IdToken {

  sub: string;
  nameid: string;

}
