export namespace Authentication {
  export interface SignInResponse {
    uid: number;
    name: string;
    email: string;
    token: string;
    refreshToken: string;
  }

  export interface SignUpResponse {
    id: number;
    name: string;
    email: string;
    status: boolean;
  }

  export interface RefreshTokenResponse {
    token: string;
  }

  export interface ApiResponse<T> {
    message: string;
    data: T;
  }
}

