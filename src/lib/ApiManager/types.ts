export interface iUserLoginRequest {
    username: string,
    password: string,
}
export interface iUserLoginResponse {
    message: string;
    token?: string;
    error?: string;
}
export interface iUserRegistrationRequest {
    username: string,
    password: string
}
export interface iUserRegistrationResponse {
    token: string,
    userResponse: {
        id: number,
        username: string,
        enabled: boolean,
        roleIds: number[]
    },
    message: string
}
export interface iUser {
    id: number,
    username: string,
    enabled: boolean,
    roleNames: string[]
}
export interface iGetUsersResponse {
    users: iUser[],
    page: number,
    pageSize: number,
    total: number
}
export interface iDeleteUserResponse {
    message: string,
}
export interface iSwitchAccessUserResponse {
    message: string,
}