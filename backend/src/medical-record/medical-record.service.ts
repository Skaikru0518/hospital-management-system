import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalRecord } from './entities/medical-rectord.entity';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { Patient } from 'src/patient/entities/patient.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Disease } from 'src/diseases/entities/disease.entity';
import { Medication } from 'src/medications/entities/medication.entity';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectRepository(MedicalRecord)
    private medicalRecordRepository: Repository<MedicalRecord>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    @InjectRepository(Disease)
    private diseaseRepository: Repository<Disease>,
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
  ) {}

  async create(createDto: CreateMedicalRecordDto): Promise<MedicalRecord> {
    const patient = await this.patientRepository.findOne({
      where: { id: createDto.patient_id },
    });
    if (!patient)
      throw new NotFoundException(
        `Patient with id ${createDto.patient_id} not found`,
      );

    const doctor = await this.doctorRepository.findOne({
      where: { id: createDto.doctor_id },
    });
    if (!doctor)
      throw new NotFoundException(
        `Doctor with id ${createDto.doctor_id} not found`,
      );

    const diseases = await this.diseaseRepository.findByIds(
      createDto.disease_ids,
    );
    if (diseases.length !== createDto.disease_ids.length) {
      throw new NotFoundException('One or more diseases not found');
    }

    let medications: Medication[] = [];
    if (createDto.medication_ids && createDto.medication_ids.length > 0) {
      medications = await this.medicationRepository.findByIds(
        createDto.medication_ids,
      );
      if (medications.length !== createDto.medication_ids.length) {
        throw new NotFoundException('One or more medications not found');
      }
    }

    const record = this.medicalRecordRepository.create({
      description: createDto.description,
      attachment: createDto.attachment,
      patient,
      doctor,
      diseases,
      medications,
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
    if (!record)
      throw new NotFoundException(`Medical record with id ${id} not found`);
    return record;
  }

  async update(
    id: number,
    updateDto: UpdateMedicalRecordDto,
  ): Promise<MedicalRecord> {
    const record = await this.medicalRecordRepository.findOne({
      where: { id },
    });
    if (!record)
      throw new NotFoundException(`Medical record with id ${id} not found`);

    if (updateDto.patient_id) {
      const patient = await this.patientRepository.findOne({
        where: { id: updateDto.patient_id },
      });
      if (!patient)
        throw new NotFoundException(
          `Patient with id ${updateDto.patient_id} not found`,
        );
      record.patient = patient;
    }

    if (updateDto.doctor_id) {
      const doctor = await this.doctorRepository.findOne({
        where: { id: updateDto.doctor_id },
      });
      if (!doctor)
        throw new NotFoundException(
          `Doctor with id ${updateDto.doctor_id} not found`,
        );
      record.doctor = doctor;
    }

    if (updateDto.disease_ids) {
      const diseases = await this.diseaseRepository.findByIds(
        updateDto.disease_ids,
      );
      if (diseases.length !== updateDto.disease_ids.length) {
        throw new NotFoundException('One or more diseases not found');
      }
      record.diseases = diseases;
    }

    if (updateDto.medication_ids) {
      const medications = await this.medicationRepository.findByIds(
        updateDto.medication_ids,
      );
      if (medications.length !== updateDto.medication_ids.length) {
        throw new NotFoundException('One or more medications not found');
      }
      record.medications = medications;
    }

    if (updateDto.description !== undefined)
      record.description = updateDto.description;
    if (updateDto.attachment !== undefined)
      record.attachment = updateDto.attachment;

    return this.medicalRecordRepository.save(record);
  }

  async remove(id: number): Promise<void> {
    const result = await this.medicalRecordRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Medical record with id ${id} not found`);
    }
  }
}
