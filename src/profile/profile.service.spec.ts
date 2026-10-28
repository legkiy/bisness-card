import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { vi } from 'vitest';
import { ProfileRepository } from './profile.repository.js';
import { ProfileService } from './profile.service.js';

describe('ProfileService', () => {
  const repository = {
    findById: vi.fn(),
  };

  let service: ProfileService;

  beforeEach(async () => {
    repository.findById.mockReset();

    const module = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: ProfileRepository,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get(ProfileService);
  });

  it('возвращает найденный профиль', async () => {
    const profile = {
      id: '11111111-1111-4111-8111-111111111111',
      name: 'Максаков Никита Владимирович',
      description: 'Fullstack-разработчик',
      createdAt: new Date(),
      updatedAt: new Date(),
      links: [],
      skills: [],
      experience: [],
      projects: [],
    };

    repository.findById.mockResolvedValue(profile);

    await expect(service.getProfile()).resolves.toEqual(profile);
  });

  it('выбрасывает ошибку, если профиль отсутствует', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.getProfile()).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
