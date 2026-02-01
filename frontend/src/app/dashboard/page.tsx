'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import TaskList from '../../components/tasks/TaskList';
import { useAuth } from '../../hooks/useAuth';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('auth_user');
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  /* ---------------- Loading State ---------------- */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-pink-50 flex flex-col">
        <nav className="flex items-center justify-between px-8 py-6 bg-white/70 backdrop-blur border-b border-gray-200">
          <div className="text-xl font-bold text-indigo-600">
            Todo<span className="text-pink-500">.</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-500">
            <span>Loading</span>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-500 border-t-transparent" />
          </div>
        </nav>

        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  /* ---------------- Dashboard ---------------- */
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-pink-50 flex flex-col">
        
        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur border-b border-gray-200">
          <div className="text-xl font-bold text-indigo-600 tracking-tight">
            Todo<span className="text-pink-500">.</span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-sm text-gray-600">
              Welcome, <span className="font-semibold">{user?.username}</span>
            </span>

            <button
              onClick={async () => {
                await logout();
                router.push('/login');
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Main */}
        <main className="flex-grow px-6 py-10">
          <div className="max-w-5xl mx-auto">
            
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Task Dashboard
              </h1>
              <p className="text-gray-500 mt-2">
                Manage your tasks and stay productive
              </p>
            </div>

            {/* Task List Card */}
            <div className="rounded-2xl bg-white shadow-lg border border-gray-200 p-6">
              <TaskList userId={user?.id || ''} />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}