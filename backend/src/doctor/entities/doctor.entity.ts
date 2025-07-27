import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export enum MedicalFields {
  GENERAL_MEDICINE = 'general_medicine',
  INTERNAL_MEDICINE = 'internal_medicine',
  CARDIOLOGY = 'cardiology',
  ENDOCRINOLOGY = 'endocrinology',
  GASTROENTEROLOGY = 'gastroenterology',
  GERIATRICS = 'geriatrics',
  INFECTIOS_DISEASES = 'infectious_diseases',
  NEPHROLOGY = 'nephrology',
  NEUROLOGY = 'neurology',
  ONCOLOGY = 'oncology',
  PULMONOLOGY = 'pulmonology',
  RHEUMATOLOGY = 'rheumatology',
  PATHOLOGY = 'pathology',
  EMERGENCY_MEDICINE = 'emergency_medicine',
  RADIOLOGY = 'radiology',
  GYNECOLOGY = 'gynecology',
  IMMUNOLOGY = 'immunology',
}

export enum SurgicalField {
  GENERAL_SURGERY = 'general_surgery',
  ORTHOPEDIC_SURGERY = 'orthopedic_surgery',
  NEUROSURGERY = 'neurosurgery',
  OPHTHALMOLOGY = 'ophthalmology',
  OTOLARYNGOLOGY = 'otolaryngology',
  PLASTIC_SURGERY = 'plastic_surgery',
  THORACIC_SURGERY = 'thoracic_surgery',
}

@Entity('doctors')
export class Doctor {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ enum: MedicalFields, description: 'Medical Field' })
  @Column({
    type: 'enum',
    enum: MedicalFields,
    nullable: true,
    default: MedicalFields.GENERAL_MEDICINE,
  })
  field: MedicalFields;

  @ApiProperty({ enum: SurgicalField, description: 'Surgical Field' })
  @Column({ type: 'enum', enum: SurgicalField, nullable: true })
  surgery: SurgicalField;

  @ApiProperty()
  @Column({ length: 20, nullable: true })
  room: string;

  @ApiProperty()
  @Column({ length: 30, nullable: true })
  phone: string;
}
