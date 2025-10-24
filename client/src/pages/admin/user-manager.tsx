import { useEffect, useState } from "react";
import { userAPI } from "@/service/api.auth";

import {
  getRoleNames,
  getAvailableRoles,
  isSuperAdmin,
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
      <div className="user-manager">
        <div className="loading-text">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-manager">
        <div className="error-text">Error: {error}</div>
      </div>
    );
  }

  if (!currentUser || !isSuperAdmin(currentUser)) {
    return (
      <div className="user-manager">
        <div className="access-denied">
          Access denied. Super admin privileges required.
        </div>
      </div>
    );
  }

  return (
    <div className="user-manager">
      <div className="user-manager-header">
        <h1 className="user-manager-title">User Management</h1>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="user-name">{user.username}</div>
                </td>
                <td>
                  <div className="user-email">{user.email}</div>
                </td>
                <td>
                  <span
                    className={`role-badge ${
                      user.role === "super_admin"
                        ? "super-admin"
                        : user.role === "admin"
                        ? "admin"
                        : "client"
                    }`}
                  >
                    {getRoleNames(user.role)}
                  </span>
                </td>
                <td>
                  {user.role !== "super_admin" &&
                  user._id !== currentUser._id ? (
                    changingRole === user._id ? (
                      <div className="loading-text">Changing role...</div>
                    ) : (
                      <div className="role-actions">
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
                            className="role-button"
                          >
                            Make {role.label}
                          </button>
                        ))}
                      </div>
                    )
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
