import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from 'src/patient/entities/patient.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Disease } from 'src/diseases/entities/disease.entity';
import { Medication } from 'src/medications/entities/medication.entity';

@Entity('medical_records')
export class MedicalRecord {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Patient })
  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ApiProperty({ type: () => Doctor })
  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @Column({ length: 255, nullable: true })
  attachment: string;

  @ApiProperty({ type: () => Disease })
  @ManyToOne(() => Disease, { eager: true })
  @JoinColumn({ name: 'diagnosis_id' })
  diagnosis: Disease;

  @ApiProperty({ type: () => Medication, required: false })
  @ManyToOne(() => Medication, { eager: true, nullable: true })
  @JoinColumn({ name: 'medication_id' })
  medication: Medication;
}
