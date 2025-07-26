import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @ApiProperty({ type: [Number], example: [1, 2, 3] })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  disease_ids: number[];

  @ApiProperty({ type: [Number], example: [1, 2], required: false })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  medication_ids?: number[];
}
