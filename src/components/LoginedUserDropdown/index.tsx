import { FC } from 'react';
import styles from './LoginedUserDropdown.module.scss';
import { compact } from 'lodash';
import { BsDatabaseFillGear } from 'react-icons/bs';
import { Avatar, Badge, MenuProps,  Dropdown, Button, Flex, Typography } from 'antd';
import { PiUserCircleGearDuotone } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import { iUserAvatarProps } from './types';
import { IconWrapper } from '../IconWrapper';

export const LoginedUserDropdown: FC<iUserAvatarProps> = ({ username, email, isAdmin }) => {

    const onClickLogoutButton = (): void => {};

    const dropdownMenu: MenuProps['items'] = compact([
        {
            key: 'email',
            label: <Flex gap={2} vertical>
                <Typography.Text className={styles.username}>{username}</Typography.Text>
                <Typography.Text className={styles.email}>{email}</Typography.Text>
            </Flex>,
            disabled: true,
        },
        {
            key: 'divider',
            type: 'divider',
        },
        isAdmin && {
            key: 'admin',
            label: <NavLink to='/admin' className={styles.link}>
                Admin
            </NavLink>,
            icon: <IconWrapper width={20} height={20} className={styles.icon}>
                <BsDatabaseFillGear/>
            </IconWrapper>,
            className: styles.row
        },
        {
            key: 'settings',
            label:  <NavLink to='/resources-setup' className={styles.link}>
                Settings
            </NavLink>,
            icon: <IconWrapper width={20} height={20} className={styles.icon}>
                <IoMdSettings/>
            </IconWrapper>,
            className: styles.row
        },
        {
            key: 'divider',
            type: 'divider',
        },
        {
            key: 'sign-out',
            label: <Button
                type='primary'
                className={styles.button}
                onClick={onClickLogoutButton}
            >
                Sign out
            </Button>,
            disabled: true
        },
    ]);

    return (
        <Dropdown menu={{ items: dropdownMenu }} placement='bottomRight' arrow>
            <Badge dot>
                <Avatar shape='square' size={40} className={styles.avatar} icon={<PiUserCircleGearDuotone/>}/>
            </Badge>
        </Dropdown>
    )
};