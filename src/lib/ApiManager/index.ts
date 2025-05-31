import {
    iUserLoginResponse,
    iUserLoginRequest,
    iUserRegistrationRequest,
    iUserRegistrationResponse,
    iDeleteUserResponse, iSwitchAccessUserResponse, iGetUsersResponse
} from './types';

export class ApiManager {
    static API_URL = import.meta.env.VITE_API_URL;
    static API_URL_ADMIN = `${this.API_URL}/admin`;

    private static async post<T>(url: string, body?: object): Promise<T> {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
                ? JSON.stringify(body)
                : undefined,
        });

        const responseJson = await response.json();

        if (!response.ok) {
            throw new Error(responseJson.message || 'Request failed');
        }

        return responseJson;
    }
    private static async get<T>(url: string, token?: string): Promise<T> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers
        });

        const responseJson = await response.json();

        if (!response.ok) {
            throw new Error(responseJson.message || 'Request failed');
        }

        return responseJson;
    }

    private static async delete<T>(url: string, token?: string): Promise<T> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: 'DELETE',
            headers
        });

        const responseJson = await response.json();

        if (!response.ok) {
            throw new Error(responseJson.message || 'Request failed');
        }

        return responseJson;
    }
    private static async patch<T>(url: string, token?: string): Promise<T> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: 'PATCH',
            headers
        });

        const responseJson = await response.json();

        if (!response.ok) {
            throw new Error(responseJson.message || 'Request failed');
        }

        return responseJson;
    }

    static login(body: iUserLoginRequest): Promise<iUserLoginResponse> {
        return this.post<iUserLoginResponse>(this.API_URL + '/auth/login', body);
    }
    static registration(body: iUserRegistrationRequest): Promise<iUserRegistrationResponse> {
        return this.post<iUserRegistrationResponse>(this.API_URL + '/auth/registration', body);
    }
    static getUsers(authToken: string, page: number, pageSize: number, approved: boolean): Promise<iGetUsersResponse> {
        return this.get<iGetUsersResponse>(`${this.API_URL_ADMIN}/users/listAll?page=${page}&pageSize=${pageSize}&approved=${approved}`, authToken);
    }
    static deleteUser(authToken: string, id: number): Promise<iDeleteUserResponse> {
        return this.delete<iDeleteUserResponse>(this.API_URL_ADMIN + `/users/${id}`, authToken)
    }
    static switchAccessUser(authToken: string, id: number): Promise<iSwitchAccessUserResponse> {
        return this.patch<iSwitchAccessUserResponse>(this.API_URL_ADMIN + `/users/switchAccess/${id}`, authToken)
    }
}