import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/auth.store";
import type { UserRole } from "@/types/user.types";
import Navbar from "../navbar/navbar";
import Loading from "../ui/loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  requiredAuth?: boolean;
}

export default function ProtectedRoute({ children, requiredRoles, requiredAuth = true }: ProtectedRouteProps) {
  const { isAuthenticated, loading, user } = useAuthStore();

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (requiredAuth && !isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if(requiredRoles && requiredRoles.length > 0){
    if(!user) return <Navigate to="/auth/login" replace />;

    const hasRequiredRole = requiredRoles.includes(user?.role); 
    if(!hasRequiredRole) {
      return (
        <div>
          <Navbar />
          <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] p-8">
            <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 max-w-md backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg width="32" height="32" fill="currentColor" className="text-red-400" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h2>
                  <p className="text-white/80">You are not authorized to access this page</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)]">
        {children}
      </div>
    </div>
  );
}
