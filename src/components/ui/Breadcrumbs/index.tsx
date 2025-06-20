import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { map } from 'lodash';
import type { iBreadcrumbsProps } from './types';
import { NavLink } from 'react-router-dom';

export const Breadcrumbs: React.FC<iBreadcrumbsProps> = ({ pathItems }) => {

    const breadcrumbs = map([{ name: <HomeOutlined />, path: '/' }, ...pathItems], data => {
        return { title: <NavLink to={data.path}>{data.name}</NavLink> }
    });

    return (
        <Breadcrumb
            items={breadcrumbs}
            className={styles.breadcrumbs}
        />
    );
};