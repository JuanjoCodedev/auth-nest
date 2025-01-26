import { RolesEntity } from "./roles/roles.entity";

export interface Int_Auth_Response {
    uid: number,
    name: string,
    email: string,
    roles: RolesEntity,
    token: string,
    refreshToken: string,
}

export interface Int_Auth_Token_Response {
    message: string,
    tokenReset: string,
}