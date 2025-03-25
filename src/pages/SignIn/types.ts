export type LoginFormDataKeyTypes = 'email' | 'password';

export type iLoginFormDataInitialState = {
    [Key in LoginFormDataKeyTypes]: {
        value: string;
        label: string;
        placeholder: string;
        type: 'email' | 'password';
        error: string
    };
};