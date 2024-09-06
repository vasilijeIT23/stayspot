import { InputType, PartialType } from '@nestjs/graphql'
import { CreateBookingInput } from './create-booking.input'
import { Apartment } from '@prisma/client'

@InputType()
export class UpdateBookingInput extends PartialType(CreateBookingInput) {
  id: Apartment['id']
}
