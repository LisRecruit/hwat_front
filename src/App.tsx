import { ReactNode } from 'react';
import AppLayout from './Layouts/AppLayout/AppLayout';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import DefaultLayout from './Layouts/DefaultLayout/DefaultLayout';
import { useAuth } from './hooks';

const App = (): ReactNode => {
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
                <div>
                    {isAuthenticated
                        ? <AppLayout/>
                        : <DefaultLayout/>
                    }
                </div>
            </ConfigProvider>
        </BrowserRouter>
    )
}

export default App;
