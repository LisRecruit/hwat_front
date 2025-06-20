import React from 'react';
import styles from './MainPage.module.scss';
import { Typography, Flex } from 'antd';

export const MainPage: React.FC = () => {
    return (
       <Flex align='center' vertical className={styles.container}>
           <Typography.Title
               level={2}
           >
               Welcome!
           </Typography.Title>
           <Typography.Text>
               We're glad you're here. Explore the features and tools designed to help you work smarter and more efficiently.
           </Typography.Text>
       </Flex>
    )
}