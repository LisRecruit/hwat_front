import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { Spin } from 'antd';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const DefaultRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={
                <Suspense fallback={ <Spin size='large'/> }>
                    <SignIn/>
                </Suspense>
            }/>
            <Route path='/sign-up' element={
                <Suspense fallback={ <Spin size='large'/> }>
                    <SignUp/>
                </Suspense>
            }/>
        </Routes>
    )
}

export default DefaultRoutes;