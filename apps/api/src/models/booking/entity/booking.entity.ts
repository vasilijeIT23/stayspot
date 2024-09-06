import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Booking {
  @Field(() => Number)
  id: number
  @Field(() => Date)
  createdAt: Date
  @Field(() => Date)
  updatedAt: Date
  @Field(() => Number)
  pricePerDay: number
  @Field(() => Number)
  totalPrice: number
  @Field(() => Date)
  startDate: Date
  @Field(() => Date)
  endDate: Date
  @Field(() => String)
  phoneNumber: string
  @Field(() => Number)
  apartmentId: number
  @Field(() => String)
  customerId: string
}
