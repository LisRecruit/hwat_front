interface iMessageResponse {
    message: string
}
export interface iUserLoginRequest {
    username: string,
    password: string,
}
export interface iUserLoginResponse extends iMessageResponse {
    token?: string;
    error?: string;
}
export interface iUserRegistrationRequest {
    username: string,
    password: string
}
export interface iUserRegistrationResponse extends iMessageResponse {
    token: string,
    userResponse: {
        id: number,
        username: string,
        enabled: boolean,
        roleIds: number[]
    }
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
export type iDeleteUserResponse = iMessageResponse

export type iSwitchAccessUserResponse = iMessageResponse

export interface iUploadPayrollFileRequest {
    file: File,
    query: Record<string, string | number | boolean>
}
export interface iUploadPayrollFileResponse extends iMessageResponse {
    transactionId: number,
}