import { MedicalFields } from '@/enums/MedicalFields';
import type { UserType } from './UserType';
import { SurgicalField } from '@/enums/SurgicalFields';

export type DoctorType = {
  id: number;
  room: string;
  phone: string;
  user: UserType;
  field: (typeof MedicalFields)[keyof typeof MedicalFields];
  surgery: (typeof SurgicalField)[keyof typeof SurgicalField];
  rating: number;
  image: string;
  experience: number;
};
