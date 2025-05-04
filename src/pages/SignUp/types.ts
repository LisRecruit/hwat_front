export type RegistrationFormDataKeyTypes = 'username' | 'password' | 'confirmPassword';

export type iRegistrationFormDataInitialState = {
    [Key in RegistrationFormDataKeyTypes]: {
        value: string;
        label: string;
        placeholder: string;
        type: 'text' | 'password',
        error: string
    };
};