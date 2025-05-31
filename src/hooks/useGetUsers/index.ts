import { useQuery } from '@tanstack/react-query';
import { ApiManager } from '@/lib';
import { useAuth } from '@/hooks';
import { useState } from 'react';

export const useGetUsers = (
    page: number = 1,
    pageSize: number = 30,
) => {
    const { isAuthenticated, authToken } = useAuth();

    const [approved, setApproved] = useState<boolean>(false);

    const onChangeUsersStatusListType = (value: boolean) => setApproved(value);

    return {
        ...useQuery({
            queryKey: ['users', authToken, page, pageSize, approved],
            queryFn: () => {
                if (!authToken) throw new Error('Нет токена');

                return ApiManager.getUsers(authToken, page, pageSize, approved);
            },
            enabled: isAuthenticated,
            retry: 1,
        }),
        onChangeUsersStatusListType
    }
};