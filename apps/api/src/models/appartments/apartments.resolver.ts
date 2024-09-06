import {
  Mutation,
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { Apartment } from './entities/apartment.entity'
import { ApartmentService } from './apartments.service'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateApartmentInput } from './dto/create-apartment.input'
import { UpdateApartmentInput } from './dto/update-apartment.input'
import {
  FilterAccomodationsByDateInput,
  FilterAccomodationsByDateOutput,
  PaginationApartmentsInput,
  PaginationApartmentsOutput,
} from './dto/filter-apartments.input'
import { Booking } from '../booking/entity/booking.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'

@Resolver(() => Apartment)
export class ApartmentResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly apartmentService: ApartmentService,
  ) {}

  @AllowAuthenticated()
  @Query(() => Apartment, { name: 'apartment' })
  findOne(@Args('id') id: number) {
    return this.apartmentService.apartment({ id: Number(id) })
  }

  @AllowAuthenticated('admin')
  @Query(() => [Apartment], { name: 'apartments' })
  findAll() {
    return this.apartmentService.apartments({})
  }

  @AllowAuthenticated()
  @Query(() => PaginationApartmentsOutput)
  paginationFilterApartments(
    @Args('paginationInput') paginationInput: PaginationApartmentsInput,
  ) {
    return this.apartmentService.apartmentsPagination(paginationInput)
  }

  @AllowAuthenticated()
  @Query(() => FilterAccomodationsByDateOutput, { nullable: true })
  filterAccomodationsByDate(
    @Args('dateInput') dateInput: FilterAccomodationsByDateInput,
  ) {
    return this.apartmentService.getAvailableAccommodations(dateInput)
  }

  @AllowAuthenticated('manager')
  @Mutation(() => Apartment)
  async createApartment(
    @Args('createApartmentInput')
    createApartmentInput: CreateApartmentInput,
    @GetUser() user: GetUserType,
  ) {
    return this.apartmentService.createApartment(createApartmentInput, user.uid)
  }

  @AllowAuthenticated('manager')
  @Mutation(() => Apartment)
  async updateApartment(
    @Args('updateApartmentInput')
    updateApartmentInput: UpdateApartmentInput,
    @GetUser() user: GetUserType,
  ) {
    return this.apartmentService.updateApartment(updateApartmentInput, user.uid)
  }

  @AllowAuthenticated('manager')
  @Mutation(() => Apartment)
  removeApartment(@Args('id') id: number, @GetUser() user: GetUserType) {
    return this.apartmentService.deleteApartment(
      {
        id: id,
      },
      user.uid,
    )
  }

  @ResolveField(() => [Booking], { nullable: true })
  booking(@Parent() apartment: Apartment) {
    return this.prisma.booking.findUnique({
      where: { id: apartment.id },
    })
  }
}
