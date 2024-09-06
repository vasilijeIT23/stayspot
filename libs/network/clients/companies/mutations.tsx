import { gql } from '@apollo/client'

export const CREATE_COMPANY = gql`
  mutation CreateCompany($createCompanyInput: CreateCompanyInput!) {
    createCompany(createCompanyInput: $createCompanyInput) {
      id
      displayName
      description
    }
  }
`
