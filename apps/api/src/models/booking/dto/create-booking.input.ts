import { InputType, PickType } from '@nestjs/graphql'
import { Booking } from '../entity/booking.entity'

@InputType()
export class CreateBookingInput extends PickType(
  Booking,
  [
    'pricePerDay',
    'totalPrice',
    'startDate',
    'endDate',
    'phoneNumber',
    'apartmentId',
    'customerId',
  ],
  InputType,
) {}
