import React from 'react';
import styles from './Spinner.module.scss';
import { Spin, Flex } from 'antd';

export const Spinner: React.FC = () => {
    return (
        <Flex justify='center' align='center' className={styles.container}>
            <Spin size='large'/>
        </Flex>
    )
}