import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, History, User, LogOut } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  onLogout?: () => void;
}

export function Layout({ children, onLogout }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Prediksi', icon: Activity },
    { path: '/history', label: 'Histori', icon: History },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-gray-900">HealthPredict</h1>
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-1 py-4 border-b-2 transition-colors ${
                    isActive
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>
    </div>
  );
}