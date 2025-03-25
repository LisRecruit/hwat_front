import { FC } from 'react';
import { Button } from 'antd';
const Dashboard: FC = () => {
    const handleLogout = () => {
        localStorage.removeItem('token') // Удаляем токен
        window.location.reload() // Перезагрузка страницы
    };

    return (
        <div>
            <h1>Welcome to Dashboard</h1>
            <Button type='primary' onClick={handleLogout}>Log Out</Button>
        </div>
    )
}

export default Dashboard;