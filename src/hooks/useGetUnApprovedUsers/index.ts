import { useQuery } from '@tanstack/react-query';
import { ApiManager } from '@/lib';
import { useAuth } from '@/hooks';

export const useGetUnApprovedUsers = () => {
    const { isAuthenticated, authToken } = useAuth();

    return useQuery({
        queryKey: ['users', authToken],
        queryFn: () => {
            if (!authToken) throw new Error('Нет токена');

            return ApiManager.getUnapprovedUsers(authToken);
        },
        enabled: isAuthenticated,
        retry: 1,
    })
};