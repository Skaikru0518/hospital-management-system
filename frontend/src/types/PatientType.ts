import type { UserType } from './UserType';

export type PatientType = {
  id: number;
  insurance_no: string;
  address: string;
  birth: string;
  phone: string;
  user_id: UserType;
};
