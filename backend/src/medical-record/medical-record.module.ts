import { Module } from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { MedicalRecordController } from './medical-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecord } from './entities/medical-rectord.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Disease } from 'src/diseases/entities/disease.entity';
import { Medication } from 'src/medications/entities/medication.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MedicalRecord,
      Patient,
      Doctor,
      Disease,
      Medication,
    ]),
  ],
  controllers: [MedicalRecordController],
  providers: [MedicalRecordService],
  exports: [MedicalRecordService],
})
export class MedicalRecordModule {}
