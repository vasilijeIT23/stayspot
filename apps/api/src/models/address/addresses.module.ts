import { Module } from '@nestjs/common'
import { AddressService } from './addresses.service'
import { AddressResolver } from './addresses.resolver'

@Module({
  providers: [AddressResolver, AddressService],
  exports: [AddressService],
})
export class AddressModule {}
