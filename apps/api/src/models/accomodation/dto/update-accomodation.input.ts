import { InputType, PartialType } from '@nestjs/graphql'
import { CreateAccomodationWithAddressInput } from './create-accomodation.input'
import { Accomodation } from '@prisma/client'

@InputType()
export class UpdateAccomodationInput extends PartialType(
  CreateAccomodationWithAddressInput,
) {
  id: Accomodation['id']
}
