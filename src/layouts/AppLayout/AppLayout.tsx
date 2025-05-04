//import { lazy } from 'react';
import styles from './AppLayout.module.scss';
import { Breadcrumb, Layout, Menu, Flex, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import AppRoutes from '../../routes/AppRoutes';
import { LoginedUserDropdown } from '../../components';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout

//const Dashboard = lazy(() => import('../../pages/Dashboard/Dashboard'))

const menu = [
    { key: 1, label: 'Interlude', icon: <AppstoreOutlined/> },
    { key: 2, label: 'High Five', icon: <SettingOutlined/> },
];

const breadcrumbs = [
    {
        title: <HomeOutlined/>,
        path: '/'
    },
    {
        title: 'App',
        path: 'App'
    }
];

const AppLayout = () => {
    return (
        <Layout className={styles.container}>
            <Header className={styles.header}>
                <Flex justify='space-between' align='center' gap='large' className={styles.row}>
                    <Typography.Title level={1} className={styles.logo}>
                        Company name
                    </Typography.Title>
                    <Menu
                        theme='dark'
                        mode='horizontal'
                        //defaultSelectedKeys={['1']}
                        items={menu}
                        style={{ flex: 1, minWidth: 0 }}
                    />
                    <LoginedUserDropdown
                        username='Sheppard'
                        email='sheppard@gmail.com'
                    />
                </Flex>
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb
                    items={breadcrumbs}
                    className={styles.breadcrumbs}
                />
                <div className={styles.content}>
                    <AppRoutes/>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Copyright © {new Date().getFullYear()}. All rights reserved.
            </Footer>
        </Layout>
    )
}
export default AppLayout;