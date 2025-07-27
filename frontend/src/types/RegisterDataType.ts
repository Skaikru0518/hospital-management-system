export type RegisterDataType = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'doctor' | 'patient' | 'receptionist';
  phone?: string;
};
