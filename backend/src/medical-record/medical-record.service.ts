import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalRecord } from './entities/medical-rectord.entity';
import { Repository } from 'typeorm';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectRepository(MedicalRecord)
    private medicalRecordRepository: Repository<MedicalRecord>,
  ) {}

  async create(
    createMedicalRecordDto: CreateMedicalRecordDto,
  ): Promise<MedicalRecord> {
    const record = this.medicalRecordRepository.create({
      ...createMedicalRecordDto,
      patient: { id: createMedicalRecordDto.patient_id },
      doctor: { id: createMedicalRecordDto.doctor_id },
      diagnosis: { id: createMedicalRecordDto.diagnosis_id },
      ...(createMedicalRecordDto.medication_id && {
        medication: { id: createMedicalRecordDto.medication_id },
      }),
    });
    return this.medicalRecordRepository.save(record);
  }

  async findAll(): Promise<MedicalRecord[]> {
    return this.medicalRecordRepository.find();
  }

  async findOne(id: number): Promise<MedicalRecord> {
    const record = await this.medicalRecordRepository.findOne({
      where: { id },
    });
    if (!record) {
      throw new NotFoundException(
        `Medical Record with this id ${id} not found`,
      );
    }
    return record;
  }

  async update(
    id: number,
    updateMedicalRecordDto: UpdateMedicalRecordDto,
  ): Promise<MedicalRecord> {
    const record = await this.medicalRecordRepository.preload({
      id,
      ...updateMedicalRecordDto,
    });
    if (!record) {
      throw new NotFoundException(
        `Medical Record with this id ${id} could not be updated`,
      );
    }
    return this.medicalRecordRepository.save(record);
  }

  async remove(id: number): Promise<void> {
    const result = await this.medicalRecordRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Medical Record with this id ${id} could not be removed`,
      );
    }
  }
}
