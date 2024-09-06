import { Manager } from '@prisma/client'
import { Company } from '../entities/company.entity'
import { CreateCompanyInput } from './create-company.input'
import { InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  id: Company['id']
}

@InputType()
export class AddManagerInput {
  id: Company['id']
  manager: Manager['uid']
}
