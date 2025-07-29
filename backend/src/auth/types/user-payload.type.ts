export type UserPayload = {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'doctor' | 'patient' | 'receptionist';
};
