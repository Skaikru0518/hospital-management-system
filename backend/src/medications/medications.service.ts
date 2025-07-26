import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medication } from './entities/medication.entity';
import { Repository } from 'typeorm';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
  ) {}

  async create(createMedicationDto: CreateMedicationDto): Promise<Medication> {
    const medication = this.medicationRepository.create(createMedicationDto);
    return this.medicationRepository.save(medication);
  }

  async findAll(): Promise<Medication[]> {
    return this.medicationRepository.find();
  }

  async findAllPaginated(
    search: string,
    page: number,
    limit: number,
  ): Promise<[Medication[], number]> {
    const qb = this.medicationRepository.createQueryBuilder('medication');
    if (search) {
      qb.where('medication.name LIKE :search', { search: `%${search}%` });
    }
    qb.skip((page - 1) * limit).take(limit);
    const [data, total] = await qb.getManyAndCount();
    return [data, total];
  }

  async findOne(id: number): Promise<Medication> {
    const medication = await this.medicationRepository.findOne({
      where: { id },
    });
    if (!medication) {
      throw new NotFoundException(`Medication with this id ${id} not found`);
    }
    return medication;
  }

  async update(
    id: number,
    updateMedicationDto: UpdateMedicationDto,
  ): Promise<Medication> {
    const medication = await this.medicationRepository.preload({
      id,
      ...updateMedicationDto,
    });
    if (!medication) {
      throw new NotFoundException(
        `Medication with this id ${id} could not be updated`,
      );
    }
    return this.medicationRepository.save(medication);
  }

  async remove(id: number): Promise<void> {
    const result = await this.medicationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Medication with this id ${id} could not be removed`,
      );
    }
  }
}
