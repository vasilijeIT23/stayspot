import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Address {
  @Field(() => Number)
  id: number
  @Field(() => Date)
  createdAt: Date
  @Field(() => Date)
  updatedAt: Date
  @Field(() => String)
  address: string
  @Field(() => Number)
  lat: number
  @Field(() => Number)
  lng: number
  @Field(() => Number)
  accomodationId: number
}
