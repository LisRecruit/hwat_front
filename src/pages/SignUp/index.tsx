import styles from './SignUp.module.scss';
import { FC, useState } from 'react';
import { Button, Flex, Input, notification, Typography } from 'antd';
import { capitalize, compact, map, mapValues } from 'lodash';
import Validator from 'validatorjs';
import { ReactChangeEventType } from '../../types/ReactEventTypes';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ApiManager } from '../../lib';
import { iRegistrationFormDataInitialState, RegistrationFormDataKeyTypes } from './types';

const cx = classNames.bind(styles);

const registrationFormDataInitialState: iRegistrationFormDataInitialState = {
    username: { value: '', label: 'Username', placeholder: '', type: 'text', error: '' },
    //email: { value: '', label: 'Email', placeholder: 'example@example.com', type: 'email', error: '' },
    password: { value: '', label: 'Password', placeholder: '', type: 'password', error: '' },
    confirmPassword: { value: '', label: 'Confirm password', placeholder: '', type: 'password', error: '' },
};
const registrationFormDataValidationRules = {
    username: 'required|min:3|max:18',
    //email: 'required|email',
    password: 'required|min:8|max:24',
    confirmPassword: 'required|min:8|max:24|same:password'
};
const SignUp: FC = () => {
    const [registrationFormData, setRegistrationFormData] = useState<iRegistrationFormDataInitialState>(registrationFormDataInitialState);
    const [notifications, notificationsContext] = notification.useNotification();
    const [isLoadingRegisterButton, setIsLoadingRegisterButton] = useState(false);

    const onChangeInput = (event: ReactChangeEventType): void => setRegistrationFormData(prev => ({
        ...prev,
        [event.target.name]: {
            ...prev[event.target.name as RegistrationFormDataKeyTypes],
            value: event.target.value
        }
    }));

    const onClickSignUpButton = async (): Promise<void> => {
        const userData = mapValues(registrationFormData, input => input.value);

        const validation = new Validator(userData, registrationFormDataValidationRules);

        if (validation.fails()) {
            return setRegistrationFormData(prev => mapValues(prev, (values, key) => ({
                ...values,
                error: validation.errors.first(key) || ''
            })))
        }

        const isInputsHasErrors: boolean = !!compact(map(registrationFormData, input => input.error)).length;

        if (isInputsHasErrors) {
            setRegistrationFormData(prev => mapValues(prev, input => ({
                ...input,
                error: ''
            })));
        }

        setIsLoadingRegisterButton(true);

        const registrationUserResult = await ApiManager.registration({
            username: capitalize(userData.username),
            password: userData.password
        });

        console.log('registrationUserResult', registrationUserResult)
        setIsLoadingRegisterButton(false);

        if (registrationUserResult.userResponse) {
            notifications.success({
                key: 'successUserRegistration',
                message: 'Success',
                description: 'Created new user!',
                showProgress: true,
                pauseOnHover: true,
                duration: null
            });
        }
    };

    return (
        <Flex gap='small' vertical className={styles.form}>
            <Typography.Title level={4} className={styles.title}>
                Sign up
            </Typography.Title>

            {map(registrationFormData, (input, key: RegistrationFormDataKeyTypes) =>
                <Flex gap='small' vertical key={key}>
                    <Typography.Paragraph className={styles.paragraph}>
                        {input.label}
                    </Typography.Paragraph>

                    {input.type !== 'password'
                        ? <Input
                            name={key}
                            placeholder={input.placeholder}
                            type={input.type}
                            value={input.value}
                            onChange={onChangeInput}
                        />
                        : <Input.Password
                            name={key}
                            placeholder={input.placeholder}
                            value={input.value}
                            onChange={onChangeInput}
                        />
                    }

                    <Typography.Paragraph type='danger' className={cx(styles.paragraph, styles.error)}>
                        {input.error}
                    </Typography.Paragraph>
                </Flex>
            )}

            <Flex gap='middle' vertical>
                <Button
                    type='primary'
                    size='large'
                    onClick={onClickSignUpButton}
                    loading={isLoadingRegisterButton}
                >
                    Sign up
                </Button>

                <Typography.Paragraph className={styles.message}>
                    <span>Don't have an account? </span>

                    <NavLink to='/'>
                        <span className={styles.link}>Sign in</span>
                    </NavLink>
                </Typography.Paragraph>
                <Typography.Paragraph className={styles.message}>
                    <NavLink to='/forgot-password'>
                        <span className={styles.link}>Forgot your password?</span>
                    </NavLink>
                </Typography.Paragraph>
            </Flex>

            {notificationsContext}
        </Flex>
    )
}

export default SignUp;