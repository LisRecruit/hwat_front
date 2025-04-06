import styles from './SignIn.module.scss';
import React, { useState } from 'react';
import { Button, Flex, Input, notification, Typography } from 'antd';
import { compact, map, mapValues, toPairs } from 'lodash';
import Validator from 'validatorjs';
import { ReactChangeEventType } from '@/types/ReactEventTypes.ts';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ApiManager, iUserLoginRequest } from '@/lib';
import { iLoginFormDataInitialState, LoginFormDataKeyTypes } from './types';
import { useMutation } from '@tanstack/react-query';

const cx = classNames.bind(styles);

const loginFormDataInitialState: iLoginFormDataInitialState = {
    email: { value: '', label: 'Email', placeholder: 'example@example.com', type: 'email', error: '' },
    password: { value: '', label: 'Password', placeholder: '', type: 'password', error: '' },
};

const loginFormDataValidationRules = {
    email: 'required|email',
    password: 'required|min:8|max:24',
};

export const SignIn: React.FC = () => {
    const [loginFormData, setLoginFormData] = useState<iLoginFormDataInitialState>(loginFormDataInitialState);
    const [notifications, notificationsContext] = notification.useNotification();

    const { mutate: dispatchLogin, isPending } = useMutation({
        mutationFn: (body: iUserLoginRequest) => ApiManager.login(body),
        onSuccess: (response) => {
            console.log('onSuccess', response)
        },
        onError: (error: Error) => {
            notifications.error({
                message: 'Authorization error',
                description: <Typography.Text>
                    {error.message}
                </Typography.Text>,
                showProgress: true,
                pauseOnHover: true,
            });
        },
    });

    const onClickSignInButton = () => {
        // const fakeToken = 'jwt-fake-token'
        // localStorage.setItem('token', fakeToken) // Или sessionStorage.setItem()
        // window.location.reload() // Перезагрузка страницы для обновления стейта

        const userData = mapValues(loginFormData, input => input.value);

        const validation = new Validator(userData, loginFormDataValidationRules);

        if (validation.fails()) {
            return setLoginFormData(prev => mapValues(prev, (values, key) => ({
                ...values,
                error: validation.errors.first(key) || ''
            })))
        }

        const isInputsHasErrors: boolean = !!compact(map(loginFormData, input => input.error)).length;

        if (isInputsHasErrors) {
            setLoginFormData(prev => mapValues(prev, input => ({
                ...input,
                error: ''
            })));
        }

        dispatchLogin({ username: 'user123', password: 'password123' });
    };

    const onChangeInput = (event: ReactChangeEventType): void => setLoginFormData(prev => ({
        ...prev,
        [event.target.name]: {
            ...prev[event.target.name as LoginFormDataKeyTypes],
            value: event.target.value
        }
    }));

    return (
        <Flex gap='small' vertical className={styles.form}>
            <Typography.Title level={4} className={styles.title}>
                Sign in
            </Typography.Title>

            {map(toPairs(loginFormData), ([key, input]) =>
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
                    onClick={onClickSignInButton}
                    loading={isPending}
                >
                    Sign in
                </Button>

                <Typography.Paragraph className={styles.message}>
                    <span>Don't have an account? </span>

                    <NavLink to='/sign-up'>
                        <span className={styles.link}>Sign up</span>
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