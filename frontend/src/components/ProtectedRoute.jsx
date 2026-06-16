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

export function OnboardingRoute({ children }) {
  const token = localStorage.getItem("access_token");
  const registrationComplete =
    localStorage.getItem("registration_complete") === "true";

  if (!token) {
    return <Navigate to="/register" replace />;
  }

  if (token && registrationComplete) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return children;
}

export function OnboardingRouteTwo({ children }) {
  const token = localStorage.getItem("access_token");
  const registrationComplete =
    localStorage.getItem("registration_complete") === "true";

  if (!token) {
    return <Navigate to="/registerbiz" replace />;
  }

  if (token && registrationComplete) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return children;
}

export function LandingRoute({ children }) {
  const token = localStorage.getItem("access_token");
  const registrationComplete =
    localStorage.getItem("registration_complete") === "true";

  if (token && !registrationComplete) {
    return <Navigate to="/registerbiz" replace />;
  }

   if (token && registrationComplete) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return children;
} 

