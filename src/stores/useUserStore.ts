import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

interface iJwtPayload {
    user_id: number;
    roles: string[];
    sub: string;
    iat: number;
    exp: number;
}

interface iUserState {
    authToken: string | null;
    userId: number | null;
    roles: string[];
    isAuthenticated: boolean;
    setToken: (token: string) => void;
    clear: () => void;
}

export const useUserStore = create<iUserState>((set) => ({
    authToken: null,
    userId: null,
    roles: [],
    isAuthenticated: false,

    setToken: (token: string) => {
        try {
            const decoded = jwtDecode<iJwtPayload>(token);

            set({
                authToken: token,
                userId: decoded.user_id,
                roles: decoded.roles ?? [],
                isAuthenticated: true,
            });
        } catch {
            set({
                authToken: null,
                userId: null,
                roles: [],
                isAuthenticated: false
            });
        }
    },

    clear: () => {
        set({
            authToken: null,
            userId: null,
            roles: [],
            isAuthenticated: false,
        })
    },
}));
