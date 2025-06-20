import { Route, Routes } from 'react-router';
import React from 'react';
import { SignIn } from '@/pages/SignIn';
import { SignUp } from '@/pages/SignUp';

const DefaultRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={
                <SignIn/>
            }/>
            <Route path='/sign-up' element={
                <SignUp/>
            }/>
            <Route path='*' element={
                <SignIn/>
            }/>
        </Routes>
    )
}

export default DefaultRoutes;