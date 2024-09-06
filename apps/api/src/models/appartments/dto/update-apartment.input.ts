import { InputType, PartialType } from '@nestjs/graphql'
import { CreateApartmentInput } from './create-apartment.input'
import { Apartment } from '@prisma/client'

@InputType()
export class UpdateApartmentInput extends PartialType(CreateApartmentInput) {
  id: Apartment['id']
}
