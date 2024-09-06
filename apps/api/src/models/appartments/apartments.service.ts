import { Injectable, NotFoundException } from '@nestjs/common'
import { Apartment, Prisma } from '@prisma/client'
import { UpdateApartmentInput } from './dto/update-apartment.input'
import { CreateApartmentInput } from './dto/create-apartment.input'
import { PrismaService } from 'src/common/prisma/prisma.service'
import {
  PaginationApartmentsInput,
  PaginationApartmentsOutput,
  FilterAccomodationsByDateInput,
  FilterAccomodationsByDateOutput,
} from './dto/filter-apartments.input'
import { Accomodation } from '../accomodation/entites/accomodation.entity'
import { MethodNotAllowedException } from '@nestjs/common'

@Injectable()
export class ApartmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createApartment(
    data: CreateApartmentInput,
    uid: string,
  ): Promise<Apartment> {
    try {
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
          id: data.accomodationId,
        },
      })

      if ((await manager).companyId != accommodation.companyId) {
        throw new MethodNotAllowedException('Not a manager of this company')
      }

      const apartment = await this.prismaService.apartment.create({
        data: data,
      })
      return apartment
    } catch (error) {
      throw new Error(error)
    }
  }

  async apartments(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ApartmentWhereUniqueInput
    where?: Prisma.ApartmentWhereInput
    orderBy?: Prisma.ApartmentOrderByWithRelationInput
  }): Promise<Apartment[]> {
    const { skip, take, cursor, where, orderBy } = params
    try {
      const apartments = this.prismaService.apartment.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      })
      return apartments
    } catch (error) {
      throw new Error(error)
    }
  }

  async apartment(
    apartmentWhereUniqueInput: Prisma.ApartmentWhereUniqueInput,
  ): Promise<Apartment | null> {
    try {
      const data = this.prismaService.apartment.findUnique({
        where: apartmentWhereUniqueInput,
      })
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  async apartmentsPagination(
    paginationInput: PaginationApartmentsInput,
  ): Promise<PaginationApartmentsOutput> {
    try {
      const { skip = 0, take = 10, accomodationId } = paginationInput

      const apartments = await this.prismaService.apartment.findMany({
        skip,
        take,
        where: {
          accomodationId: accomodationId,
        },
      })

      const totalCount = await this.prismaService.apartment.count()

      // if (!apartments.length) {
      //   throw new Error('No data')
      // }

      return { apartments, totalCount }
    } catch (error) {
      throw new Error(error)
    }
  }

  async getAvailableAccommodations(
    getAvailableAccommodationsInput: FilterAccomodationsByDateInput,
  ): Promise<FilterAccomodationsByDateOutput | null> {
    const { startDate, endDate } = getAvailableAccommodationsInput

    // Find apartments that are not booked within the date range
    const availableApartments = await this.prismaService.apartment.findMany({
      where: {
        Bookings: {
          none: {
            startDate: {
              lte: endDate,
            },
            endDate: {
              gte: startDate,
            },
          },
        },
      },
      include: {
        Accomodation: true, // Include the Accomodation object
      },
    })

    // Initialize an object to group apartment IDs by accommodation
    const accomodationToApartmentsMap: Record<
      number,
      { accomodation: Accomodation; apartmentIds: number[] }
    > = {}

    // Populate the object with apartments grouped by accomodationId
    availableApartments.forEach((apartment) => {
      const { Accomodation: accomodation, id: apartmentId } = apartment

      if (!accomodationToApartmentsMap[accomodation.id]) {
        accomodationToApartmentsMap[accomodation.id] = {
          accomodation,
          apartmentIds: [],
        }
      }

      accomodationToApartmentsMap[accomodation.id].apartmentIds.push(
        apartmentId,
      )
    })

    // Convert the map to an array of AccomodationToApartments objects
    const accomodationToApartments = Object.values(accomodationToApartmentsMap)

    return {
      accomodationToApartments,
    }
  }

  async updateApartment(
    updateApartmentInput: UpdateApartmentInput,
    uid: string,
  ): Promise<Apartment> {
    try {
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
          id: updateApartmentInput.accomodationId,
        },
      })

      if ((await manager).companyId != accommodation.companyId) {
        throw new MethodNotAllowedException('Not a manager of this company')
      }
      const { id, ...data } = updateApartmentInput
      return this.prismaService.apartment.update({
        where: { id },
        data: data,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteApartment(
    where: Prisma.ApartmentWhereUniqueInput,
    uid: string,
  ): Promise<Apartment> {
    const accomodation = await this.prismaService.accomodation.findFirst({
      where: {
        Apartment: {
          some: {
            id: where.id,
          },
        },
      },
    })

    if (!accomodation) {
      throw new NotFoundException('Accomodation not found')
    }

    const manager = this.prismaService.manager.findUnique({
      where: {
        uid: uid,
      },
    })

    if (!manager) {
      throw new MethodNotAllowedException('Not a manager')
    }

    if ((await manager).companyId != accomodation.companyId) {
      throw new MethodNotAllowedException('Not a manager of this company')
    }
    return this.prismaService.apartment.delete({
      where,
    })
  }
}
