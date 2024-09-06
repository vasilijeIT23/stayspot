import { gql } from '@apollo/client'

export const GET_ALL_APARTMENTS = gql`
  query Apartments {
    apartments {
      id
      displayName
      sleepingUnits
      pricePerDay
      type
      area
      aptFloor
      aptNumber
      accomodationId
      createdAt
      updatedAt
    }
  }
`

export const GET_APARTMENT = gql`
  query Apartment($apartmentId: Float!) {
    apartment(id: $apartmentId) {
      id
      displayName
      sleepingUnits
      pricePerDay
      type
      area
      aptFloor
      aptNumber
      accomodationId
      createdAt
      updatedAt
    }
  }
`

export const PAGINATION = gql`
  query PaginationFilterApartments(
    $paginationInput: PaginationApartmentsInput!
  ) {
    paginationFilterApartments(paginationInput: $paginationInput) {
      apartments {
        id
        displayName
        sleepingUnits
        pricePerDay
        type
        area
        aptFloor
        aptNumber
        accomodationId
        createdAt
        updatedAt
      }
      totalCount
    }
  }
`

export const FILTER_ACCOMODATIONS_BY_BOOKING_DATE = gql`
  query FilterAccomodationsByDate($dateInput: FilterAccomodationsByDateInput!) {
    filterAccomodationsByDate(dateInput: $dateInput) {
      accomodationToApartments {
        accomodation {
          description
          displayName
          images
          id
          address {
            address
            lat
            lng
          }
        }
        apartmentIds
      }
    }
  }
`
