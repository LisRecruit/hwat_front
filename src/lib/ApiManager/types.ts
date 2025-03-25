export interface iUserLoginRequest {
    username: string,
    password: string,
}
export interface iLoginResponse {
    success: boolean;
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