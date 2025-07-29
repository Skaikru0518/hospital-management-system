import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('medical-record')
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @Post()
  @HttpCode(201)
  @Roles('admin', 'doctor')
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordService.create(createMedicalRecordDto);
  }

  @Get()
  @HttpCode(200)
  @Roles('admin', 'doctor')
  findAll() {
    return this.medicalRecordService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @Roles('admin', 'doctor')
  findOne(@Param('id') id: string) {
    return this.medicalRecordService.findOne(Number(id));
  }

  @Patch(':id')
  @HttpCode(200)
  @Roles('admin', 'doctor')
  update(
    @Param('id') id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto,
  ) {
    return this.medicalRecordService.update(Number(id), updateMedicalRecordDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Roles('admin', 'doctor')
  remove(@Param('id') id: string) {
    return this.medicalRecordService.remove(Number(id));
  }
}
