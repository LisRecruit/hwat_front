export type LoginFormDataKeyTypes = 'username' | 'password';

export type iLoginFormDataInitialState = {
    [Key in LoginFormDataKeyTypes]: {
        value: string;
        label: string;
        placeholder: string;
        type: 'text' | 'password';
        error: string
    };
};