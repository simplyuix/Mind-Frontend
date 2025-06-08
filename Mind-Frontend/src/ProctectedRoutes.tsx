import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from './Api';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!authAPI.isAuthenticated()) {
            navigate('/signin');
        }
    }, [navigate]);

    if (!authAPI.isAuthenticated()) {
        return null;
    }

    return <>{children}</>;
}