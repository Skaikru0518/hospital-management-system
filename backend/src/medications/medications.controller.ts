import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationService: MedicationsService) {}

  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationService.create(createMedicationDto);
  }

  @Get()
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
  findOne(@Param('id') id: number) {
    return this.medicationService.findOne(Number(id));
  }

  @Put('id')
  update(@Param('id') id: number, updateMedicationDto: UpdateMedicationDto) {
    return this.medicationService.update(Number(id), updateMedicationDto);
  }

  @Delete('id')
  remove(@Param('id') id: number) {
    return this.medicationService.remove(Number(id));
  }
}
