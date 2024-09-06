import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { $Enums } from '@prisma/client'

registerEnumType($Enums.ApartmentType, {
  name: 'SlotType',
})

@ObjectType()
export class Apartment {
  @Field(() => Number)
  id: number
  @Field(() => Date)
  createdAt: Date
  @Field(() => Date)
  updatedAt: Date
  @Field(() => String)
  displayName: string
  @Field(() => Number)
  pricePerDay: number
  @Field(() => Number)
  area: number
  @Field(() => Number)
  sleepingUnits: number
  @Field(() => Number)
  aptFloor: number
  @Field(() => Number)
  aptNumber: number
  @Field(() => Number)
  accomodationId: number
  @Field(() => $Enums.ApartmentType)
  type: $Enums.ApartmentType
}
