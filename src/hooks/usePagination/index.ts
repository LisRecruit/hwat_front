import { useState } from 'react';
import { iPaginationState } from './types.ts';

export const usePagination = (
    initialState: iPaginationState = { page: 1, pageSize: 30 }
) => {
    const [pagination, setPagination] = useState<iPaginationState>(initialState);

    const onChangePagination = (newPage: number, newPageSize?: number) => {
        setPagination(prev => ({
            page: newPage,
            pageSize: newPageSize ?? prev.pageSize,
        }));
    };

    return {
        pagination,
        setPagination,
        onChangePagination,
    };
};
