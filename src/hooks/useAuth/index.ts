import { useUserStore } from '@/stores/useUserStore';
import { includes } from 'lodash';

export const useAuth = () => {
    const { isAuthenticated, roles, userId, authToken } = useUserStore();

    return {
        isAuthenticated,
        isAdmin: includes(roles,'ADMIN'),
        userId,
        roles,
        authToken
    };
};