import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMedicalRecordDto {
  @ApiProperty({ example: 'description...' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'image.jpg' })
  @IsString()
  attachment: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  patient_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  doctor_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  diagnosis_id: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  medication_id?: number;
}
