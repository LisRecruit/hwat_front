import { FC } from 'react';
import styles from './AdminDashboard.module.scss';
import { iUnApprovedUser } from '@/lib';
import { useDeleteUser, useGetUnApprovedUsers, useSwitchAccessUser } from '@/hooks';
import { Avatar, Button, Dropdown, Flex, Table, TableColumnsType, Typography, Tag } from 'antd';
import Icon from '@ant-design/icons';
import { head, split, upperCase, capitalize, map } from 'lodash';
import { ImCross } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
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
    const { data: fetchedUnapprovedUsersResponse, isLoading, error } = useGetUnApprovedUsers();
    const { mutate: dispatchDeleteUser } = useDeleteUser();
    const { mutate: dispatchSwitchAccessUser } = useSwitchAccessUser();

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка при загрузке пользователей</div>;

    const onClickApproveUser = (record: iUnApprovedUser) => dispatchSwitchAccessUser(record.id);
    const onClickDeleteUser = (record: iUnApprovedUser) => dispatchDeleteUser(record.id);

    const columns: TableColumnsType<iUnApprovedUser> = [
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
            title: 'Enabled',
            render: (value) => value
                ? <Icon component={FaCheck} className={styles.check}/>
                : <Icon component={ImCross} className={styles.cross}/>
        },
        {
            key: 'roles',
            dataIndex: 'roleNames',
            title: 'Roles',
            render: (roles) => map(roles, (role, index) => {
                return <Tag color={getRandomColor(index, tagColorsList)}>{role}</Tag>
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
                                {
                                    key: 'approve',
                                    label: 'Approve',
                                    icon: <Icon component={AiFillCheckCircle} className={styles.icon}/>,
                                    onClick: () => onClickApproveUser(record),
                                },
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
        <div>
            <Table
                columns={columns}
                dataSource={fetchedUnapprovedUsersResponse?.users ?? []}
                scroll={{ x: 600 }}
                pagination={{
                    pageSize: 25
                }}
            />
        </div>
    )
};

export default AdminDashboard;