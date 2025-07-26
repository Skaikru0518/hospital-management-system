import { Controller, Get, Param, Query } from '@nestjs/common';
import { DiseasesService } from './diseases.service';
import { Disease } from './entities/disease.entity';

@Controller('diseases')
export class DiseasesController {
  constructor(private readonly diseasesService: DiseasesService) {}

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 50,
  ): Promise<{ data: Disease[]; total: number }> {
    const [data, total] = await this.diseasesService.findAllPaginated(
      search ?? '',
      Number(page),
      Number(limit),
    );
    return { data, total };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.diseasesService.findOne(Number(id));
  }
}
