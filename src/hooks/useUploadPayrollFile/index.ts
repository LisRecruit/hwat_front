import { useMutation } from '@tanstack/react-query';
import { ApiManager } from '@/lib';
import { iUploadPayrollFileParams } from './types.ts';
import { useAuth } from '../useAuth';

export const useUploadPayrollFile = () => {
    const { authToken } = useAuth();

    return useMutation({
        mutationFn: ({ file, query }: iUploadPayrollFileParams) => {
            if (!authToken) throw new Error('Нет токена');

            return ApiManager.uploadPayrollFile({ file, query }, authToken)
        }
    });
};
