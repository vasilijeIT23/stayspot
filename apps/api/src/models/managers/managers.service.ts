import { Manager, Prisma } from '@prisma/client'
import { CreateManagerInput } from './dto/create-manager.input'
import { PrismaService } from 'src/common/prisma/prisma.service'
import {
  BadRequestException,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common'
import { UpdateManagerInput } from './dto/update-manager.input'

@Injectable()
export class ManagersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createManager(data: CreateManagerInput, uid: string): Promise<Manager> {
    try {
      const user = await this.prismaService.manager.findUnique({
        where: {
          uid: uid,
        },
      })

      const company = await this.prismaService.company.findUnique({
        where: {
          id: data.companyId,
        },
        include: {
          Managers: true,
        },
      })

      if (!company) {
        throw new BadRequestException('No company whit this id')
      }

      if (!user && company.Managers.length > 0) {
        throw new MethodNotAllowedException(
          'This user is not allowed to create manager',
        )
      }

      const manager = await this.prismaService.manager.create({
        data: data,
      })
      return manager
    } catch (err) {
      throw new Error(err)
    }
  }

  async managers(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ManagerWhereUniqueInput
    where?: Prisma.ManagerWhereInput
    orderBy?: Prisma.ManagerOrderByWithRelationInput
  }): Promise<Manager[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.manager.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async manager(
    managerWhereUniqueInput: Prisma.ManagerWhereUniqueInput,
  ): Promise<Manager | null> {
    return this.prismaService.manager.findUnique({
      where: managerWhereUniqueInput,
    })
  }

  async updateManager(
    updateManagerInput: UpdateManagerInput,
  ): Promise<Manager> {
    const { uid, ...data } = updateManagerInput
    return this.prismaService.manager.update({
      where: { uid },
      data: data,
    })
  }

  async deleteManager(where: Prisma.ManagerWhereUniqueInput): Promise<Manager> {
    return this.prismaService.manager.delete({
      where,
    })
  }
}
