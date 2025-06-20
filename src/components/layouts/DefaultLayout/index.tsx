import React from 'react';
import styles from './DefaultLayout.module.scss';
import { Flex } from 'antd';
import DefaultRoutes from '@/routes/DefaultRoutes.tsx';

export const DefaultLayout: React.FC = () => {
    return (
        <Flex justify='center' align='center' className={styles.container}>
            <div className={styles.form}>
                <DefaultRoutes/>
            </div>
        </Flex>
    )
}