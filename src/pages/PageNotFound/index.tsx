import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const PageNotFound: React.FC = () => {
    const navigate = useNavigate();

    const onClickButton = () => {
        navigate('/');
    };

    return (
        <Result
            status="404"
            title="404 - Page not found"
            subTitle="The page you're looking for might have been moved, deleted, or never existed.
                Let’s get you back on track — try going home or check the menu for what you need."
            extra={
                <Button type='primary' onClick={onClickButton}>Back Home</Button>
            }
        />
    )
};

export default PageNotFound;