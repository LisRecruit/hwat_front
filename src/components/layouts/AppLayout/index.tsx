import React, { useMemo, useState } from 'react';
import styles from './AppLayout.module.scss';
import { Layout, Flex, Typography } from 'antd';
import { AccountCard, Breadcrumbs } from '@/components';
import AppRoutes from '@/routes/AppRoutes.tsx';
import { BreadcrumbsContext } from '@/hooks';
import { useLocation } from 'react-router-dom';
import { filter, join, map, slice, split, toString } from 'lodash';

const { Header, Content, Footer } = Layout

export const AppLayout: React.FC = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const [trailingPath, setTrailingPath] = useState('');

    const context = useMemo(() => ({
        trailingPath,
        setTrailingPath,
    }), [trailingPath]);

    const pathNames = filter(split(pathname,'/'), (path) => path);
    const pathItems = map(pathNames, (path, i) => ({
        name: toString(path),
        path: '/' + join(slice(pathNames,0, i + 1),'/'),
    }));

    return (
        <Layout className={styles.container}>
            <Header className={styles.header}>
                <Flex justify='space-between' align='center' gap='large' className={styles.row}>
                    <Typography.Title level={1} className={styles.logo}>
                        HWAT
                    </Typography.Title>

                    <AccountCard/>
                </Flex>
            </Header>
            <BreadcrumbsContext.Provider value={context}>
                <Content style={{ padding: '0 48px' }}>
                    <Breadcrumbs
                        pathItems={pathItems}
                    />
                    <div className={styles.content}>
                        <AppRoutes/>
                    </div>
                </Content>
            </BreadcrumbsContext.Provider>
            <Footer style={{ textAlign: 'center' }}>
                Copyright © {new Date().getFullYear()}. All rights reserved.
            </Footer>
        </Layout>
    )
}