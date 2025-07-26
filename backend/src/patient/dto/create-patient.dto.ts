import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({ example: '1' })
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 'aaa3b123-124fa' })
  @IsString()
  insurance_no: string;

  @ApiProperty({ example: 'Los Santos 1323A, Grove Str 1' })
  @IsString()
  address: string;

  @ApiProperty()
  @IsDate()
  date_of_birth: Date;

  @ApiProperty({ example: '555-555' })
  @IsString()
  phone: string;
}
