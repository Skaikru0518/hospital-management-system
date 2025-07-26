import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { MedicalFields, SurgicalField } from '../entities/doctor.entity';

export class CreateDoctorDto {
  @ApiProperty({ example: '104' })
  @IsString()
  room: string;

  @ApiProperty({ example: '555-555' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '1' })
  @IsNumber()
  user_id: number;

  @ApiProperty({ enum: MedicalFields, example: MedicalFields.GENERAL_MEDICINE })
  @IsEnum(MedicalFields)
  field: MedicalFields;

  @ApiProperty({ enum: SurgicalField, example: SurgicalField.GENERAL_SURGERY })
  @IsEnum(SurgicalField)
  surgery: SurgicalField;
}
