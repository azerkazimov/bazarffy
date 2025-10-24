import useAuthStore from '@/store/auth.store';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerSchema, type RegisterSchema } from './register.schema';


export default function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
  
  
  const { register:  registerUser } = useAuthStore();
  const navigate = useNavigate();



  const onSubmit = async (data: RegisterSchema) => {

    setError('');
    setLoading(true);

    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await registerUser(data.username, data.email, data.password);
      navigate('/profile');
    } catch (err: unknown) {
      console.error('Registration error:', err);
      let errorMessage = "Registration failed";
      
      if (err && typeof err === "object" && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        errorMessage = response?.data?.message || "Registration failed";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register('username')}
              required

            />
            {errors.username && <p className="error-message">{errors.username.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              required

            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register('password')}
              required

            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
            {...register('confirmPassword')}
              required
              
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/auth/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};


