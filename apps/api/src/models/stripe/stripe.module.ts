import { Module } from '@nestjs/common'

import { StripeController } from './stripe.controller'
import StripeService from './stripe.service'
import { BookingService } from '../booking/bookings.service'

@Module({
  controllers: [StripeController],
  providers: [StripeService, BookingService],
})
export class StripeModule {}
