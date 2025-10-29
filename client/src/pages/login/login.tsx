import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/auth.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "./login.schema";

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
    <div className="flex justify-center items-center w-full">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 mx-auto mb-4">
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 20 20" className="text-white">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Welcome Back!</h2>
          <p className="text-white/60">Sign in to continue your journey</p>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-400 px-4 py-3 rounded-xl mb-6 border border-red-500/20 flex items-center gap-2">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block font-medium text-white/90 text-sm">Email Address</label>
            <input 
              type="email" 
              id="email" 
              {...register("email")} 
              required 
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            {errors.email && <p className="text-red-400 text-sm flex items-center gap-1 mt-1"><span>⚠</span>{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block font-medium text-white/90 text-sm">Password</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            {errors.password && <p className="text-red-400 text-sm flex items-center gap-1 mt-1"><span>⚠</span>{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] mt-6"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/60">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
