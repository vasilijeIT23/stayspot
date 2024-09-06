import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Prisma, User } from '@prisma/client'
import { UpdateUserInput } from './dto/update-user.input'
import {
  ChangeEmailInput,
  ChangePasswordInput,
  GetUserInput,
  GetUserOutput,
  LoginInput,
  LoginOutput,
  RegisterUserInput,
} from './dto/create-user.input'
import * as bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { JwtService } from '@nestjs/jwt'
import { GetUserType } from 'src/common/types'

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      const user = await this.prismaService.user.create({
        data,
      })
      return user
    } catch (err) {
      throw new Error(err)
    }
  }

  async register({ email, name, password, image }: RegisterUserInput) {
    const existingUser = await this.prismaService.credentials.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new BadRequestException('User whit given email already registered')
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)

    const uid = uuid()

    return this.prismaService.user.create({
      data: {
        uid,
        name,
        image,
        Credentials: {
          create: {
            email,
            passwordHash,
          },
        },
        Customer: {
          create: {
            displayName: name,
          },
        },
      },
      include: {
        Credentials: true,
      },
    })
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    const user = await this.prismaService.user.findFirst({
      where: {
        Credentials: { email },
      },
      include: {
        Credentials: true,
      },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const isPasswordValid = bcrypt.compareSync(
      password,
      user.Credentials.passwordHash,
    )

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const jwtToken = this.jwtService.sign(
      { uid: user.uid },
      {
        algorithm: 'HS256',
      },
    )

    return { token: jwtToken, user }
  }

  async changeEmail({ email, newEmail }: ChangeEmailInput): Promise<boolean> {
    const user = await this.prismaService.user.findFirst({
      where: {
        Credentials: { email },
      },
      include: {
        Credentials: true,
      },
    })

    const userAlreadyExists = await this.prismaService.user.findFirst({
      where: {
        Credentials: { email: newEmail },
      },
      include: {
        Credentials: true,
      },
    })

    if (userAlreadyExists) {
      throw new UnauthorizedException('User with email address already exists.')
    }

    if (!user) {
      throw new UnauthorizedException('Invalid email address.')
    }

    const updatedUser = await this.prismaService.credentials.update({
      where: { email },
      data: {
        passwordHash: user.Credentials.passwordHash,
        email: newEmail,
      },
    })

    if (updatedUser) {
      console.log('Email updated successfully! ')
      return true
    }
    throw new Error('Email update failed. ')
  }

  async changePassword({
    email,
    newPassword,
  }: ChangePasswordInput): Promise<boolean> {
    const user = await this.prismaService.user.findFirst({
      where: {
        Credentials: { email },
      },
      include: {
        Credentials: true,
      },
    })

    if (!user) {
      throw new BadRequestException('Invalid email address.')
    }

    const isPasswordValid = bcrypt.compareSync(
      newPassword,
      user.Credentials.passwordHash,
    )

    if (isPasswordValid) {
      throw new BadRequestException(
        'New password cannot be same as old password',
      )
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(newPassword, salt)

    const updatedUser = await this.prismaService.credentials.update({
      where: { email },
      data: {
        passwordHash: passwordHash,
        email: user.Credentials.email,
      },
    })

    if (updatedUser) {
      console.log('Password updated successfully! ')
      return true
    }
    throw new Error('Password update failed. ')
  }

  async users(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async user(
    { uid }: GetUserInput,
    userr: GetUserType,
  ): Promise<GetUserOutput> {
    if (uid !== userr.uid && !userr.roles.includes('admin')) {
      console.log(userr.uid + 'dfsdfsdf' + uid)
      throw new UnauthorizedException('Only admin can see other users.')
    }
    const user = await this.prismaService.user.findFirst({
      where: {
        Credentials: { uid },
      },
      include: {
        Credentials: true,
      },
    })
    return { user }
  }

  async updateUser(
    updateUserInput: UpdateUserInput,
    userId: string,
  ): Promise<User> {
    const { uid, ...data } = updateUserInput
    const oldUser = await this.prismaService.user.findUnique({
      where: {
        uid: uid,
      },
    })

    if (!oldUser) {
      throw new BadRequestException('User with id not found')
    }

    if (uid !== userId) {
      throw new UnauthorizedException(
        'Only account owner can update their account.',
      )
    }

    return this.prismaService.user.update({
      where: { uid },
      data: data,
    })
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({
      where,
    })
  }
}
