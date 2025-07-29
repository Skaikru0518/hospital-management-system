import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationService: MedicationsService) {}

  @Post()
  @HttpCode(201)
  @Roles('admin', 'doctor')
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationService.create(createMedicationDto);
  }

  @Get()
  @HttpCode(200)
  @Roles('admin', 'doctor')
  async findAll(
    @Query('search') search?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 50,
  ) {
    const [data, total] = await this.medicationService.findAllPaginated(
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
    return this.medicationService.findOne(Number(id));
  }

  @Put(':id')
  @HttpCode(200)
  @Roles('admin', 'doctor')
  update(@Param('id') id: number, updateMedicationDto: UpdateMedicationDto) {
    return this.medicationService.update(Number(id), updateMedicationDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Roles('admin', 'doctor')
  remove(@Param('id') id: number) {
    return this.medicationService.remove(Number(id));
  }
}
