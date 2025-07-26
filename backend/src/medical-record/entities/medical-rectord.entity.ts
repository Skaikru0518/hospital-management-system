import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
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

  @ApiProperty({ type: () => [Disease] })
  @ManyToMany(() => Disease, { eager: true })
  @JoinTable({
    name: 'medical_record_diseases',
    joinColumn: { name: 'medical_record_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'disease_id', referencedColumnName: 'id' },
  })
  diseases: Disease[];

  @ApiProperty({ type: () => [Medication] })
  @ManyToMany(() => Medication, { eager: true })
  @JoinTable({
    name: 'medical_record_medications',
    joinColumn: { name: 'medical_record_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'medication_id', referencedColumnName: 'id' },
  })
  medications: Medication[];
}
