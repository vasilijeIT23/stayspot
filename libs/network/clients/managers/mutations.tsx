import { gql } from '@apollo/client'

export const CREATE_MANAGER = gql`
  mutation CreateManager($createManagerInput: CreateManagerInput!) {
    createManager(createManagerInput: $createManagerInput) {
      uid
      displayName
      companyId
    }
  }
`
