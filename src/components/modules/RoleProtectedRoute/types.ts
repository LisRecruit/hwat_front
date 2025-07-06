import React from 'react';

export interface iRoleProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: string;
}