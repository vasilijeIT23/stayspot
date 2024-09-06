import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import {
  ChangeEmailInput,
  ChangePasswordInput,
  GetUserInput,
  GetUserOutput,
  LoginInput,
  LoginOutput,
  RegisterUserInput,
} from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Customer } from '../customers/entities/customer.entity'
import { Admin } from '../admins/entities/admin.entity'
import { Manager } from '../managers/entities/manager.entity'
import { Credentials } from './entities/user.credentials.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => User)
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ) {
    try {
      const user = await this.usersService.register(registerUserInput)
      return user
    } catch (err) {
      throw new Error(err)
    }
  }

  @Mutation(() => LoginOutput)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.usersService.login(loginInput)
  }

  @AllowAuthenticated('admin')
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.users({})
  }

  @AllowAuthenticated()
  @Query(() => GetUserOutput)
  findOne(
    @Args('getUserInput') getUserInput: GetUserInput,
    @GetUser() user: GetUserType,
  ) {
    return this.usersService.user(getUserInput, user)
  }

  @AllowAuthenticated()
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @GetUser() user: GetUserType,
  ) {
    return this.usersService.updateUser(updateUserInput, user.uid)
  }

  @Mutation(() => Boolean)
  async changeEmail(
    @Args('changeEmailInput') changeEmailInput: ChangeEmailInput,
  ) {
    return this.usersService.changeEmail(changeEmailInput)
  }

  @Mutation(() => Boolean)
  async changePassword(
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
  ) {
    return this.usersService.changePassword(changePasswordInput)
  }

  @Mutation(() => User)
  removeUser(@Args('uid') uid: string) {
    return this.usersService.deleteUser({ uid: uid })
  }

  @ResolveField(() => Admin, { nullable: true })
  admin(@Parent() user: User) {
    return this.prisma.admin.findUnique({ where: { uid: user.uid } })
  }

  @ResolveField(() => Manager, { nullable: true })
  manager(@Parent() user: User) {
    return this.prisma.manager.findUnique({ where: { uid: user.uid } })
  }

  @ResolveField(() => Customer, { nullable: true })
  customer(@Parent() user: User) {
    return this.prisma.customer.findUnique({ where: { uid: user.uid } })
  }
  @ResolveField(() => Credentials, { nullable: true })
  credentials(@Parent() user: User) {
    return this.prisma.credentials.findUnique({ where: { uid: user.uid } })
  }
}
