import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuthStore from '../../store/auth.store';
import { isAdmin, isSuperAdmin, getRoleNames } from '../../utils/auth.utils';
import { userAPI } from '../../service/api.auth';
import type { User } from '../../types/user.types';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const response = await userAPI.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoadingUsers(false);
      }
    };

    if (user && isAdmin(user)) {
      fetchUsers();
    }
  }, [user]);

  if (!user || !isAdmin(user)) {
    return (
      <div className="container py-8">
        <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 text-center backdrop-blur-sm">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" fill="currentColor" className="text-red-400" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h2>
          <p className="text-white/80">Administrator privileges required.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-base opacity-70 mt-2">
          Welcome, {user.username}! Your role: {getRoleNames(user.role)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* User Management - Super Admin Only */}
        {isSuperAdmin(user) && (
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-white/20">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-2xl">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm opacity-70 mb-1">
                    User Management
                  </div>
                  <div className="text-xl font-semibold">
                    Manage user roles
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5">
              <Link to="/admin/users" className="text-indigo-500 font-medium text-sm hover:text-indigo-400 transition-colors">
                View all users →
              </Link>
            </div>
          </div>
        )}

        {/* Product Management - Admin and Super Admin */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-white/20">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-2xl">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-sm opacity-70 mb-1">
                  Product Management
                </div>
                <div className="text-xl font-semibold">
                  Manage products
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5">
            <Link to="/products" className="text-indigo-500 font-medium text-sm hover:text-indigo-400 transition-colors">
              View products →
            </Link>
          </div>
        </div>

        {/* System Stats */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-white/20">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-2xl">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div>
                <div className="text-sm opacity-70 mb-1">
                  System Statistics
                </div>
                <div className="text-xl font-semibold">
                  View analytics
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5">
            <span className="text-indigo-500 font-medium text-sm opacity-60 cursor-default">
              Coming soon
            </span>
          </div>
        </div>
      </div>

      {/* Role Information */}
      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6 mt-8">
        <h3 className="text-indigo-400 text-xl font-semibold mb-4">Your Permissions</h3>
        <ul className="space-y-2">
          <li className="text-base opacity-90 flex items-center gap-2">
            <span className="text-green-500 font-bold">✓</span>
            Access admin dashboard
          </li>
          <li className="text-base opacity-90 flex items-center gap-2">
            <span className="text-green-500 font-bold">✓</span>
            Manage products
          </li>
          {isSuperAdmin(user) && (
            <>
              <li className="text-base opacity-90 flex items-center gap-2">
                <span className="text-green-500 font-bold">✓</span>
                Manage user roles
              </li>
              <li className="text-base opacity-90 flex items-center gap-2">
                <span className="text-green-500 font-bold">✓</span>
                View all users
              </li>
              <li className="text-base opacity-90 flex items-center gap-2">
                <span className="text-green-500 font-bold">✓</span>
                Promote clients to admin
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Admin Users Section */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Admin Users</h3>
          {isSuperAdmin(user) && (
            <Link 
              to="/admin/users" 
              className="text-indigo-500 font-medium text-sm hover:text-indigo-400 hover:underline transition-colors"
            >
              View all users →
            </Link>
          )}
        </div>
        
        {loadingUsers ? (
          <div className="p-6 text-center opacity-80">Loading users...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users
              .filter((u) => u.role === 'admin' || u.role === 'super_admin')
              .map((adminUser) => (
                <div 
                  key={adminUser._id} 
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg transition-all hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="w-12 h-12 min-w-[3rem] rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-xl font-bold text-white">
                    {adminUser.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="font-semibold text-base truncate">{adminUser.username}</div>
                    <div className="text-sm opacity-70 truncate">{adminUser.email}</div>
                    <span
                      className={`inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        adminUser.role === 'super_admin' 
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {getRoleNames(adminUser.role)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

