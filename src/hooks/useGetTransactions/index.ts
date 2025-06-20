import { useQuery } from '@tanstack/react-query';
import { ApiManager } from '@/lib';
import { useAuth } from '@/hooks';

export const useGetTransactions = (
    page: number = 1,
    pageSize: number = 30,
) => {
    const { isAuthenticated, authToken } = useAuth();

    return {
        ...useQuery({
            queryKey: ['transactions', authToken, page, pageSize],
            queryFn: () => {
                if (!authToken) throw new Error('Нет токена');

                return ApiManager.getTransactionsList(authToken, page, pageSize);
            },
            enabled: isAuthenticated,
            retry: 1,
        })
    }
};