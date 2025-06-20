import React from 'react';
import styles from './Transactions.module.scss';
import { Button, Dropdown, Flex, Table, type TableColumnsType, Typography } from 'antd';
import { useDeleteTransaction, useDownloadTransaction, useGetTransactions, usePagination } from '@/hooks';
import type { iTransaction } from '@/lib';
import { toString } from 'lodash';
import { MdDeleteForever } from 'react-icons/md';
import Icon from '@ant-design/icons';
import { HiDotsVertical } from 'react-icons/hi';
import { MdSimCardDownload } from "react-icons/md";

const Transactions: React.FC = () => {
    const { pagination, onChangePagination } = usePagination();

    const { data: fetchedTransactionsResponse, isLoading, error } = useGetTransactions(
        pagination.page,
        pagination.pageSize
    );

    const { mutate: dispatchDeleteTransaction } = useDeleteTransaction();
    const { mutate: dispatchDownloadTransaction } = useDownloadTransaction();

    if (error) return <div>Error while loading transactions</div>;

    const onClickDeleteTransaction = (record: iTransaction) => dispatchDeleteTransaction(record.id);
    const onClickDownloadTransaction = (record: iTransaction, needUploadFile: boolean, needGmrFile: boolean) => dispatchDownloadTransaction({
        id: record.id,
        needUploadFile,
        needGmrFile
    });

    const columns: TableColumnsType<iTransaction> = [
        {
            key: 'id',
            dataIndex: 'id',
            title: 'Id',
            render: (id) => <Typography.Text>{id}</Typography.Text>,
            width: 80
        },
        {
            key: 'date',
            dataIndex: 'date',
            title: 'Date',
            render: (date) => <Typography.Text>{date}</Typography.Text>,
            width: 120
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
                                    key: 'download_file',
                                    label: 'Download file',
                                    icon: <Icon component={MdSimCardDownload} className={styles.icon}/>,
                                    onClick: () => onClickDownloadTransaction(record, true, false),
                                },
                                {
                                    key: 'download_gmr_file',
                                    label: 'Download GMR file',
                                    icon: <Icon component={MdSimCardDownload} className={styles.icon}/>,
                                    onClick: () => onClickDownloadTransaction(record, false, true),
                                },
                                {
                                    key: 'download_both',
                                    label: 'Download both files',
                                    icon: <Icon component={MdSimCardDownload} className={styles.icon}/>,
                                    onClick: () => onClickDownloadTransaction(record, true, true),
                                },
                                {
                                    key: 'delete',
                                    label: 'Delete',
                                    icon: <Icon component={MdDeleteForever} className={styles.icon}/>,
                                    onClick: () => onClickDeleteTransaction(record),
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
        fetchedTransactionsResponse &&
        <Table
            columns={columns}
            dataSource={fetchedTransactionsResponse.transactions}
            rowKey={(record) => toString(record.id)}
            scroll={{ x: 600 }}
            loading={isLoading}
            pagination={{
                current: fetchedTransactionsResponse.page,
                total: fetchedTransactionsResponse.total,
                pageSize: fetchedTransactionsResponse.pageSize,
                showSizeChanger: true,
                onChange: onChangePagination,
            }}
        />
    )
}
export default Transactions;