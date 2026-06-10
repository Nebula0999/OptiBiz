import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoadingPage } from '@/components/ui/Loading';

export function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated && !localStorage.getItem('access_token')) {
    navigate('/login');
    return null;
  }

  return children;
}

export function PublicRoute({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('access_token');

  if (isAuthenticated) {
    navigate('/app/dashboard');
    return null;
  }

  return children;
}
