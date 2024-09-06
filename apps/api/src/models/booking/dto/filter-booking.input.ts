import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Booking } from '../entity/booking.entity'

@InputType()
export class FilterApartmentsByDateInput {
  startDate: Date
  endDate: Date
}

@ObjectType()
export class FilterApartmentsByDateOutput {
  @Field(() => [Booking])
  bookings: Booking[]

  @Field(() => Number)
  totalCount: number
}
