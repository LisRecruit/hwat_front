import { useState, useEffect } from 'react';

// Функция для получения токена (из localStorage или sessionStorage)
const getToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
};

// Хук для проверки авторизации
export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = getToken()
        setIsAuthenticated(!!token) // Преобразуем в `true/false`
    }, []);

    return { isAuthenticated };
};