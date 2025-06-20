import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { RoleProtectedRoute, Spinner } from '@/components';
import { MainPage } from '@/pages/MainPage';

const ProcessPayroll = lazy(() => import('@/pages/ProcessPayroll'));
const Admin = lazy(() => import('pages/Admin'));
const PageNotFound = lazy(() => import('@/pages/PageNotFound'));

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={
                <MainPage/>
            }/>
            <Route
                path='/admin/*'
                element={
                    <RoleProtectedRoute requiredRole='ADMIN'>
                        <Suspense fallback={ <Spinner/> }>
                            <Admin/>
                        </Suspense>
                    </RoleProtectedRoute>
                }
            />
            <Route path='/process-payroll/*' element={
                <Suspense fallback={ <Spinner/> }>
                    <ProcessPayroll/>
                </Suspense>
            }/>

            <Route path='/process-payroll' element={ <Navigate replace to='/process-payroll/upload'/> }/>
            <Route path='/admin' element={ <Navigate replace to='/admin/unapproved'/> }/>

            <Route path='*' element={
                <Suspense fallback={ <Spinner/> }>
                    <PageNotFound/>
                </Suspense>
            }/>
        </Routes>
    )
}

export default AppRoutes;