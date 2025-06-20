import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProcessPayrollLayout, Spinner } from '@/components';

const UploadFile = lazy(() => import('pages/ProcessPayroll/UploadFile'));
const Transactions = lazy(() => import('pages/ProcessPayroll/Transactions'));

const ProcessPayroll: React.FC =  () => {
    return (
        <ProcessPayrollLayout>
            <Routes>
                <Route path='/upload' element={
                    <Suspense fallback={ <Spinner/> }>
                        <UploadFile/>
                    </Suspense>
                }/>
                <Route
                    path='/transactions' element={
                        <Suspense fallback={ <Spinner/> }>
                            <Transactions/>
                        </Suspense>
                    }
                />
            </Routes>
        </ProcessPayrollLayout>
    )
}
export default ProcessPayroll;