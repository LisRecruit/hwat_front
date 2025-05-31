import { FC } from 'react';
import styles from './AdminDashboard.module.scss';
import type { iUser } from '@/lib';
import { useDeleteUser, useSwitchAccessUser, useGetUsers, usePagination } from '@/hooks';
import { Avatar, Button, Dropdown, Flex, Table, type TableColumnsType, Typography, Tag, Tabs, type TabsProps } from 'antd';
import Icon from '@ant-design/icons';
import { head, split, upperCase, capitalize, map, toString } from 'lodash';
import { ImCross } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import { MdDeleteForever, MdCancel } from 'react-icons/md';
import { HiDotsVertical } from 'react-icons/hi';
import { AiFillCheckCircle } from 'react-icons/ai';

const userAvatarColorsList: string[] = [
    'var(--color-brand)',
    'var(--color-green)',
    'var(--color-red)',
];
const tagColorsList: string[] = [
    'magenta',
    'green',
    'red',
    'purple',
    'geekblue',
    'volcano'
];

const getRandomColor = (index: number, colorsSchema: string[]): string => {
    return colorsSchema[index % colorsSchema.length];
};

const AdminDashboard: FC = () => {
    const { pagination, onChangePagination } = usePagination();

    const { data: fetchedUsersResponse, isLoading, error, onChangeUsersStatusListType } = useGetUsers(
        pagination.page,
        pagination.pageSize
    );
    const { mutate: dispatchDeleteUser } = useDeleteUser();
    const { mutate: dispatchSwitchAccessUser } = useSwitchAccessUser();
    console.log('isLoading', isLoading)
    if (error) return <div>Ошибка при загрузке пользователей</div>;

    const onClickApproveUser = (record: iUser) => dispatchSwitchAccessUser(record.id);
    const onClickDeleteUser = (record: iUser) => dispatchDeleteUser(record.id);

    const onChangeSelectedTab = (key: string): void => {
       switch (key) {
           case 'unapproved':
               return onChangeUsersStatusListType(false);
           case 'approved':
               return onChangeUsersStatusListType(true);
           default:
               return;
       }
    };

    const columns: TableColumnsType<iUser> = [
        {
            key: 'id',
            dataIndex: 'id',
            title: 'Id',
            render: (id) => <Typography.Text>{id}</Typography.Text>,
            width: 80
        },
        {
            key: 'username',
            dataIndex: 'username',
            title: 'User',
            render: (username, _, index) => <Flex align='center' gap='small'>
                <Avatar size={40} style={{ backgroundColor: getRandomColor(index, userAvatarColorsList) }}>
                    {upperCase(head(split(username, '')))}
                </Avatar>
                <Typography.Text>{capitalize(username)}</Typography.Text>
            </Flex>,
        },
        {
            key: 'enabled',
            dataIndex: 'enabled',
            title: 'Approved',
            render: (value) => value
                ? <Icon component={FaCheck} className={styles.check}/>
                : <Icon component={ImCross} className={styles.cross}/>
        },
        {
            key: 'roles',
            dataIndex: 'roleNames',
            title: 'Roles',
            render: (roles) => map(roles, (role, index) => {
                return <Tag key={role} color={getRandomColor(index, tagColorsList)}>{role}</Tag>
            })
        },
        {
            key: 'action',
            title: 'Actions',
            render: (_, record) =>
                <Flex align='center' justify='flex-end'>
                    <Dropdown
                        menu={{
                            items: [
                                record.enabled
                                    ? {
                                        key: 'unapprove',
                                        label: 'Unapprove',
                                        icon: <Icon component={MdCancel} className={styles.icon}/>,
                                        onClick: () => onClickApproveUser(record),
                                    }
                                    : {
                                        key: 'approve',
                                        label: 'Approve',
                                        icon: <Icon component={AiFillCheckCircle} className={styles.icon}/>,
                                        onClick: () => onClickApproveUser(record),
                                    }
                                ,
                                {
                                    key: 'delete',
                                    label: 'Delete',
                                    icon: <Icon component={MdDeleteForever} className={styles.icon}/>,
                                    onClick: () => onClickDeleteUser(record),
                                    danger: true,
                                },
                            ]
                        }}
                        placement='bottomRight'
                        trigger={['click']}
                        arrow
                    >
                        <Button type='text'>
                            <Icon component={HiDotsVertical} className={styles.actionIcon}/>
                        </Button>
                    </Dropdown>
                </Flex>,
            width: 100
        },
    ];

    const tabsList: TabsProps['items'] = [
        {
            key: 'unapproved',
            label: 'Unapproved',
            children: fetchedUsersResponse &&
                <Table
                    columns={columns}
                    dataSource={fetchedUsersResponse.users}
                    rowKey={(record) => toString(record.id)}
                    scroll={{ x: 600 }}
                    loading={isLoading}
                    pagination={{
                        current: fetchedUsersResponse.page,
                        total: fetchedUsersResponse.total,
                        pageSize: fetchedUsersResponse.pageSize,
                        showSizeChanger: true,
                        onChange: onChangePagination,
                    }}
                />
        },
        {
            key: 'approved',
            label: 'Approved',
            children: fetchedUsersResponse &&
                <Table
                    columns={columns}
                    dataSource={fetchedUsersResponse.users}
                    rowKey={(record) => toString(record.id)}
                    scroll={{ x: 600 }}
                    loading={isLoading}
                    pagination={{
                        current: fetchedUsersResponse.page,
                        total: fetchedUsersResponse.total,
                        pageSize: fetchedUsersResponse.pageSize,
                        showSizeChanger: true,
                        onChange: onChangePagination,
                    }}
                />
        },
    ];

    return (
        <Tabs
            onChange={onChangeSelectedTab}
            type='card'
            items={tabsList}
        />
    )
};

export default AdminDashboard;