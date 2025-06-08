import React, { useState } from 'react';
import {
    Flex,
    Typography,
    Upload,
    notification,
    Steps,
    type StepProps,
    Button,
    type UploadFile,
    DatePicker,
    InputNumber, Checkbox,
    type CheckboxProps,
} from 'antd';
import styles from './Dashboard.module.scss';
import { IoMdCloudUpload, IoIosSettings } from 'react-icons/io';
import Icon, { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { compact, map, mapValues, toNumber, toString } from 'lodash';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import dayjs, { Dayjs } from 'dayjs';
import type { iUploadFormDataInitialState, UploadFormDataKeyType } from '@/pages/Dashboard/types.ts';
import Validator from 'validatorjs';
import classNames from 'classnames';
import { useUploadPayrollFile } from '@/hooks';

const cx = classNames.bind(styles);

const DATE_FORMAT: string = 'MM.DD.YYYY';

const uploadFormDataInitialState: iUploadFormDataInitialState = {
    paymentDate: { value: '', error: '' },
    periodFrom: { value: '', error: '' },
    periodTo: { value: '', error: '' },
    subsidiaryInternalId: { value: '', error: '' },
    fees: { value: '', error: '' },
    otherCollections: { value: '', error: '' },
    isAccrual: { value: 'false', error: '' },
    accrualDays: { value: '', error: '' }
};

const uploadFormDataValidationRules = {
    paymentDate: 'required|min:1|max:10',
    periodFrom: 'required|min:1|max:10',
    periodTo: 'required|min:1|max:10',
    subsidiaryInternalId: 'required|min:1',
    accrualDays: 'required_if:isAccrual,true|integer|min:1|max:15',
};

const customMessages = {
    'required': 'This field is required',
    'required_if': 'This field is required',
    'min': 'This field must be between 1 and 15',
    'max': 'This field must be between 1 and 15'
};

const toDayJsFormatDate = (date: string): Dayjs | null => {
    return date
        ? dayjs(date, DATE_FORMAT)
        : null;
};

const toDateString = (date: Dayjs | null): string => {
    return date
        ? date.format(DATE_FORMAT)
        : '';
};

const Dashboard: React.FC = () => {
    const [notifications, notificationsContext] = notification.useNotification();

    const [current, setCurrent] = useState(0);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploadFormData, setUploadFormData] = useState<iUploadFormDataInitialState>(uploadFormDataInitialState);

    const uploadPayrollFile = useUploadPayrollFile();

    const onClickNextButton = () => setCurrent(current + 1);

    const onClickPrevButton = () => setCurrent(current - 1);

    const onDropBeforeUpload = (file: UploadFile) => {
        setFileList([file]);
        return false;
    };

    const onClickRemoveFile = () => setFileList([]);

    const onClickUploadButton = async () => {
        const file: UploadFile = fileList[0];


        if (!file) {
            notifications.error({
                message: 'Ошибка',
                description: 'Загруженный объект не является файлом'
            });
            return;
        }

        if (!(file instanceof File)) {
            notifications.error({
                message: 'Ошибка',
                description: 'Загруженный объект не является файлом'
            });
            return;
        }

        const userData = mapValues(uploadFormData, input => input.value);

        const validation = new Validator(userData, uploadFormDataValidationRules, customMessages);

        if (validation.fails()) {
            return setUploadFormData(prev => mapValues(prev, (values, key) => ({
                ...values,
                error: validation.errors.first(key) || ''
            })))
        }

        const isInputsHasErrors: boolean = !!compact(map(uploadFormData, input => input.error)).length;

        if (isInputsHasErrors) {
            setUploadFormData(prev => mapValues(prev, input => ({
                ...input,
                error: ''
            })));
        }

        const query: Record<string, string | number | boolean> = {
            paymentDate: userData.paymentDate,
            periodFrom: userData.periodFrom,
            periodTo: userData.periodTo,
            subsidiaryInternalId: Number(userData.subsidiaryInternalId),
            fees: parseFloat(userData.fees || '0'),
            otherCollections: parseFloat(userData.otherCollections || '0'),
            isAccrual: userData.isAccrual === 'true',
            accrualDays: parseInt(userData.accrualDays || '0')
        };

        uploadPayrollFile.mutate(
            { file, query },
            {
                onSuccess: () => {
                    notifications.success({
                        message: 'Upload successful',
                        description: 'Your payroll file was processed.'
                    });
                    setFileList([]);
                    setUploadFormData(uploadFormDataInitialState);
                },
                onError: (error: Error) => {
                    notifications.error({
                        message: 'Upload failed',
                        description: error.message
                    });
                }
            }
        );
    };

    const onChangeDatePicker = (field: UploadFormDataKeyType) => (date: Dayjs | null) => {
        setUploadFormData(prev => ({
            ...prev,
            [field]: { value: toDateString(date) }
        }));
    };

    const onChangeDateRangePicker = (fields: [UploadFormDataKeyType, UploadFormDataKeyType]) =>
        (dates: [Dayjs | null, Dayjs | null] | null) => {
            setUploadFormData(prev => ({
                ...prev,
                [fields[0]]: { value: toDateString(dates?.[0] ?? null) },
                [fields[1]]: { value: toDateString(dates?.[1] ?? null) },
            }));
        };

    const onChangeCheckbox: CheckboxProps['onChange'] = (event, ) => {
        setUploadFormData(prev => ({
            ...prev,
            isAccrual: { ...prev.isAccrual, value: toString(event.target.checked) }
        }))
    };

    const onChangeNumberInput = (field: UploadFormDataKeyType) => (value: number | null) => {
        setUploadFormData(prev => ({
            ...prev,
            [field]: { value: toString(value) }
        }));
    };

    const stepsList = [
        {
            title: 'Upload file',
            icon:  <Icon component={IoMdCloudUpload} className={styles.icon}/>,
            content: <Flex align='center' gap='large' vertical className={styles.content}>
                <Upload.Dragger
                    name='file'
                    multiple={false}
                    accept='.xlsx'
                    fileList={fileList}
                    beforeUpload={onDropBeforeUpload}
                    onRemove={onClickRemoveFile}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                    <p className='ant-upload-hint'>
                        Upload your .xlsx file (up to 246 MB). Hang tight — the download tab will be enabled once processing is complete.
                    </p>
                </Upload.Dragger>

                <Typography.Paragraph className={styles.uploadParagraph}>
                    By submitting data above, you are agreeing to our Terms of Service and Privacy Notice, and to the sharing of your Sample submission with the security community. Please do not submit any personal information; we are not responsible for the contents of your submission.
                </Typography.Paragraph>

            </Flex>
        },
        {
            title: 'Setup process',
            icon: <Icon component={IoIosSettings} className={styles.icon}/>,
            content: <Flex align='flex-start' gap='large' vertical>
                <Flex gap={2} vertical>
                    <Typography.Text>
                        Payment date:
                    </Typography.Text>
                    <DatePicker
                        format={DATE_FORMAT}
                        onChange={onChangeDatePicker('paymentDate')}
                        className={styles.input}
                        value={toDayJsFormatDate(uploadFormData.paymentDate.value)}
                    />
                    <Typography.Paragraph type='danger' className={cx(styles.paragraph, styles.error)}>
                        {uploadFormData.paymentDate.error}
                    </Typography.Paragraph>
                </Flex>
                <Flex gap={2} vertical>
                    <Typography.Text>
                        Period (From / To):
                    </Typography.Text>
                    <DatePicker.RangePicker
                        format={DATE_FORMAT}
                        onChange={onChangeDateRangePicker(['periodFrom', 'periodTo'])}
                        className={styles.input}
                        value={[
                            toDayJsFormatDate(uploadFormData.periodFrom.value),
                            toDayJsFormatDate(uploadFormData.periodTo.value),
                        ]}
                    />
                    <Typography.Paragraph type='danger' className={cx(styles.paragraph, styles.error)}>
                        {uploadFormData.periodFrom.error || uploadFormData.periodTo.error}
                    </Typography.Paragraph>
                </Flex>
                <Flex gap={2} vertical>
                    <Typography.Text>
                        Subsidiary internal id:
                    </Typography.Text>
                    <InputNumber
                        min={1}
                        onChange={onChangeNumberInput('subsidiaryInternalId')}
                        className={styles.input}
                        value={
                            toNumber(uploadFormData.subsidiaryInternalId.value) !== 0
                                ? toNumber(uploadFormData.subsidiaryInternalId.value)
                                : null
                        }
                    />
                    <Typography.Paragraph type='danger' className={cx(styles.paragraph, styles.error)}>
                        {uploadFormData.subsidiaryInternalId.error}
                    </Typography.Paragraph>
                </Flex>
                <Flex gap={2} vertical>
                    <Typography.Text>
                        Fees:
                    </Typography.Text>
                    <InputNumber
                        min={0}
                        max={1}
                        step={0.01}
                        precision={2}
                        onChange={onChangeNumberInput('fees')}
                        className={styles.input}
                        value={toNumber(uploadFormData.fees.value)}
                    />
                    <Typography.Paragraph type='danger' className={cx(styles.paragraph, styles.error)}>
                        {uploadFormData.fees.error}
                    </Typography.Paragraph>
                </Flex>
                <Flex gap={2} vertical>
                    <Typography.Text>
                        Other collections:
                    </Typography.Text>
                    <InputNumber
                        min={0}
                        max={1}
                        step={0.01}
                        precision={2}
                        onChange={onChangeNumberInput('otherCollections')}
                        className={styles.input}
                        value={toNumber(uploadFormData.otherCollections.value)}
                    />
                    <Typography.Paragraph type='danger' className={cx(styles.paragraph, styles.error)}>
                        {uploadFormData.otherCollections.error}
                    </Typography.Paragraph>
                </Flex>
                <Checkbox onChange={onChangeCheckbox}>Is accrual?</Checkbox>
                <Flex gap={2} vertical>
                    <Typography.Text>
                        Accrual days:
                    </Typography.Text>
                    <InputNumber
                        min={0}
                        onChange={onChangeNumberInput('accrualDays')}
                        className={styles.input}
                        value={
                            toNumber(uploadFormData.accrualDays.value) !== 0
                                ? toNumber(uploadFormData.accrualDays.value)
                                : null
                        }
                        disabled={!(uploadFormData.isAccrual.value !== 'false')}
                    />
                    <Typography.Paragraph type='danger' className={cx(styles.paragraph, styles.error)}>
                        {uploadFormData.accrualDays.error}
                    </Typography.Paragraph>
                </Flex>

            </Flex>
        },
    ];

    const stepsItemsDrawer: StepProps[] = map(stepsList, (item) => {
        return {
            key: item.title,
            title: item.title,
            icon: item.icon
        }
    });

    return (
       <Flex align='center' gap='large' vertical className={styles.container}>
           <Typography.Title level={2}>Automate your entire process</Typography.Title>
           <Typography.Text>Streamline routine tasks and focus on what matters most with smart automation</Typography.Text>
           <Steps
               current={current}
               items={stepsItemsDrawer}
               className={styles.steps}
           />

           {stepsList[current].content}

           <div style={{ marginTop: 24 }}>
               {current < stepsList.length - 1 &&
                   <Button
                       type='primary'
                       onClick={onClickNextButton}
                       icon={<MdNavigateNext/>}
                       disabled={fileList.length === 0}
                   >
                       Next step
                   </Button>
               }

               <Flex align='center' gap='small'>
                   {current > 0 &&
                       <Button
                           onClick={onClickPrevButton}
                           icon={<MdNavigateBefore/>}
                       >
                           Previous
                       </Button>
                   }
                   {current === stepsList.length - 1 &&
                       <Button
                           type='primary'
                           icon={<UploadOutlined/>}
                           onClick={onClickUploadButton}
                           disabled={fileList.length === 0}
                       >
                           Upload file
                       </Button>
                   }
               </Flex>
           </div>

           {notificationsContext}
       </Flex>
    )
}

export default Dashboard;