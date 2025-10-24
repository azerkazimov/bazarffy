import { Link } from "react-router-dom";
import useAuthStore from "@/store/auth.store";

export default function Home() {
  const { isAuthenticated, user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Our App</h1>
        <p>Manage your profile and connect with others</p>

        {isAuthenticated ? (
          <div className="authenticated-content">
            <p>Hello, {user?.username}!</p>
            <Link to="/profile" className="cta-button">
              Go to Profile
            </Link>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/auth/login" className="cta-button primary">
              Login
            </Link>
            <Link to="/auth/register" className="cta-button secondary">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
