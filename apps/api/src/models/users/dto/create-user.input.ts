import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { User } from '../entities/user.entity'

@InputType()
export class RegisterUserInput extends PickType(
  User,
  ['name', 'image'],
  InputType,
) {
  email: string
  password: string
}

@InputType()
export class LoginInput extends PickType(RegisterUserInput, [
  'email',
  'password',
]) {}

@InputType()
export class ChangeEmailInput extends PickType(RegisterUserInput, ['email']) {
  @Field(() => String)
  newEmail: string
}

@InputType()
export class GetUserInput extends PickType(User, ['uid']) {
  @Field(() => String)
  uid: string
}

@InputType()
export class ChangePasswordInput extends PickType(RegisterUserInput, [
  'email',
]) {
  @Field(() => String)
  newPassword: string
}

@ObjectType()
export class LoginOutput {
  token: string
  user: User
}

@ObjectType()
export class GetUserOutput {
  user: User
}
