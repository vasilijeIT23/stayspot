import { Module } from '@nestjs/common'
import { BookingService } from './bookings.service'
import { BookingResolver } from './bookings.resolver'

@Module({
  providers: [BookingResolver, BookingService],
  exports: [BookingService],
})
export class BookingModule {}
