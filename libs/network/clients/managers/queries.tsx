import { gql } from '@apollo/client'

export const MANAGER = gql`
  query GetManager($uid: String!) {
    manager(uid: $uid) {
      displayName
      companyId
    }
  }
`
