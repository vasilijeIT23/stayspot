import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { CompaniesService } from './companies.service'
import { Company } from './entities/company.entity'
import {
  CreateCompanyInput,
  CreateCompanyOutput,
} from './dto/create-company.input'
import { UpdateCompanyInput } from './dto/update-company.input'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Manager } from '../managers/entities/manager.entity'
import { Booking } from '../booking/entity/booking.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'

@Resolver(() => Company)
export class CompanyResolver {
  constructor(
    private readonly comapniesService: CompaniesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('customer')
  @Mutation(() => CreateCompanyOutput)
  async createCompany(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
    @GetUser() user: GetUserType,
  ) {
    return this.comapniesService.createCompany(createCompanyInput, user.uid)
  }

  @AllowAuthenticated('admin')
  @Query(() => [Company], { name: 'companies' })
  findAll() {
    return this.comapniesService.companies({})
  }

  @AllowAuthenticated('admin', 'manager')
  @Query(() => [Booking])
  findBookingsByCompany(@Args('uid') uid: string) {
    return this.comapniesService.bookingsByCompany(uid)
  }

  @AllowAuthenticated('admin', 'manager')
  @Query(() => Company, { name: 'company' })
  findOne(@Args('id') id: number) {
    return this.comapniesService.company({ id: Number(id) })
  }

  @AllowAuthenticated('manager')
  @Mutation(() => Company)
  async updateCompany(
    @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput,
  ) {
    return this.comapniesService.updateCompany(updateCompanyInput)
  }

  @AllowAuthenticated('admin', 'manager')
  @Mutation(() => Company)
  removeCompany(@Args('id') id: number) {
    return this.comapniesService.deleteCompany({ id: id })
  }

  @ResolveField(() => [Manager], { nullable: true })
  managers(@Parent() company: Company) {
    return this.prisma.manager.findMany({ where: { companyId: company.id } })
  }
}
