import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Accomodation } from '../entites/accomodation.entity'

@InputType()
export class PaginationInput {
  uid: string
  skip: number
  take: number
}

@ObjectType()
export class PaginationOutput {
  @Field(() => [Accomodation])
  accomodations: Accomodation[]

  @Field(() => Number)
  totalCount: number
}
