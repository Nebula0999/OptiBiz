import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authAPI, businessAPI } from '@/lib/api';
import { logout, setBusiness, setLoading, setUser } from '@/store/authSlice';

function firstResult(response) {
  const data = response?.data;
  if (Array.isArray(data)) return data[0] || null;
  if (Array.isArray(data?.results)) return data.results[0] || null;
  return data || null;
}

export function AuthBootstrap({ children }) {
  const dispatch = useDispatch();
  const { business, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token || (user && business)) {
      dispatch(setLoading(false));
      return;
    }

    let isMounted = true;
    dispatch(setLoading(true));

    Promise.all([authAPI.getCurrentUser(), businessAPI.getMe()])
      .then(([userResponse, businessResponse]) => {
        if (!isMounted) return;
        dispatch(setUser(userResponse.data));
        dispatch(setBusiness(firstResult(businessResponse)));
      })
      .catch(() => {
        if (!isMounted) return;
        dispatch(logout());
      })
      .finally(() => {
        if (isMounted) {
          dispatch(setLoading(false));
        }
      });

    return () => {
      isMounted = false;
    };
  }, [business, dispatch, user]);

  return children;
}
