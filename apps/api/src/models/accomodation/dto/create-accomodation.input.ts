import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { Accomodation } from '../entites/accomodation.entity'
import { Address } from 'src/models/address/entities/address.entity'

@InputType()
export class CreateAccomodationInput extends PickType(
  Accomodation,
  ['companyId', 'description', 'displayName', 'images'],
  InputType,
) {}

@InputType()
export class CreateAccomodationWithAddressInput extends PickType(
  Accomodation,
  ['companyId', 'description', 'displayName', 'images'],
  InputType,
) {
  address: string
  lat: number
  lng: number
}

@ObjectType()
export class CreateAccomodationWithAddressOutput {
  accomodation: Accomodation
  address: Address
}
