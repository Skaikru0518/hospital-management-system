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
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @HttpCode(201)
  @Public()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  @HttpCode(200)
  @Roles('admin', 'doctor', 'receptionist')
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @Roles('admin', 'doctor', 'receptionist')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(200)
  @Roles('admin', 'doctor', 'receptionist')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Roles('admin', 'doctor', 'receptionist')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
