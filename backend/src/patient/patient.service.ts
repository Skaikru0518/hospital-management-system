import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(createPatientDto);
    return this.patientRepository.save(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with this id ${id} not found`);
    }
    return patient;
  }

  async findByPatientUserId(userId: number): Promise<Patient | null> {
    const patient = await this.patientRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    return patient;
  }

  async update(
    id: number,
    updatePatiendDto: UpdatePatientDto,
  ): Promise<Patient> {
    const patient = await this.patientRepository.preload({
      id,
      ...updatePatiendDto,
    });
    if (!patient) {
      throw new NotFoundException(
        `Patient with this id ${id} could not be updated`,
      );
    }
    return this.patientRepository.save(patient);
  }

  async updateByUserId(
    userId: number,
    updatePatiendDto: UpdatePatientDto,
  ): Promise<Patient> {
    const existingPatient = await this.patientRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!existingPatient) {
      throw new NotFoundException(
        `Patient with this userId ${userId} not found`,
      );
    }

    const updatedPatient = await this.patientRepository.preload({
      id: existingPatient.id,
      ...updatePatiendDto,
    });

    if (!updatedPatient) {
      throw new NotFoundException(`Patient could not be updated`);
    }

    return this.patientRepository.save(updatedPatient);
  }

  async remove(id: number): Promise<void> {
    const result = await this.patientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Patient with this id ${id} could not be removed`,
      );
    }
  }
}
