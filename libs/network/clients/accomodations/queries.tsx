import { gql } from '@apollo/client'

export const GET_ALL_ACCOMODATIONS = gql`
  query Accomodations {
    accomodations {
      displayName
      description
      images
    }
  }
`

export const GET_ACCOMODATION = gql`
  query Accomodation($accomodationId: Float!) {
    accomodation(id: $accomodationId) {
      description
      displayName
      images
      companyId
      address {
        address
        lat
        lng
      }
    }
  }
`

export const PAGINATION = gql`
  query PaginationFilter($paginationInput: PaginationInput!) {
    paginationFilter(paginationInput: $paginationInput) {
      accomodations {
        displayName
        description
        images
        id
        address {
          lat
          lng
        }
      }
      totalCount
    }
  }
`
