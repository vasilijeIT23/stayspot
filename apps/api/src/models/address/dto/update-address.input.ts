import { InputType, PartialType } from '@nestjs/graphql'
import { CreateAddressInput } from './create-address.input'
import { Address } from '../entities/address.entity'

@InputType()
export class UpdateAddressInput extends PartialType(CreateAddressInput) {
  id: Address['id']
}
