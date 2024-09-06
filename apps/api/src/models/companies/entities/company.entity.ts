import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Company {
  @Field(() => String)
  id: number
  @Field(() => Date)
  createdAt: Date
  @Field(() => Date)
  updatedAt: Date
  @Field(() => String)
  displayName: string
  @Field(() => String, { nullable: true })
  description: string
}
