import { Injectable, MethodNotAllowedException } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Prisma, Company } from '@prisma/client'
import { UpdateCompanyInput } from './dto/update-company.input'
import {
  CreateCompanyInput,
  CreateCompanyOutput,
} from './dto/create-company.input'
import { Booking } from '../booking/entity/booking.entity'

@Injectable()
export class CompaniesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCompany(
    data: CreateCompanyInput,
    uid: string,
  ): Promise<CreateCompanyOutput> {
    try {
      return this.prismaService.$transaction(async (prisma) => {
        const manager = await prisma.manager.findFirst({
          where: {
            uid: uid,
          },
        })
        console.log(manager)
        if (manager) {
          throw new MethodNotAllowedException(
            'User is already manager of a company.',
          )
        }
        const company = await prisma.company.create({
          data,
        })
        return {
          id: company.id,
          displayName: company.displayName,
          description: company.description,
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async companies(params: {
    skip?: number
    take?: number
    cursor?: Prisma.CompanyWhereUniqueInput
    where?: Prisma.CompanyWhereInput
    orderBy?: Prisma.CompanyOrderByWithRelationInput
  }): Promise<Company[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.company.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async bookingsByCompany(uid: string): Promise<Booking[] | null> {
    const companies = await this.prismaService.company.findMany({
      where: {
        Managers: {
          some: { uid: uid },
        },
      },
      select: {
        Accomodations: {
          select: {
            Apartment: {
              select: {
                Bookings: {
                  select: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    phoneNumber: true,
                    pricePerDay: true,
                    startDate: true,
                    endDate: true,
                    totalPrice: true,
                    apartmentId: true,
                    customerId: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    // Use flatMap after resolving the promise
    const flattenedBookings = companies.flatMap((company) =>
      company.Accomodations.flatMap((accommodation) =>
        accommodation.Apartment.flatMap((apartment) => apartment.Bookings),
      ),
    )

    return flattenedBookings
  }

  async company(
    companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput,
  ): Promise<Company | null> {
    return this.prismaService.company.findUnique({
      where: companyWhereUniqueInput,
    })
  }

  async updateCompany(
    updateCompanyInput: UpdateCompanyInput,
  ): Promise<Company> {
    const { id, ...data } = updateCompanyInput
    return this.prismaService.company.update({
      where: { id },
      data: data,
    })
  }

  async deleteCompany(where: Prisma.CompanyWhereUniqueInput): Promise<Company> {
    return this.prismaService.company.delete({
      where,
    })
  }
}
