import { useQuery } from '@tanstack/react-query';
import { ApiManager } from '@/lib';
import { useAuth } from '@/hooks';
import type { iUseGetUsersProps } from './types.ts';

export const useGetUsers = ({ page, pageSize, isRequestGetApprovedUsers }: iUseGetUsersProps) => {
    const { isAuthenticated, authToken } = useAuth();

    return {
        ...useQuery({
            queryKey: ['users', authToken, page, pageSize, isRequestGetApprovedUsers],
            queryFn: () => {
                if (!authToken) throw new Error('Нет токена');

                return ApiManager.getUsers(authToken, page, pageSize, isRequestGetApprovedUsers);
            },
            enabled: isAuthenticated,
            retry: 1,
        })
    }
};