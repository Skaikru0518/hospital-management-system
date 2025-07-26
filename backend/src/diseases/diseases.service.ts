import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Disease } from './entities/disease.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiseasesService {
  constructor(
    @InjectRepository(Disease)
    private readonly diseaseRepository: Repository<Disease>,
  ) {}

  async findAll(): Promise<Disease[]> {
    return this.diseaseRepository.find();
  }

  async findAllPaginated(
    search: string,
    page: number,
    limit: number,
  ): Promise<[Disease[], number]> {
    //?search=asthma&limit=5
    const qb = this.diseaseRepository.createQueryBuilder('disease');
    if (search) {
      qb.where(
        'disease.code LIKE :search OR disease.short_desc LIKE :search OR disease.long_desc LIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }
    qb.skip((page - 1) * limit).take(limit);
    const [data, total] = await qb.getManyAndCount();
    return [data, total];
  }

  async findOne(id: number): Promise<Disease> {
    const disease = await this.diseaseRepository.findOne({ where: { id } });
    if (!disease) {
      throw new NotFoundException(`Disease with id ${id} not found`);
    }
    return disease;
  }
}
