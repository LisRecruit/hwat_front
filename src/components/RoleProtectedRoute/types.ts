import { ReactNode } from 'react';

export interface iRoleProtectedRouteProps {
    children: ReactNode;
    requiredRole?: string;
}