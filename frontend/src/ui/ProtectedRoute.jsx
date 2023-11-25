import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '../features/authentication/useUser';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
