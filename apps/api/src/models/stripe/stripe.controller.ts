import { Controller, Get, Post, Body, Query, Res } from '@nestjs/common'
import StripeService from './stripe.service'
import { BookingService } from '../booking/bookings.service'
import { CreateStripeDto } from './dto/create-stripe-session.dto'
import { BadRequestException } from '@nestjs/common'
import { CreateBookingInput } from '../booking/dto/create-booking.input'
import { Response } from 'express'

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly bookingService: BookingService,
  ) {}

  @Get()
  helloStripe() {
    return 'Hello Stripe'
  }

  @Post()
  create(@Body() createStripeDto: CreateStripeDto) {
    return this.stripeService.createStripeSession(createStripeDto)
  }

  @Get('success')
  async handleStripeSuccess(
    @Query('session_id') sessionId: string,
    @Res() res: Response,
  ) {
    if (!sessionId) {
      throw new BadRequestException('Session id missing.')
    }

    const session =
      await this.stripeService.stripe.checkout.sessions.retrieve(sessionId)

    const { bookingData } = session.metadata

    const bookingInput: CreateBookingInput = JSON.parse(bookingData)
    await this.bookingService.createBooking(bookingInput)
    res.redirect(process.env.BOOKING_REDIRECT_URL)
  }
}
