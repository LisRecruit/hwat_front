import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { RoleProtectedRoute } from '@/components';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={
                <Suspense fallback={ <Spin size='large'/> }>
                    <Dashboard/>
                </Suspense>
            }/>
            <Route
                path='/admin-dashboard'
                element={
                    <RoleProtectedRoute requiredRole='ADMIN'>
                        <Suspense fallback={ <Spin size='large'/> }>
                            <AdminDashboard/>
                        </Suspense>
                    </RoleProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes;