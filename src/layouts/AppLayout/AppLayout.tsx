import styles from './AppLayout.module.scss';
import { Breadcrumb, Layout, Flex, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { LoginedUserDropdown } from '@/components';
import AppRoutes from '@/routes/AppRoutes.tsx';

const { Header, Content, Footer } = Layout

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
                        HWAT
                    </Typography.Title>

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