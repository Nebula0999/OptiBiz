import { Bell, User, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import { useNotifications } from '@/hooks';
import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';

export function Header() {
  const { business, user } = useSelector((state) => state.auth);
  const { data: notifications } = useNotifications();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(' ');

  const unreadCount = notifications?.results?.filter(
    (n) => !n.is_read
  ).length || 0;

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/home';
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          {business?.name || 'Dashboard'}
        </h2>

        <div className="flex items-center gap-6">
          {/* Notifications */}
          <div className="relative">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} />
              {unreadCount > 0 && (
                <Badge
                  variant="danger"
                  size="sm"
                  className="absolute -top-1 -right-1 rounded-full w-5 h-5 flex items-center justify-center p-0"
                >
                  {unreadCount}
                </Badge>
              )}
            </button>
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-semibold">
                {(fullName || user?.email || 'U').charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                {fullName || user?.email}
              </span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <a
                  href="/app/settings"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <User size={16} />
                  <span>Profile</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-left"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
