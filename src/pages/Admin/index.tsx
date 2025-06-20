import React, { lazy, Suspense } from 'react';
import { AdminLayout, Spinner } from '@/components';
import { Route, Routes } from 'react-router-dom';

const Unapproved = lazy(() => import('pages/Admin/Unapproved'));
const Approved = lazy(() => import('pages/Admin/Approved'));

const AdminDashboard: React.FC = () => {
    return (
        <AdminLayout>
            <Routes>
                <Route path='/unapproved' element={
                    <Suspense fallback={ <Spinner/> }>
                        <Unapproved/>
                    </Suspense>
                }/>
                <Route
                    path='/approved' element={
                    <Suspense fallback={ <Spinner/> }>
                        <Approved/>
                    </Suspense>
                }
                />
            </Routes>
        </AdminLayout>
    )
};

export default AdminDashboard;