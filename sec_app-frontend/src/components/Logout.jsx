import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsAuthenticated }) => {
    const navigateTo = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');

        setIsAuthenticated(false);

        navigateTo('/login');
    }, [navigateTo, setIsAuthenticated]);

    return null;
};

export default Logout;
