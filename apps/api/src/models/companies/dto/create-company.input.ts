import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { Company } from '../entities/company.entity'

@InputType()
export class CreateCompanyInput extends PickType(
  Company,
  ['displayName', 'description'],
  InputType,
) {}

@ObjectType()
export class CreateCompanyOutput {
  id: number
  displayName: string
  description: string
}
