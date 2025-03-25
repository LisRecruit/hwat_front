import {
    iUserLoginBody,
    iLoginResponse,
    iUserLoginRequest,
    iUserRegistrationRequest,
    iUserRegistrationResponse
} from './types';

export class ApiManager {
    private static async post<T>(url: string, body?: object): Promise<T> {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : undefined,
        });

        const responseJson = await response.json();

        if (response.ok) {
            console.log('%cResponse json:', 'color:lightgreen', responseJson);
        } else {
            console.log('%cResponse failed:', 'color:indianred', responseJson);
        }

        return responseJson;
    }
    private static async get<T>(url: string): Promise<T> {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const responseJson = await response.json();

        if (response.ok) {
            console.log('%cResponse json:', 'color:lightgreen', responseJson);
        } else {
            console.log('%cResponse failed:', 'color:indianred', responseJson);
        }

        return responseJson;
    }

    static login(body: iUserLoginRequest): Promise<iLoginResponse> {
        return this.post<iLoginResponse>('http://localhost:9999/api/v1/auth/login', body);
    }
    static registration(body: iUserRegistrationRequest): Promise<iUserRegistrationResponse> {
        return this.post<iUserRegistrationResponse>('http://localhost:9999/api/v1/auth/registration', body);
    }
}