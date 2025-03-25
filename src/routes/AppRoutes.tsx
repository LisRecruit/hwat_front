import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={
                <Suspense fallback={ <Spin size='large'/> }>
                    <Dashboard/>
                </Suspense>
            }/>
            <Route path='/test' element={
                <Suspense fallback={ <Spin size='large'/> }>
                    <div>test</div>
                </Suspense>
            }/>
        </Routes>
    )
}

export default AppRoutes;