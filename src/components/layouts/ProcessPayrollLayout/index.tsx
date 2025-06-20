import React from 'react';
import styles from './ProcessPayrollLayout.module.scss';
import { Layout, Menu, type MenuProps } from 'antd';
import type { iProcessPayrollLayoutProps } from './types.ts';
import { FaMoneyCheckDollar, FaFileCsv } from 'react-icons/fa6';
import Icon from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const sidebarItems: MenuProps['items'] = [
    {
        key: '/process-payroll/upload',
        icon: <Icon component={FaFileCsv} className={styles.icon}/>,
        label: 'Upload file',
    },
    {
        key: '/process-payroll/transactions',
        icon: <Icon component={FaMoneyCheckDollar} className={styles.icon}/>,
        label: 'Transactions',
    }
];

export const ProcessPayrollLayout: React.FC<iProcessPayrollLayoutProps> = ({ children }) => {
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