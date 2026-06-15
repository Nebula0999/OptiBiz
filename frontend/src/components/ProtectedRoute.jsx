import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoadingPage } from '@/components/ui/Loading';

export function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated && !localStorage.getItem('access_token')) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export function PublicRoute({ children }) {
  const isAuthenticated = localStorage.getItem('access_token');

  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return children;
}
