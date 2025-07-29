import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { DiseasesService } from './diseases.service';
import { Disease } from './entities/disease.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('diseases')
export class DiseasesController {
  constructor(private readonly diseasesService: DiseasesService) {}

  @Get()
  @HttpCode(200)
  @Roles('admin', 'doctor')
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
  @HttpCode(200)
  @Roles('admin', 'doctor')
  findOne(@Param('id') id: number) {
    return this.diseasesService.findOne(Number(id));
  }
}
