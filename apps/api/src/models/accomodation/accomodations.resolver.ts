import {
  Mutation,
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { Accomodation } from './entites/accomodation.entity'
import { AccomodationService } from './accomodations.service'
import { PrismaService } from 'src/common/prisma/prisma.service'
import {
  CreateAccomodationInput,
  CreateAccomodationWithAddressInput,
  CreateAccomodationWithAddressOutput,
} from './dto/create-accomodation.input'
import { UpdateAccomodationInput } from './dto/update-accomodation.input'
import { Address } from '../address/entities/address.entity'
import {
  PaginationInput,
  PaginationOutput,
} from './dto/filter-accomodation.input'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'

@Resolver(() => Accomodation)
export class AccomodationResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly accomodationService: AccomodationService,
  ) {}

  @AllowAuthenticated()
  @Query(() => Accomodation, { name: 'accomodation' })
  findOne(@Args('id') id: number) {
    return this.accomodationService.accomodation({ id: Number(id) })
  }

  @AllowAuthenticated()
  @Query(() => [Accomodation], { name: 'accomodations' })
  findAll() {
    return this.accomodationService.accomodations({})
  }

  @AllowAuthenticated()
  @Query(() => PaginationOutput, { nullable: true })
  paginationFilter(@Args('paginationInput') paginationInput: PaginationInput) {
    return this.accomodationService.accomodationsPagination(paginationInput)
  }

  @AllowAuthenticated('manager', 'admin')
  @Mutation(() => Accomodation)
  async createAccomodation(
    @Args('createAccomodationInput')
    createAccomodationInput: CreateAccomodationInput,
    @GetUser() user: GetUserType,
  ) {
    return this.accomodationService.createAccomodation(
      createAccomodationInput,
      user.uid,
    )
  }

  @AllowAuthenticated('manager', 'admin')
  @Mutation(() => CreateAccomodationWithAddressOutput)
  async createAccomodationWithAddress(
    @Args('createAccomodationWithAddressInput')
    createAccomodationWithAddressInput: CreateAccomodationWithAddressInput,
    @GetUser() user: GetUserType,
  ) {
    return this.accomodationService.createAccomodationWithAddress(
      createAccomodationWithAddressInput,
      user.uid,
    )
  }

  @AllowAuthenticated('manager', 'admin')
  @Mutation(() => Accomodation)
  async updateAccomodation(
    @Args('updateAccomodationInput')
    updateAccomodationInput: UpdateAccomodationInput,
    @GetUser()
    user: GetUserType,
  ) {
    return this.accomodationService.updateAccomodation(
      updateAccomodationInput,
      user.uid,
    )
  }

  @AllowAuthenticated('manager', 'admin')
  @Mutation(() => Accomodation)
  removeAccomodation(@Args('id') id: number, @GetUser() user: GetUserType) {
    return this.accomodationService.deleteAccomodation(
      {
        id: id,
      },
      user.uid,
    )
  }

  @ResolveField(() => Address, { nullable: true })
  address(@Parent() accomodation: Accomodation) {
    return this.prisma.address.findUnique({
      where: { accomodationId: accomodation.id },
    })
  }
}
