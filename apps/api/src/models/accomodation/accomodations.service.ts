import {
  BadRequestException,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common'
import { Accomodation, Prisma } from '@prisma/client'
import { UpdateAccomodationInput } from './dto/update-accomodation.input'
import {
  CreateAccomodationInput,
  CreateAccomodationWithAddressInput,
  CreateAccomodationWithAddressOutput,
} from './dto/create-accomodation.input'
import { PrismaService } from 'src/common/prisma/prisma.service'
import {
  PaginationInput,
  PaginationOutput,
} from './dto/filter-accomodation.input'

@Injectable()
export class AccomodationService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAccomodation(
    data: CreateAccomodationInput,
    uid: string,
  ): Promise<Accomodation> {
    try {
      const company = await this.prismaService.company.findFirst({
        where: {
          Managers: {
            some: {
              uid: uid,
            },
          },
        },
      })
      if (!company) {
        throw new MethodNotAllowedException('Not a manager')
      }
      const accomodation = await this.prismaService.accomodation.create({
        data: data,
      })
      return accomodation
    } catch (error) {
      throw new Error(error)
    }
  }

  async createAccomodationWithAddress(
    data: CreateAccomodationWithAddressInput,
    uid: string,
  ): Promise<CreateAccomodationWithAddressOutput> {
    try {
      const company = await this.prismaService.company.findFirst({
        where: {
          Managers: {
            some: {
              uid: uid,
            },
          },
        },
      })
      if (!company) {
        throw new MethodNotAllowedException('Not a manager')
      }

      const accomodation = await this.prismaService.accomodation.findFirst({
        where: {
          Address: {
            lat: data.lat,
            lng: data.lng,
          },
        },
      })

      if (accomodation) {
        throw new BadRequestException(
          'Accomodation already exists on given address. Please select different one. ',
        )
      }

      const result = await this.prismaService.accomodation.create({
        data: {
          displayName: data.displayName,
          description: data.description,
          images: data.images,
          companyId: data.companyId,
          Address: {
            create: {
              address: data.address,
              lat: data.lat,
              lng: data.lng,
            },
          },
        },
        include: {
          Address: true,
        },
      })
      return { accomodation: result, address: result.Address }
    } catch (error) {
      throw new Error(error)
    }
  }

  async accomodations(params: {
    skip?: number
    take?: number
    cursor?: Prisma.AccomodationWhereUniqueInput
    where?: Prisma.AccomodationWhereInput
    orderBy?: Prisma.AccomodationOrderByWithRelationInput
  }): Promise<Accomodation[]> {
    const { skip, take, cursor, where, orderBy } = params
    try {
      const accomodations = this.prismaService.accomodation.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      })
      return accomodations
    } catch (error) {
      throw new Error(error)
    }
  }

  async accomodationsPagination(
    paginationInput: PaginationInput,
  ): Promise<PaginationOutput> {
    try {
      const { skip = 0, take = 10, uid } = paginationInput

      const accomodations = await this.prismaService.accomodation.findMany({
        where: {
          Company: {
            Managers: {
              some: {
                uid: uid,
              },
            },
          },
        },
        skip,
        take,
      })

      const totalCount = await this.prismaService.accomodation.count()

      if (!accomodations.length) {
        throw new NotFoundException('No data')
      }

      return { accomodations, totalCount }
    } catch (error) {
      // throw new Error(error)
      console.error(error)
    }
  }

  async accomodation(
    accomodationWhereUniqueInput: Prisma.AccomodationWhereUniqueInput,
  ): Promise<Accomodation | null> {
    try {
      const data = this.prismaService.accomodation.findUnique({
        where: accomodationWhereUniqueInput,
      })
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateAccomodation(
    updateAccomodationInput: UpdateAccomodationInput,
    uid: string,
  ): Promise<Accomodation> {
    try {
      const manager = this.prismaService.manager.findUnique({
        where: {
          uid: uid,
        },
      })

      if (!manager) {
        throw new MethodNotAllowedException('Not a manager')
      }

      console.log((await manager).companyId)

      console.log(updateAccomodationInput.companyId)

      if ((await manager).companyId != updateAccomodationInput.companyId) {
        throw new MethodNotAllowedException('Not a manager of this company')
      }
      const { id, ...data } = updateAccomodationInput
      return this.prismaService.accomodation.update({
        where: { id },
        data: {
          displayName: data.displayName,
          description: data.description,
          images: data.images,
          Address: {
            update: {
              address: data.address,
              lat: data.lat,
              lng: data.lng,
            },
          },
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteAccomodation(
    where: Prisma.AccomodationWhereUniqueInput,
    uid: string,
  ): Promise<Accomodation> {
    const manager = this.prismaService.manager.findUnique({
      where: {
        uid: uid,
      },
    })

    if (!manager) {
      throw new MethodNotAllowedException('Not a manager')
    }

    const accommodation = await this.prismaService.accomodation.findUnique({
      where: {
        id: where.id,
      },
    })

    if ((await manager).companyId != accommodation.companyId) {
      throw new MethodNotAllowedException('Not a manager of this company')
    }
    return this.prismaService.$transaction(async (prisma) => {
      // Delete the address first
      await prisma.address.delete({
        where: {
          accomodationId: where.id,
        },
      })

      await prisma.apartment.deleteMany({
        where: {
          accomodationId: where.id,
        },
      })

      // Then delete the accommodation
      return prisma.accomodation.delete({
        where,
      })
    })
  }
}
