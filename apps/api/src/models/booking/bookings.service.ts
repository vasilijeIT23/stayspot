import { Injectable } from '@nestjs/common'
import { Booking, Prisma } from '@prisma/client'
import { UpdateBookingInput } from './dto/update-booking.input'
import { CreateBookingInput } from './dto/create-booking.input'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class BookingService {
  constructor(private readonly prismaService: PrismaService) {}

  async createBooking(data: CreateBookingInput): Promise<Booking> {
    try {
      const booking = await this.prismaService.booking.create({
        data: data,
      })
      return booking
    } catch (error) {
      throw new Error(error)
    }
  }

  async bookings(params: {
    skip?: number
    take?: number
    cursor?: Prisma.BookingWhereUniqueInput
    where?: Prisma.BookingWhereInput
    orderBy?: Prisma.BookingOrderByWithRelationInput
  }): Promise<Booking[]> {
    const { skip, take, cursor, where, orderBy } = params
    try {
      const bookings = this.prismaService.booking.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      })
      return bookings
    } catch (error) {
      throw new Error(error)
    }
  }

  async bookingsByUser(uid: string): Promise<Booking[] | null> {
    const bookings = this.prismaService.booking.findMany({
      where: {
        customerId: uid,
      },
    })

    return bookings
  }

  async booking(
    bookingWhereUniqueInput: Prisma.BookingWhereUniqueInput,
  ): Promise<Booking | null> {
    try {
      const data = this.prismaService.booking.findUnique({
        where: bookingWhereUniqueInput,
      })
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateBooking(
    updateBookingInput: UpdateBookingInput,
  ): Promise<Booking> {
    try {
      const { id, ...data } = updateBookingInput
      return this.prismaService.booking.update({
        where: { id },
        data: data,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteBooking(where: Prisma.BookingWhereUniqueInput): Promise<Booking> {
    return this.prismaService.booking.delete({
      where,
    })
  }
}
