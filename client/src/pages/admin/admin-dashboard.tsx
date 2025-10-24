import { Link } from 'react-router-dom';
import useAuthStore from '../../store/auth.store';
import { isAdmin, isSuperAdmin, getRoleNames } from '../../utils/auth.utils';

export default function AdminDashboard() {
  const { user } = useAuthStore();

  if (!user || !isAdmin(user)) {
    return (
      <div className="admin-dashboard">
        <div className="access-denied">
          Access denied. Administrator privileges required.
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">
          Welcome, {user.username}! Your role: {getRoleNames(user.role)}
        </p>
      </div>

      <div className="admin-grid">
        {/* User Management - Super Admin Only */}
        {isSuperAdmin(user) && (
          <div className="admin-card">
            <div className="admin-card-content">
              <div className="admin-card-header">
                <div className="admin-card-icon purple">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div>
                  <div className="admin-card-title">
                    User Management
                  </div>
                  <div className="admin-card-value">
                    Manage user roles
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-card-footer">
              <Link to="/admin/users" className="admin-card-link">
                View all users →
              </Link>
            </div>
          </div>
        )}

        {/* Product Management - Admin and Super Admin */}
        <div className="admin-card">
          <div className="admin-card-content">
            <div className="admin-card-header">
              <div className="admin-card-icon blue">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="admin-card-title">
                  Product Management
                </div>
                <div className="admin-card-value">
                  Manage products
                </div>
              </div>
            </div>
          </div>
          <div className="admin-card-footer">
            <Link to="/products" className="admin-card-link">
              View products →
            </Link>
          </div>
        </div>

        {/* System Stats */}
        <div className="admin-card">
          <div className="admin-card-content">
            <div className="admin-card-header">
              <div className="admin-card-icon green">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div>
                <div className="admin-card-title">
                  System Statistics
                </div>
                <div className="admin-card-value">
                  View analytics
                </div>
              </div>
            </div>
          </div>
          <div className="admin-card-footer">
            <span className="admin-card-link" style={{ cursor: 'default', opacity: 0.6 }}>
              Coming soon
            </span>
          </div>
        </div>
      </div>

      {/* Role Information */}
      <div className="admin-permissions">
        <h3>Your Permissions</h3>
        <ul>
          <li>Access admin dashboard</li>
          <li>Manage products</li>
          {isSuperAdmin(user) && (
            <>
              <li>Manage user roles</li>
              <li>View all users</li>
              <li>Promote clients to admin</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};


