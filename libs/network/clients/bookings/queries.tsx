import { gql } from '@apollo/client'

export const GET_BOOKINGS = gql`
  query Query($uid: String!) {
    findByUser(uid: $uid) {
      startDate
      endDate
      totalPrice
    }
  }
`

export const GET_BY_COMPANY = gql`
  query FindBookingsByCompany($uid: String!) {
    findBookingsByCompany(uid: $uid) {
      startDate
      endDate
      totalPrice
      apartmentId
    }
  }
`
