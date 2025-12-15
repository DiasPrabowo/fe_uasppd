import { useState } from 'react';
import { Activity } from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple validation
    if (username === 'testing' && password === 'testing123') {
      setTimeout(() => {
        onLogin(username, password);
        setIsLoading(false);
      }, 500);
    } else {
      setTimeout(() => {
        setError('Username atau password salah');
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-lg mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-2">HealthPredict</h1>
          <p className="text-gray-600">
            Silakan login untuk melanjutkan
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-600 focus:border-purple-600 outline-none"
                placeholder="Masukkan username"
                autoComplete="username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-600 focus:border-purple-600 outline-none"
                placeholder="Masukkan password"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Memproses...' : 'Login'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-2">Demo Credentials:</p>
            <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-700">
              <p><span className="text-gray-500">Username:</span> testing</p>
              <p><span className="text-gray-500">Password:</span> testing123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
