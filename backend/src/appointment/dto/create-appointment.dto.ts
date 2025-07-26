import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { AppointmentStatus } from '../entities/appointment.entity';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  appointment_time: Date;

  @ApiProperty({
    enum: AppointmentStatus,
    example: AppointmentStatus.SCHEDULED,
  })
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @ApiProperty({ example: 'Back pain' })
  @IsString()
  notes: string;

  @ApiProperty()
  @IsDate()
  created_at: Date;

  @ApiProperty({ example: '1' })
  @IsNumber()
  patient_id: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  doctor_id: number;
}
