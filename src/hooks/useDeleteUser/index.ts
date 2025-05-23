import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiManager } from '@/lib';
import { useAuth } from '@/hooks';

export const useDeleteUser = () => {
    const { authToken } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => {
            if (!authToken) throw new Error('Нет токена');

            return ApiManager.deleteUser(authToken, id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users', authToken] });
        },
    });
};
