import styles from './SignIn.module.scss';
import React, { useState } from 'react';
import { Button, Flex, Input, notification, Typography } from 'antd';
import { compact, lowerCase, map, mapValues, toPairs } from 'lodash';
import Validator from 'validatorjs';
import type { ReactChangeEventType } from '@/types/ReactEventTypes.ts';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ApiManager,  type iUserLoginRequest } from '@/lib';
import type { iLoginFormDataInitialState, LoginFormDataKeyTypes } from './types';
import { useMutation } from '@tanstack/react-query';
import { useAuthCookies } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/useUserStore.ts';

const cx = classNames.bind(styles);

const loginFormDataInitialState: iLoginFormDataInitialState = {
    username: { value: '', label: 'Username', placeholder: '', type: 'text', error: '' },
    password: { value: '', label: 'Password', placeholder: '', type: 'password', error: '' },
};

const loginFormDataValidationRules = {
    username: 'required|min:3|max:18',
    password: 'required|min:8|max:24',
};

export const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const { setAuthCookies } = useAuthCookies();

    const [loginFormData, setLoginFormData] = useState<iLoginFormDataInitialState>(loginFormDataInitialState);
    const [notifications, notificationsContext] = notification.useNotification();

    const { mutate: dispatchLogin, isPending } = useMutation({
        mutationFn: (body: iUserLoginRequest) => ApiManager.login(body),
        onSuccess: (response) => {
            if (response.token) {
                setAuthCookies(response.token);
                useUserStore.getState().setToken(response.token);
                navigate('/');
            }
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

        dispatchLogin({
            username: lowerCase(userData.username),
            password: userData.password
        });
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