import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserService } from './user.service';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed-password'),
  compare: jest.fn().mockResolvedValue(true),
}));

type MockRepo<T extends Record<string, any> = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

const createMockRepo = (): MockRepo<User> => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  preload: jest.fn(),
  delete: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let repo: MockRepo<User>;

  const userEntity: User = {
    id: 1,
    email: 'john@example.com',
    password: 'hashed-password',
  } as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepo(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get(getRepositoryToken(User));
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('creates a user when email is unique', async () => {
      const dto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'plain',
        role: UserRole.PATIENT,
      };

      repo.findOne!.mockResolvedValue(null);
      repo.create!.mockReturnValue(userEntity);
      repo.save!.mockResolvedValue(userEntity);

      const result = await service.create(dto);

      expect(repo.findOne).toHaveBeenCalledWith({
        where: { email: dto.email },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 12);
      expect(repo.create).toHaveBeenCalledWith({
        ...dto,
        password: 'hashed-password',
      });
      expect(repo.save).toHaveBeenCalledWith(userEntity);
      expect(result).toEqual(userEntity);
    });

    it('throws ConflictException if email already exists', async () => {
      const dto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'plain',
        role: UserRole.PATIENT,
      };
      repo.findOne!.mockResolvedValue(userEntity);

      await expect(service.create(dto)).rejects.toBeInstanceOf(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('returns all users', async () => {
      repo.find!.mockResolvedValue([userEntity]);
      const result = await service.findAll();
      expect(repo.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual([userEntity]);
    });
  });

  describe('findByEmail', () => {
    it('returns a single user or null', async () => {
      repo.findOne!.mockResolvedValue(userEntity);
      const result = await service.findByEmail('john@example.com');
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
      });
      expect(result).toEqual(userEntity);
    });
  });

  describe('findOne', () => {
    it('returns a user when found', async () => {
      repo.findOne!.mockResolvedValue(userEntity);
      const result = await service.findOne(1);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(userEntity);
    });

    it('throws NotFoundException when not found', async () => {
      repo.findOne!.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('updates a user successfully (with password hash + unique email)', async () => {
      const dto: UpdateUserDto = {
        email: 'new@example.com',
        password: 'newpass',
      };

      repo
        .findOne!.mockResolvedValueOnce(userEntity) // first findOne: check user exists
        .mockResolvedValueOnce(null); // second findOne: email uniqueness
      repo.preload!.mockResolvedValue({
        ...userEntity,
        ...dto,
        password: 'hashed-password',
      });
      repo.save!.mockResolvedValue({
        ...userEntity,
        ...dto,
        password: 'hashed-password',
      });

      const result = await service.update(1, dto);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpass', 12);
      expect(repo.preload).toHaveBeenCalledWith({
        id: 1,
        email: 'new@example.com',
        password: 'hashed-password',
      });
      expect(result).toEqual({
        ...userEntity,
        email: 'new@example.com',
        password: 'hashed-password',
      });
    });

    it('throws NotFoundException if user to update not found', async () => {
      repo.findOne!.mockResolvedValue(null);
      await expect(service.update(1, {})).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('throws ConflictException if new email already exists', async () => {
      const dto: UpdateUserDto = { email: 'taken@example.com' };

      repo
        .findOne!.mockResolvedValueOnce(userEntity) // target user exists
        .mockResolvedValueOnce({ id: 2, email: 'taken@example.com' }); // another user with same email

      await expect(service.update(1, dto)).rejects.toBeInstanceOf(
        ConflictException,
      );
    });

    it('throws NotFoundException if preload returns null', async () => {
      const dto: UpdateUserDto = { email: 'new@example.com' };

      repo
        .findOne!.mockResolvedValueOnce(userEntity) // target user exists
        .mockResolvedValueOnce(null); // unique email OK
      repo.preload!.mockResolvedValue(null);

      await expect(service.update(1, dto)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('removes a user', async () => {
      const deleteResult: DeleteResult = { affected: 1, raw: {} };
      repo.delete!.mockResolvedValue(deleteResult);

      await expect(service.remove(1)).resolves.toBeUndefined();
      expect(repo.delete).toHaveBeenCalledWith(1);
    });

    it('throws NotFoundException if no user deleted', async () => {
      const deleteResult: DeleteResult = { affected: 0, raw: {} };
      repo.delete!.mockResolvedValue(deleteResult);

      await expect(service.remove(1)).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('validatePassword', () => {
    it('delegates to bcrypt.compare', async () => {
      const result = await service.validatePassword('plain', 'hashed');
      expect(bcrypt.compare).toHaveBeenCalledWith('plain', 'hashed');
      expect(result).toBe(true);
    });
  });
});
