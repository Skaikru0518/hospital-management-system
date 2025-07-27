export type UserType = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient' | 'receptionist';
};
