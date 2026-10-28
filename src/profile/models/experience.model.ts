import {
  Field,
  GraphQLISODateTime,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType('Experience')
export class ExperienceModel {
  @Field(() => String)
  company!: string;

  @Field(() => String)
  position!: string;

  @Field(() => GraphQLISODateTime)
  startDate!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate!: Date | null;

  @Field(() => [String])
  achievements!: string[];
}