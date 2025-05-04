import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useUserStore } from '@/stores/useUserStore';

export const useInitAuthState = () => {
    const [cookies] = useCookies(['hwat_token']);

    const setToken = useUserStore(store => store.setToken);

    useEffect(() => {
        if (cookies.hwat_token) {
            setToken(cookies.hwat_token);
        }
    }, [cookies.hwat_token, setToken]);
};
