import { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { useAuth, useInitAuthState } from '@/hooks';
import { AppLayout, DefaultLayout } from '@/components'

const App = (): ReactNode => {
    useInitAuthState();
    const { isAuthenticated } = useAuth();
    //const locale = new Intl.Locale('en-US');

    return (
        <BrowserRouter>
            <ConfigProvider
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
