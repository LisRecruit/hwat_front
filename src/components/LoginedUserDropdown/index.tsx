import { FC } from 'react';
import styles from './LoginedUserDropdown.module.scss';
import { compact } from 'lodash';
import { BsDatabaseFillGear } from 'react-icons/bs';
import { Avatar, Badge, MenuProps,  Dropdown, Button, Flex, Typography } from 'antd';
import { PiUserCircleGearDuotone } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import { iUserAvatarProps } from './types';
import { useAuth, useAuthCookies } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/useUserStore.ts';
import Icon from '@ant-design/icons';

export const LoginedUserDropdown: FC<iUserAvatarProps> = ({ username, email }) => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const { removeAuthCookies } = useAuthCookies();

    const onClickSignOutButton = () => {
        removeAuthCookies();
        useUserStore.getState().clear();
        navigate('/');
    };

    const dropdownMenu: MenuProps['items'] = compact([
        {
            key: 'email',
            label: <Flex gap={2} vertical>
                <Typography.Text className={styles.username}>{username}</Typography.Text>
                <Typography.Text>{email}</Typography.Text>
            </Flex>,
            disabled: true,
        },
        {
            key: 'divider-top',
            type: 'divider',
        },
        isAdmin && {
            key: 'admin',
            label: <NavLink to='/admin-dashboard' className={styles.link}>
                Admin
            </NavLink>,
            icon: <Icon component={BsDatabaseFillGear} className={styles.icon}/>,
            className: styles.row
        },
        {
            key: 'settings',
            label:  <NavLink to='/settings' className={styles.link}>
                Settings
            </NavLink>,
            icon:  <Icon component={IoMdSettings} className={styles.icon}/>,
            className: styles.row
        },
        {
            key: 'divider-bottom',
            type: 'divider',
        },
        {
            key: 'sign-out',
            label: <Button
                type='primary'
                className={styles.button}
                onClick={onClickSignOutButton}
            >
                Sign out
            </Button>,
            disabled: true
        },
    ]);

    return (
        <Dropdown
            menu={{ items: dropdownMenu }}
            placement='bottomRight'
            arrow
            trigger={['click']}
        >
            <Badge dot>
                <Avatar shape='square' size={40} className={styles.avatar} icon={<PiUserCircleGearDuotone/>}/>
            </Badge>
        </Dropdown>
    )
};