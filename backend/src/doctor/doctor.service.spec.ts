import { Test, TestingModule } from '@nestjs/testing';
import { DoctorService } from './doctor.service';
import { DeleteResult, Repository } from 'typeorm';
import { Doctor, MedicalFields, SurgicalField } from './entities/doctor.entity';
import { User } from 'src/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { NotFoundException } from '@nestjs/common';

describe('DoctorService', () => {
  let service: DoctorService;
  let repository: Repository<Doctor>;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
  } as User;

  const mockDoctor: Doctor = {
    id: 1,
    user: mockUser,
    field: MedicalFields.CARDIOLOGY,
    surgery: SurgicalField.GENERAL_SURGERY,
    room: 'A101',
    phone: '+36304444321',
  } as Doctor;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    preload: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorService,
        { provide: getRepositoryToken(Doctor), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<DoctorService>(DoctorService);
    repository = module.get<Repository<Doctor>>(getRepositoryToken(Doctor));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and return a doctor', async () => {
      const createDoctorDto: CreateDoctorDto = {
        user_id: mockUser.id,
        field: MedicalFields.CARDIOLOGY,
        surgery: SurgicalField.GENERAL_SURGERY,
        room: 'A101',
        phone: '+36304444321',
      };

      mockRepository.create.mockReturnValue(mockDoctor);
      mockRepository.save.mockResolvedValue(mockDoctor);

      const result = await service.create(createDoctorDto);

      expect(repository.create).toHaveBeenCalledWith(createDoctorDto);
      expect(repository.save).toHaveBeenCalledWith(mockDoctor);
      expect(result).toEqual(mockDoctor);
    });
  });

  describe('findAll', () => {
    it('should return all doctors', async () => {
      mockRepository.find.mockResolvedValue([mockDoctor]);
      const result = await service.findAll();
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockDoctor]);
    });
  });

  describe('findOne', () => {
    it('should return a doctor', async () => {
      mockRepository.findOne.mockResolvedValue(mockDoctor);
      const result = await service.findOne(1);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockDoctor);
    });
  });

  describe('update', () => {
    it('should update a doctor', async () => {
      const updateDoctorDto: UpdateDoctorDto = {
        field: MedicalFields.NEUROLOGY,
        room: 'B202',
        phone: '+36309876543',
      };

      const updatedDoctor = {
        ...mockDoctor,
        ...updateDoctorDto,
      };

      mockRepository.preload.mockResolvedValue(updatedDoctor);
      mockRepository.save.mockResolvedValue(updatedDoctor);

      const result = await service.update(1, updateDoctorDto);

      expect(mockRepository.preload).toHaveBeenCalledWith({
        id: 1,
        ...updateDoctorDto,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(updatedDoctor);
      expect(result).toEqual(updatedDoctor);
    });

    it('should throw NotFoundException when doctor not found', async () => {
      const updateDoctorDto: UpdateDoctorDto = {
        room: 'C303',
      };

      mockRepository.preload.mockResolvedValue(null);

      await expect(service.update(999, updateDoctorDto)).rejects.toThrow(
        new NotFoundException('Doctor with this id 999 could not be updated'),
      );
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const deleteResult: DeleteResult = { affected: 1, raw: {} };
      mockRepository.delete.mockResolvedValue(deleteResult);
      await expect(service.remove(1)).resolves.toBeUndefined();
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('throws NotFoundException if no user deleted', async () => {
      const deleteResult: DeleteResult = { affected: 0, raw: {} };
      mockRepository.delete.mockResolvedValue(deleteResult);
      await expect(service.remove(1)).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
