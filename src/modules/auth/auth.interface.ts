import { AccessLevelEntity } from "./access-level/access-level.entity";

export interface Int_Auth_Response {
    uid: number,
    name: string,
    email: string,
    roles: AccessLevelEntity,
    token: string,
    refreshToken: string,
}

export interface Int_Auth_Token_Response {
    message: string,
    tokenReset: string,
}