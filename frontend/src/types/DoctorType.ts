import { MedicalFields } from '@/enums/MedicalFields';
import type { UserType } from './UserType';
import { SurgicalField } from '@/enums/SurgicalFields';

export type DoctorType = {
  room: string;
  phone: string;
  user_id: UserType;
  field: (typeof MedicalFields)[keyof typeof MedicalFields];
  surgery: (typeof SurgicalField)[keyof typeof SurgicalField];
};
