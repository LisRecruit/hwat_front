import React from 'react';
import { includes } from 'lodash';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '@/stores/useUserStore.ts';
import type { iRoleProtectedRouteProps } from './types.ts';

export const RoleProtectedRoute: React.FC<iRoleProtectedRouteProps> = ({ children, requiredRole }) => {
    const { isAuthenticated, roles } = useUserStore();

    if (!isAuthenticated) return <Navigate to='/' />;
    if (requiredRole && !includes(roles, requiredRole)) return <Navigate to='/' />;

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
};
