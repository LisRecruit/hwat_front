import React from 'react';
import styles from './AdminLayout.module.scss';
import { Layout, Menu, type MenuProps } from 'antd';
import type { iAdminLayoutProps } from './types.ts';
import { FaUserCheck, FaUserXmark } from 'react-icons/fa6';
import Icon from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const sidebarItems: MenuProps['items'] = [
    {
        key: '/admin/unapproved',
        icon: <Icon component={FaUserXmark} className={styles.icon}/>,
        label: 'Unapproved',
    },
    {
        key: '/admin/approved',
        icon: <Icon component={FaUserCheck} className={styles.icon}/>,
        label: 'Approved',
    }
];

export const AdminLayout: React.FC<iAdminLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Layout>
            <Layout.Sider width={240}>
                <Menu
                    mode='inline'
                    defaultSelectedKeys={['upload']}
                    selectedKeys={[location.pathname]}
                    items={sidebarItems}
                    className={styles.menu}
                    onClick={({ key }) => navigate(key)}
                />
            </Layout.Sider>
            <Layout.Content className={styles.content}>
                {children}
            </Layout.Content>
        </Layout>
    )
}