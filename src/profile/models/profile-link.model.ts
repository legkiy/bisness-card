import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('ProfileLink')
export class ProfileLinkModel {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  url!: string;
}