import { create } from 'zustand';
import { authAPI, userAPI } from '../service/api.auth';
import type { User, UserRole } from '../types/user.types';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: User | null;
    users: User[] | null;
    changingRole: string | null;
    isActive: boolean;
    error: string | null;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateProfile: (data: { bio?: string, sosialLinks?: { facebook?: string, twitter?: string, instagram?: string } }) => Promise<void>;
    deleteProfile: () => Promise<void>;
    getAllUsers: () => Promise<void>;
    changeUserRole: (userId: string, role: UserRole) => Promise<void>;
    setChangingRole: (userId: string | null) => void;
    initialize: () => Promise<void>;
    setUsers: (users: User[]) => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
    isAuthenticated: false,
    isActive: false,
    user: null,
    users: [],
    changingRole: null,
    token: null,
    error: null,
    loading: true,
    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: string | null) => set({ error }),
    login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
            const response = await authAPI.login(email, password);
            const token = response.token; // Server returns {token} directly
            localStorage.setItem('token', token);
            set({ token: token });
            const userResponse = await userAPI.getProfile();
            set({ 
                user: userResponse.data, 
                isAuthenticated: true, 
                isActive: true,
                error: null
            });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Login failed',
                isAuthenticated: false,
                isActive: false
            });
            throw error; // Re-throw to handle in component
        } finally {
            set({ loading: false });
        }
    },
    register: async (username: string, email: string, password: string) => {
        set({ loading: true, error: null });
        try {
            await authAPI.register(username, email, password);
            await get().login(email, password);
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Registration failed',
                isAuthenticated: false,
                isActive: false
            });
            throw error; // Re-throw to handle in component
        } finally {
            set({ loading: false });
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ 
            user: null, 
            token: null, 
            isAuthenticated: false, 
            isActive: false,
            error: null,
            loading: false
        });
    },
    updateProfile: async (data: { bio?: string, sosialLinks?: { facebook?: string, twitter?: string, instagram?: string } }) => {
        set({ isActive: true });
        try {
            const response = await userAPI.updateProfile(data);
            set({ user: { ...get().user, ...response.data } });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            set({ isActive: false });
            return;
        } finally {
            set({ loading: false });
        }
    },
    setUsers: (users: User[]) => set({ users }),
    deleteProfile: async () => {
        set({ isActive: true });
        try {
            await userAPI.deleteProfile();
            localStorage.removeItem('token');
            set({ user: null, token: null, isAuthenticated: false });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            set({ isActive: false });
            return;
        } finally {
            set({ loading: false });
        }
    },
    getAllUsers: async () => {
        set({ loading: true, error: null });
        try {
            const response = await userAPI.getAllUsers();
            set({ users: response.data as User[] });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
        } finally {
            set({ loading: false });
        }
    },
    changeUserRole: async (userId: string, role: UserRole) => {
        set({ error: null });
        try {
            await userAPI.changeUserRole(userId, role);
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    },
    setChangingRole: (userId: string | null) => set({ changingRole: userId }),
    initialize: async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (!token) {
            set({ loading: false, isAuthenticated: false, isActive: false });
            return;
        }

        try {
            const userResponse = await userAPI.getProfile();
            set({ 
                user: userResponse.data, 
                token: token, 
                isAuthenticated: true,
                isActive: true,
                error: null
            });
        } catch (error) {
            console.error('Authentication failed during initialization:', error);
            // Token is invalid, remove it
            localStorage.removeItem('token');
            set({ 
                error: error instanceof Error ? error.message : 'Authentication failed',
                isAuthenticated: false,
                isActive: false,
                token: null,
                user: null
            });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useAuthStore;