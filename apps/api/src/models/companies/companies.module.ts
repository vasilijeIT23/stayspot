import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CompanyResolver } from './companies.resolver'

@Module({
  providers: [CompanyResolver, CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
