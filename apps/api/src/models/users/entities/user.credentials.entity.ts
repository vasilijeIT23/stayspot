import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Credentials {
  @Field(() => String)
  uid: string
  @Field(() => String)
  email: string
}
