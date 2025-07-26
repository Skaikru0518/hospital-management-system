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
    return this.patientRepository.find();
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with this id ${id} not found`);
    }
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

  async remove(id: number): Promise<void> {
    const result = await this.patientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Patient with this id ${id} could not be removed`,
      );
    }
  }
}
