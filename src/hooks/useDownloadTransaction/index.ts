import { useMutation } from '@tanstack/react-query';
import { ApiManager } from '@/lib';
import { useAuth } from '@/hooks';
import type { iDownloadTransactionRequestParams } from './types.ts';

export const useDownloadTransaction = () => {
    const { authToken } = useAuth();

    return useMutation({
        mutationFn: ({ id, needUploadFile, needGmrFile }: iDownloadTransactionRequestParams) => {
            if (!authToken) throw new Error('Нет токена');

            return ApiManager.downloadTransactionFile(authToken, id, needUploadFile, needGmrFile);
        },
        onSuccess: (blob, variables) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            if (variables.needUploadFile || variables.needGmrFile) {
                link.download = `transaction-${variables.id}.csv`;
            }
            if (variables.needUploadFile && variables.needGmrFile) {
                link.download = `transaction-${variables.id}.zip`;
            }

            link.click();

            URL.revokeObjectURL(url); // очищаем ссылку
        },
    });
};
