import { ReactNode } from 'react';
import AppLayout from './layouts/AppLayout/AppLayout';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { useAuth, useInitAuthState } from './hooks';

const App = (): ReactNode => {
    useInitAuthState();
    const { isAuthenticated } = useAuth();
    //const locale = new Intl.Locale('en-US');

    return (
        <BrowserRouter>
            <ConfigProvider
                //locale={locale}
                theme={{
                    token: {
                        colorPrimary: '#1677FF'
                    }
                }}
            >
                {isAuthenticated
                    ? <AppLayout/>
                    : <DefaultLayout/>
                }
            </ConfigProvider>
        </BrowserRouter>
    )
}

export default App;
