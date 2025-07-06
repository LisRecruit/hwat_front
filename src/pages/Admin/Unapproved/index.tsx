import React from 'react';
import { useDeleteUser, useGetUsers, usePagination, useSwitchAccessUser } from '@/hooks';
import { Avatar, Button, Dropdown, Flex, Table, type TableColumnsType, Tag, Typography } from 'antd';
import type { iUser } from '@/lib';
import { capitalize, head, map, split, toString, upperCase } from 'lodash';
import Icon from '@ant-design/icons';
import { FaCheck } from 'react-icons/fa';
import styles from '@/pages/Admin/Admin.module.scss';
import { ImCross } from 'react-icons/im';
import { MdCancel, MdDeleteForever } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
import { HiDotsVertical } from 'react-icons/hi';

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

const Unapproved: React.FC = () => {
    const { pagination, onChangePagination } = usePagination();

    const { data: fetchedUsersResponse, isLoading, error } = useGetUsers({
        page: pagination.page,
        pageSize: pagination.pageSize,
        isRequestGetApprovedUsers: false
    });

    const { mutate: dispatchDeleteUser } = useDeleteUser();
    const { mutate: dispatchSwitchAccessUser } = useSwitchAccessUser();

    if (error) return <div>Error while loading users</div>;

    const onClickApproveUser = (record: iUser) => dispatchSwitchAccessUser(record.id);
    const onClickDeleteUser = (record: iUser) => dispatchDeleteUser(record.id);

    const columns: TableColumnsType<iUser> = [
        {
            key: 'id',
            dataIndex: 'id',
            title: 'Id',
            render: (id) => <Typography.Text>{id}</Typography.Text>,
            width: 80
        },
        {
            key: 'userName',
            dataIndex: 'userName',
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

    return (
        fetchedUsersResponse &&
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
    )
}
export default Unapproved;