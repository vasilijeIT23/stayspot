import { User } from '@prisma/client'
import { RegisterUserInput } from './create-user.input'
import { InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput extends PartialType(RegisterUserInput) {
  uid: User['uid']
}
