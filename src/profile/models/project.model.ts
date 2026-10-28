import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Project')
export class ProjectModel {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  url!: string;
}
