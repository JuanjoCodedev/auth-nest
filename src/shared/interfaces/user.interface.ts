export interface User extends Request {
  user: {
    uid: number;
  };
}

export enum RoleEnum {
  ADMIN = 1,
  MEMBER = 2,
}
