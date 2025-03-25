import styles from './SignIn.module.scss';
import { FC, useState } from 'react';
import { Button, Flex, Input, Typography } from 'antd';
import { map } from 'lodash';
//import Validator from 'validatorjs';
import { ReactChangeEventType } from '../../types/ReactEventTypes';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ApiManager } from '../../lib';
import { iLoginFormDataInitialState, LoginFormDataKeyTypes } from './types';

const cx = classNames.bind(styles);

const loginFormDataInitialState: iLoginFormDataInitialState = {
    email: { value: '', label: 'Email', placeholder: 'example@example.com', type: 'email', error: '' },
    password: { value: '', label: 'Password', placeholder: '', type: 'password', error: '' },
};
// const loginFormDataValidationRules = {
//     email: 'required|email',
//     password: 'required|min:8|max:24',
// };
const SignIn: FC = () => {
    const [loginFormData, setLoginFormData] = useState<iLoginFormDataInitialState>(loginFormDataInitialState);
    //const [notifications, notificationsContext] = notification.useNotification();
    const [isLoadingLoginButton] = useState(false);

    const onClickSignInButton = () => {
        // const fakeToken = 'jwt-fake-token'
        // localStorage.setItem('token', fakeToken) // Или sessionStorage.setItem()
        // window.location.reload() // Перезагрузка страницы для обновления стейта

        ApiManager.login({ username: 'user123', password: 'password123' })
    };

    const onChangeInput = (event: ReactChangeEventType): void => setLoginFormData(prev => ({
        ...prev,
        [event.target.name]: {
            ...prev[event.target.name as LoginFormDataKeyTypes],
            value: event.target.value
        }
    }));

    // const onClickLoginButton = async (): Promise<void> => {
    //     setIsLoadingLoginButton(true);
    //
    //     const userData = mapValues(loginFormData, input => input.value);
    //
    //     const validation = new Validator(userData, loginFormDataValidationRules);
    //     console.log('validation', validation)
    //     if (validation.fails()) {
    //         return setLoginFormData(prev => mapValues(prev, (values, key) => ({
    //             ...values,
    //             error: validation.errors.first(key) || ''
    //         })))
    //     }
    //
    //     const isInputsHasErrors: boolean = !!compact(map(loginFormData, input => input.error)).length;
    //
    //     if (isInputsHasErrors) {
    //         setLoginFormData(prev => mapValues(prev, input => ({
    //             ...input,
    //             error: ''
    //         })));
    //     }
    //
    //     const loginUserResult = setTimeout(() => {}, 1500);
    //
    //     setIsLoadingLoginButton(false);
    // };

    return (
        <Flex gap='small' vertical className={styles.form}>
            <Typography.Title level={4} className={styles.title}>
                Sign in
            </Typography.Title>

            {map(loginFormData, (input, key: LoginFormDataKeyTypes) =>
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
                    loading={isLoadingLoginButton}
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
        </Flex>
    )
}

export default SignIn;