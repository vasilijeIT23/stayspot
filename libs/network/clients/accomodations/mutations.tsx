import { gql } from '@apollo/client'

export const CREATE_ACCOMODATION = gql`
  mutation CreateAccomodationWithAddress(
    $createAccomodationWithAddressInput: CreateAccomodationWithAddressInput!
  ) {
    createAccomodationWithAddress(
      createAccomodationWithAddressInput: $createAccomodationWithAddressInput
    ) {
      accomodation {
        createdAt
        displayName
        description
        images
      }
      address {
        address
        lat
        lng
      }
    }
  }
`

export const UPDATE_ACCOMODATION = gql`
  mutation UpdateAccomodation(
    $updateAccomodationInput: UpdateAccomodationInput!
  ) {
    updateAccomodation(updateAccomodationInput: $updateAccomodationInput) {
      id
    }
  }
`

export const DELETE_ACCOMODATION = gql`
  mutation RemoveAccomodation($removeAccomodationId: Float!) {
    removeAccomodation(id: $removeAccomodationId) {
      id
    }
  }
`
