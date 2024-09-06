import { CreateBookingInput } from 'src/models/booking/dto/create-booking.input'

export class CreateStripeDto {
  uid: string
  totalPrice: number
  bookingData: CreateBookingInput
}
