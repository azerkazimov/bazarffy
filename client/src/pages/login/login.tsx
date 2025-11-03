import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/auth.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "./login.schema";
import { User, Loader2, AlertTriangle } from "lucide-react";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginSchema) => {
    setError("");
    setLoading(true);

    try {
      await login(data.email, data.password);
      navigate("/profile");
    } catch (err: unknown) {
      console.error('Login error:', err);
      let errorMessage = "Login failed";
      
      if (err && typeof err === "object" && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        errorMessage = response?.data?.message || "Login failed";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full bg-white min-h-screen">
      <div className="bg-white p-8 w-full max-w-md border border-gray-200 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-700" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Welcome Back!</h2>
          <p className="text-gray-600">Sign in to continue your journey</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 mb-6 border border-red-200 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block font-medium text-gray-900 text-sm">Email Address</label>
            <input 
              type="email" 
              id="email" 
              {...register("email")} 
              required 
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
            />
            {errors.email && <p className="text-red-600 text-sm flex items-center gap-1 mt-1"><AlertTriangle className="w-4 h-4" />{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block font-medium text-gray-900 text-sm">Password</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
            />
            {errors.password && <p className="text-red-600 text-sm flex items-center gap-1 mt-1"><AlertTriangle className="w-4 h-4" />{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full px-4 py-3 bg-gray-900 text-white font-semibold hover:bg-gray-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 mt-6"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </span>
            ) : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-gray-900 hover:text-gray-700 font-semibold transition-colors">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
