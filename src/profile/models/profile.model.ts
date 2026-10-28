import { Field, ObjectType } from '@nestjs/graphql';
import { ProfileLinkModel } from './profile-link.model.js';
import { SkillModel } from './skill.model.js';
import { ProjectModel } from './project.model.js';
import { ExperienceModel } from './experience.model.js';

@ObjectType('Profile')
export class ProfileModel {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => [ProfileLinkModel])
  links!: ProfileLinkModel[];

  @Field(() => [SkillModel])
  skills!: SkillModel[];

  @Field(() => [ProjectModel])
  projects!: ProjectModel[];

  @Field(() => [ExperienceModel])
  experience!: ExperienceModel[];
}
