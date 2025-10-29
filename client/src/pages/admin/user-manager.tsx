import { useEffect, useState } from "react";
import { userAPI } from "@/service/api.auth";

import {
  getRoleNames,
  getAvailableRoles,
  isSuperAdmin,
  isAdmin,
} from "@/utils/auth.utils";
import useAuthStore from "../../store/auth.store";
import type { User, UserRole } from "@/types/user.types";

export default function UserManager() {
  const {
    user: currentUser,
    error,
    setError,
    users,
    setUsers,
    changingRole,
    setChangingRole,
  } = useAuthStore();

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setInitialLoading(true);
        const response = await userAPI.getAllUsers();
        setUsers(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch users");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchUsers();
  }, [setUsers, setError]);

  const handleRoleChange = async (
    userId: string,
    newRole: "client" | "admin"
  ) => {
    
    try {
      setChangingRole(userId);
      await userAPI.changeUserRole(userId, newRole);

      // Update local state
      setUsers(
        users?.map((user) =>
          user._id === userId
            ? { ...user, role: newRole as UserRole }
            : (user as User)
        ) ?? []
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to change user role"
      );
    } finally {
      setChangingRole(null);
    }
  };

  if (initialLoading) {
    return (
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-lg opacity-80">Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="bg-red-500/10 text-red-400 px-6 py-4 rounded-xl border border-red-500/20 flex items-center gap-2 justify-center">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  if (!currentUser || !isAdmin(currentUser)) {
    return (
      <div className="container py-8">
        <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 text-center backdrop-blur-sm">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" fill="currentColor" className="text-red-400" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h2>
          <p className="text-white/80">Admin privileges required.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          User Management
        </h1>
        <p className="text-white/60">Manage user roles and permissions</p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-indigo-600/20 border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/90">User</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/90">Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/90">Current Role</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/90">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr 
                  key={user._id} 
                  className={`border-b border-white/5 transition-all hover:bg-white/[0.05] last:border-b-0 ${
                    index % 2 === 0 ? 'bg-white/[0.02]' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-indigo-500/20">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="font-semibold text-sm">{user.username}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white/70">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold capitalize shadow-sm ${
                        user.role === "super_admin"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                          : user.role === "admin"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                          : "bg-green-500/20 text-green-300 border border-green-500/40"
                      }`}
                    >
                      {getRoleNames(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {isSuperAdmin(currentUser) &&
                    user.role !== "super_admin" &&
                    user._id !== currentUser._id ? (
                      changingRole === user._id ? (
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Changing role...
                        </div>
                      ) : (
                        <div className="flex gap-2 flex-wrap">
                          {getAvailableRoles().map((role) => (
                            <button
                              key={role.role}
                              onClick={() =>
                                handleRoleChange(
                                  user._id,
                                  role.role as "client" | "admin"
                                )
                              }
                              disabled={user.role === role.role}
                              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-0.5 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 disabled:from-white/10 disabled:to-white/10 disabled:text-white/40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none active:translate-y-0"
                            >
                              Make {role.label}
                            </button>
                          ))}
                        </div>
                      )
                    ) : user.role !== "super_admin" && !isSuperAdmin(currentUser) ? (
                      <div className="text-xs text-white/50 italic flex items-center gap-2">
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View only
                      </div>
                    ) : user.role === "super_admin" ? (
                      <div className="text-xs text-purple-400 italic flex items-center gap-2">
                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Protected
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {users && users.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-white/40">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white/80 mb-1">No users found</h3>
            <p className="text-white/60 text-sm">There are currently no users in the system</p>
          </div>
        )}
      </div>
    </div>
  );
}
