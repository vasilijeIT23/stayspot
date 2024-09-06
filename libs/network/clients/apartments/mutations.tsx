import { gql } from '@apollo/client'

export const CREATE_APARTMENT = gql`
  mutation CreateApartment($createApartmentInput: CreateApartmentInput!) {
    createApartment(createApartmentInput: $createApartmentInput) {
      accomodationId
    }
  }
`

export const UPDATE_APARTMENT = gql`
  mutation UpdateApartment($updateApartmentInput: UpdateApartmentInput!) {
    updateApartment(updateApartmentInput: $updateApartmentInput) {
      id
      displayName
      pricePerDay
      area
      sleepingUnits
      aptFloor
      aptNumber
      accomodationId
      type
    }
  }
`

export const DELETE_APARTMENT = gql`
  mutation RemoveApartment($removeApartmentId: Float!) {
    removeApartment(id: $removeApartmentId) {
      id
    }
  }
`
