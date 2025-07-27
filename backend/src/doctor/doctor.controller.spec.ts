import { Test, TestingModule } from '@nestjs/testing';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { Doctor, MedicalFields, SurgicalField } from './entities/doctor.entity';
import { User, UserRole } from '../user/entities/user.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

describe('DoctorController', () => {
  let controller: DoctorController;
  let service: jest.Mocked<DoctorService>;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed-password',
    role: UserRole.PATIENT,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockDoctor: Doctor = {
    id: 1,
    user: mockUser,
    field: MedicalFields.CARDIOLOGY,
    surgery: SurgicalField.GENERAL_SURGERY,
    phone: '444-444',
    room: 'A101',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [
        {
          provide: DoctorService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DoctorController>(DoctorController);
    service = module.get(DoctorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new doctor and return the result', async () => {
      const createDoctorDto: CreateDoctorDto = {
        user_id: 1,
        room: 'A101',
        phone: '444-444',
        field: MedicalFields.CARDIOLOGY,
        surgery: SurgicalField.GENERAL_SURGERY,
      };

      service.create.mockResolvedValue(mockDoctor);

      const result = await controller.create(createDoctorDto);
      expect(service.create).toHaveBeenCalledWith(createDoctorDto);
      expect(result).toEqual(mockDoctor);
    });
  });

  describe('findAll', () => {
    it('should return all doctors', async () => {
      service.findAll.mockResolvedValue([mockDoctor]);
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockDoctor]);
    });
  });

  describe('findOne', () => {
    it('should return a doctor', async () => {
      service.findOne.mockResolvedValue(mockDoctor);
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockDoctor);
    });
  });

  describe('update', () => {
    it('should update a doctor', async () => {
      const updateDoctorDto: UpdateDoctorDto = { room: 'B101' };
      service.update.mockResolvedValue({ ...mockDoctor, ...updateDoctorDto });
      const result = await controller.update('1', updateDoctorDto);

      expect(service.update).toHaveBeenCalledWith(1, updateDoctorDto);
      expect(result).toEqual({ ...mockDoctor, ...updateDoctorDto });
    });
  });

  describe('remove', () => {
    it('should remove a doctor', async () => {
      service.remove.mockResolvedValue(undefined);
      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });
});
