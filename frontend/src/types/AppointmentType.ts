import type { DoctorType } from './DoctorType';
import type { PatientType } from './PatientType';

export type AppointmentType = {
  appontment_time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  patient_id: PatientType;
  doctor_id: DoctorType;
};
