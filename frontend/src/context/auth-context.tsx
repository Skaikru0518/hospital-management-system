import type { AuthContextType } from '@/types/AuthContextType';
import type { UserType } from '@/types/UserType';
import { apiPaths } from '@/lib/api-paths';
import { axiosInstance } from '@/lib/axios';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import type { ReactNode } from 'react';
import type { AuthResponseType } from '@/types/AuthResponseType';
import type { RegisterDataType } from '@/types/RegisterDataType';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [userCount, setUserCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    //check for existing auth data on mount
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error: any) {
        console.log(`AuthContext error: ${error}`);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const response = await axiosInstance.post<AuthResponseType>(
          apiPaths.auth.login,
          { email, password },
        );
        const { access_token, user } = response.data;
        localStorage.setItem('authToken', access_token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);

        return true;
      } catch (error: any) {
        console.error('Login error', error);
        return false;
      }
    },
    [],
  );

  const register = useCallback(async (userData: RegisterDataType) => {
    try {
      await axiosInstance.post<UserType>(apiPaths.user.createUser, userData);
      await login(userData.email, userData.password);
      toast.success('Register success');
    } catch (error) {
      console.error('Register error', error);
      toast.error('Register failed');
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logout successful');
  }, []);

  const getUserCount = useCallback(async () => {
    try {
      const response = await axiosInstance.get<UserType[]>(
        apiPaths.user.getUsers,
      );
      const users = response.data;
      return users.length;
    } catch (error: any) {
      console.error(error);
      return 0;
    }
  }, []);

  const getDoctorCount = useCallback(async () => {
    try {
      const response = await axiosInstance.get<UserType[]>(
        apiPaths.user.getUsers,
      );
      const users = response.data;
      const doctors = users.filter((user) => user.role === 'doctor');
      return doctors.length;
    } catch (error: any) {
      console.error(error);
      return 0;
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      setUser,
      getUserCount,
      getDoctorCount,
    }),
    [user, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
