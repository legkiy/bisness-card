import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from './profile.repository.js';

const PROFILE_ID = '11111111-1111-4111-8111-111111111111';

@Injectable()
export class ProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  async getProfile() {
    const profile = await this.repository.findById(PROFILE_ID);

    if (!profile) {
      throw new NotFoundException('Профиль не найден');
    }

    return profile;
  }
}
