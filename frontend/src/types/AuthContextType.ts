import type { UserType } from './UserType';

export interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  setUser: (user: UserType | null) => void;
  getUserCount: () => Promise<number>;
  getDoctorCount: () => Promise<number>;
}
