import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.profile.findUnique({
      where: { id },
      include: {
        links: {
          orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
        },
        skills: {
          orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
        },
        experience: {
          orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
        },
        projects: {
          orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
        },
      },
    });
  }
}
