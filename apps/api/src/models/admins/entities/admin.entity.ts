import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Admin {
  @Field(() => String)
  uid: string
  @Field(() => Date)
  createdAt: Date
  @Field(() => Date)
  updatedAt: Date
}
