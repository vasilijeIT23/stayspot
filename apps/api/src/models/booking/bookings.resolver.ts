import { Mutation, Resolver, Query, Args } from '@nestjs/graphql'
import { Booking } from './entity/booking.entity'
import { BookingService } from './bookings.service'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateBookingInput } from './dto/create-booking.input'
import { UpdateBookingInput } from './dto/update-booking.input'

@Resolver(() => Booking)
export class BookingResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bookingService: BookingService,
  ) {}

  @Query(() => Booking, { name: 'booking' })
  findOne(@Args('id') id: number) {
    return this.bookingService.booking({ id: Number(id) })
  }

  @Query(() => [Booking], { name: 'bookings' })
  findAll() {
    return this.bookingService.bookings({})
  }

  @Query(() => [Booking])
  findByUser(@Args('uid') uid: string) {
    return this.bookingService.bookingsByUser(uid)
  }

  @Mutation(() => Booking)
  async createBooking(
    @Args('createBookingInput')
    createBookingInput: CreateBookingInput,
  ) {
    return this.bookingService.createBooking(createBookingInput)
  }

  @Mutation(() => Booking)
  async updateBooking(
    @Args('updateBookingInput')
    updateBookingInput: UpdateBookingInput,
  ) {
    return this.bookingService.updateBooking(updateBookingInput)
  }

  @Mutation(() => Booking)
  removeBooking(@Args('id') id: number) {
    return this.bookingService.deleteBooking({ id: id })
  }
}
