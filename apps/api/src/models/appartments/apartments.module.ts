import { Module } from '@nestjs/common'
import { ApartmentService } from './apartments.service'
import { ApartmentResolver } from './apartments.resolver'

@Module({
  providers: [ApartmentResolver, ApartmentService],
  exports: [ApartmentService],
})
export class ApartmentModule {}
