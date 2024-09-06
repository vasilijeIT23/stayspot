import { Mutation, Resolver, Query, Args } from '@nestjs/graphql'
import { Address } from './entities/address.entity'
import { AddressService } from './addresses.service'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateAddressInput } from './dto/create-address.input'
import { UpdateAddressInput } from './dto/update-address.input'

@Resolver(() => Address)
export class AddressResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly addressService: AddressService,
  ) {}

  @Query(() => Address, { name: 'address' })
  findOne(@Args('id') id: number) {
    return this.addressService.address({ id: Number(id) })
  }

  @Query(() => [Address], { name: 'addresss' })
  findAll() {
    return this.addressService.addresss({})
  }

  @Mutation(() => Address)
  async createAddress(
    @Args('createAddressInput')
    createAddressInput: CreateAddressInput,
  ) {
    return this.addressService.createAddress(createAddressInput)
  }

  @Mutation(() => Address)
  async updateAddress(
    @Args('updateAddressInput')
    updateAddressInput: UpdateAddressInput,
  ) {
    return this.addressService.updateAddress(updateAddressInput)
  }

  @Mutation(() => Address)
  removeAddress(@Args('id') id: number) {
    return this.addressService.deleteAddress({ id: id })
  }
}
