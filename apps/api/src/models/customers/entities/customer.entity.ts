import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Customer {
  @Field(() => String)
  uid: string
  @Field(() => Date)
  createdAt: Date
  @Field(() => Date)
  updatedAt: Date
  @Field(() => String)
  displayName: string
}
