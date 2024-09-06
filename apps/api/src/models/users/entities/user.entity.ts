import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => String)
  uid: string
  @Field(() => Date)
  createdAt: Date
  @Field(() => Date)
  updatedAt: Date
  @Field(() => String)
  name: string
  @Field(() => String)
  image: string
}
