import { Field, InputType, ObjectType, Int } from '@nestjs/graphql'
import { Apartment } from '../entities/apartment.entity'
import { Accomodation } from 'src/models/accomodation/entites/accomodation.entity'

@InputType()
export class PaginationApartmentsInput {
  skip: number
  take: number
  accomodationId: number
}

@ObjectType()
export class PaginationApartmentsOutput {
  @Field(() => [Apartment])
  apartments: Apartment[]

  @Field(() => Number)
  totalCount: number
}

@InputType()
export class FilterAccomodationsByDateInput {
  startDate: Date
  endDate: Date
}

@ObjectType()
export class AccomodationToApartments {
  @Field(() => Accomodation)
  accomodation: Accomodation

  @Field(() => [Int])
  apartmentIds: number[]
}

@ObjectType()
export class FilterAccomodationsByDateOutput {
  @Field(() => [AccomodationToApartments], { nullable: true })
  accomodationToApartments: AccomodationToApartments[]
}
