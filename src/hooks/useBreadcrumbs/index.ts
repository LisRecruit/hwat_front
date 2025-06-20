import { createContext, useContext, useEffect } from 'react';
import type { Context } from './types';

export const BreadcrumbsContext = createContext<Context>({
    trailingPath: '',
    setTrailingPath: () => {},
});

export const useBreadcrumbs = (trailingPath: string) => {
    const context = useContext(BreadcrumbsContext);

    useEffect(() => {
        context.setTrailingPath(trailingPath);

        return () => context.setTrailingPath('');
    }, [trailingPath, context]);
};