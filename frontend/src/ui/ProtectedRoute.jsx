import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '../features/authentication/useUser';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, isAdmin } = useUser();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) navigate('/login');
    if (adminOnly && !isAdmin) navigate('/'); // to make "unauthorized" page
  }, [isAuthenticated, isAdmin, isLoading, navigate, adminOnly]);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated || (adminOnly && !isAdmin))
    return <div>Unauthorized</div>;

  return children;
};

export default ProtectedRoute;
