import { Injectable } from '@nestjs/common'
import { Address, Prisma } from '@prisma/client'
import { UpdateAddressInput } from './dto/update-address.input'
import { CreateAddressInput } from './dto/create-address.input'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAddress(data: CreateAddressInput): Promise<Address> {
    try {
      const address = await this.prismaService.address.create({
        data: data,
      })
      return address
    } catch (error) {
      throw new Error(error)
    }
  }

  async addresss(params: {
    skip?: number
    take?: number
    cursor?: Prisma.AddressWhereUniqueInput
    where?: Prisma.AddressWhereInput
    orderBy?: Prisma.AddressOrderByWithRelationInput
  }): Promise<Address[]> {
    const { skip, take, cursor, where, orderBy } = params
    try {
      const addresss = this.prismaService.address.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      })
      return addresss
    } catch (error) {
      throw new Error(error)
    }
  }

  async address(
    addressWhereUniqueInput: Prisma.AddressWhereUniqueInput,
  ): Promise<Address | null> {
    try {
      const data = this.prismaService.address.findUnique({
        where: addressWhereUniqueInput,
      })
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateAddress(
    updateAddressInput: UpdateAddressInput,
  ): Promise<Address> {
    try {
      const { id, ...data } = updateAddressInput
      return this.prismaService.address.update({
        where: { id },
        data: data,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteAddress(where: Prisma.AddressWhereUniqueInput): Promise<Address> {
    return this.prismaService.address.delete({
      where,
    })
  }
}
