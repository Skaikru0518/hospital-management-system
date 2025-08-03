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
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @HttpCode(201)
  @Roles('admin')
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  @HttpCode(200)
  @Roles('admin', 'doctor', 'patient')
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @Roles('admin', 'doctor')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(Number(id));
  }

  @Patch(':id')
  @HttpCode(200)
  @Roles('admin', 'doctor')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(Number(id), updateDoctorDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Roles('admin', 'doctor')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(Number(id));
  }
}
