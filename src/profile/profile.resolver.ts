import { Query, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service.js';
import { ProfileModel } from './models/profile.model.js';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(private readonly service: ProfileService) {}

  @Query(() => ProfileModel)
  profile() {
    return this.service.getProfile();
  }
}
