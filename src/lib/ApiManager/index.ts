import type {
    iUserLoginResponse,
    iUserLoginRequest,
    iUserRegistrationRequest,
    iUserRegistrationResponse,
    iDeleteUserResponse,
    iSwitchAccessUserResponse,
    iGetUsersResponse,
    iUploadPayrollFileRequest,
    iUploadPayrollFileResponse, iGetTransactionsListResponse, iDeleteTransactionResponse
} from './types';

export class ApiManager {
    static API_URL = import.meta.env.VITE_API_URL;
    static API_URL_ADMIN = `${this.API_URL}/admin`;

    private static async post<T>(url: string, body?: object, token?: string): Promise<T> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers,
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

    private static async uploadFilePost<T>(url: string, body: FormData, token?: string): Promise<T> {
        const headers: Record<string, string> = {};

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body
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

    private static async downloadFileGet<T = Blob>(url: string, token?: string): Promise<T> {
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

        if (!response.ok) {
            throw new Error(await response.text() || 'Request failed');
        }

        return await response.blob() as T; // <- получаем файл
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

    // static async uploadPayrollFile(body: iUploadPayrollFileRequest, authToken: string): Promise<iUploadPayrollFileResponse> {
    //     const formData = new FormData();
    //     formData.append('file', body.file);
    //
    //     const queryString = new URLSearchParams(
    //         Object.entries(body.query).map(([k, v]) => [k, String(v)])
    //     ).toString();
    //
    //     return this.uploadFilePost<iUploadPayrollFileResponse>(this.API_URL + `/payroll/upload?${queryString}`, formData, authToken);
    // }

    static async uploadPayrollFile(body: iUploadPayrollFileRequest, authToken: string): Promise<iUploadPayrollFileResponse> {
        const formData = new FormData();
        formData.append('file', body.file);

        // Добавляем все поля из body.query в formData как строки
        Object.entries(body.query).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

        return this.uploadFilePost<iUploadPayrollFileResponse>(
            this.API_URL + '/payroll/upload',
            formData,
            authToken
        );
    }
    static getTransactionsList(authToken: string, page: number, pageSize: number): Promise<iGetTransactionsListResponse> {
        return this.get<iGetTransactionsListResponse>(`${this.API_URL}/payroll/listAll?page=${page}&pageSize=${pageSize}`, authToken);
    }
    static deleteTransaction(authToken: string, id: number): Promise<iDeleteTransactionResponse> {
        return this.delete<iDeleteTransactionResponse>(this.API_URL + `/payroll/delete/${id}`, authToken)
    }
    static downloadTransactionFile(authToken: string, id: number, needUploadFile: boolean, needGmrFile: boolean): Promise<Blob> {
        return this.downloadFileGet<Blob>(this.API_URL + `/payroll/download/${id}?needUploadFile=${needUploadFile}&needGmrFile=${needGmrFile}`, authToken)
    }
}