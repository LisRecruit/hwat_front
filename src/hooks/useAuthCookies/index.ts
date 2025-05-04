import { useCookies } from 'react-cookie';

export const useAuthCookies = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['hwat_token']);

    const setAuthCookies = (value: string) => {
        setCookie('hwat_token', value, {
            path: '/',
            maxAge: 60 * 60,
            sameSite: 'strict',
            secure: import.meta.env.MODE !== 'development',
        });
    };

    const removeAuthCookies = () => {
        removeCookie('hwat_token', { path: '/' });
    };

    return {
        authToken: cookies.hwat_token,
        setAuthCookies,
        removeAuthCookies
    };
};