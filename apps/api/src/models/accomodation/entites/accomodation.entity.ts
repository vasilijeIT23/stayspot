import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Accomodation {
  @Field(() => Number)
  id: number
  @Field(() => Date)
  createdAt: Date
  @Field(() => Date)
  updatedAt: Date
  @Field(() => String)
  displayName: string
  @Field(() => String)
  description: string
  @Field(() => Number)
  companyId: number
  @Field(() => [String])
  images: string[]
}
