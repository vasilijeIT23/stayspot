import { Module } from '@nestjs/common'
import { ManagersService } from './managers.service'
import { ManagerResolver } from './managers.resolver'

@Module({
  providers: [ManagerResolver, ManagersService],
  exports: [ManagersService],
})
export class ManagersModule {}
