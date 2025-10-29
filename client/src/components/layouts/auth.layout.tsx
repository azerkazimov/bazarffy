import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/auth.store";
import Navbar from "../navbar/navbar";
import Loading from "../ui/loading";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return (
      <Loading/>
    );
  }

  // If user is already authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 w-full">
          <Outlet />
          {children}
        </div>
      </div>
    </div>
  );
}