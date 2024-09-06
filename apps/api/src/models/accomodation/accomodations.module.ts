import { Module } from '@nestjs/common'
import { AccomodationService } from './accomodations.service'
import { AccomodationResolver } from './accomodations.resolver'

@Module({
  providers: [AccomodationResolver, AccomodationService],
  exports: [AccomodationService],
})
export class AccomodationModule {}
