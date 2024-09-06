import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { ManagersService } from './managers.service'
import { Manager } from './entities/manager.entity'
import { CreateManagerInput } from './dto/create-manager.input'
import { UpdateManagerInput } from './dto/update-manager.input'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Company } from '../companies/entities/company.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'

@Resolver(() => Manager)
export class ManagerResolver {
  constructor(
    private readonly managerService: ManagersService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('customer', 'manager')
  @Mutation(() => Manager)
  async createManager(
    @Args('createManagerInput') createManagerInput: CreateManagerInput,
    @GetUser() user: GetUserType,
  ) {
    return this.managerService.createManager(createManagerInput, user.uid)
  }

  @AllowAuthenticated('admin')
  @Query(() => [Manager], { name: 'managers' })
  findAll() {
    return this.managerService.managers({})
  }

  @AllowAuthenticated('manager', 'admin')
  @Query(() => Manager, { name: 'manager' })
  findOne(@Args('uid') uid: string) {
    return this.managerService.manager({ uid: String(uid) })
  }

  @AllowAuthenticated('manager')
  @Mutation(() => Manager)
  async updateManager(
    @Args('updateManagerInput') updateManagerInput: UpdateManagerInput,
  ) {
    return this.managerService.updateManager(updateManagerInput)
  }

  @AllowAuthenticated('admin', 'manager')
  @Mutation(() => Manager)
  removeManager(@Args('uid') uid: string) {
    return this.managerService.deleteManager({ uid: uid })
  }

  @ResolveField(() => Company, { nullable: true })
  manager(@Parent() manager: Manager) {
    return this.prisma.company.findUnique({ where: { id: manager.companyId } })
  }
}
