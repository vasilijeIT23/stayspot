import { InputType, PickType } from '@nestjs/graphql'
import { Apartment } from '../entities/apartment.entity'

@InputType()
export class CreateApartmentInput extends PickType(
  Apartment,
  [
    'displayName',
    'pricePerDay',
    'area',
    'sleepingUnits',
    'aptFloor',
    'aptNumber',
    'accomodationId',
    'type',
  ],
  InputType,
) {}
