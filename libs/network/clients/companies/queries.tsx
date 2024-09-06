import { gql } from '@apollo/client'

export const COMPANY = gql`
  query GetCompany($companyId: Float!) {
    company(id: $companyId) {
      id
      createdAt
      displayName
      description
    }
  }
`
