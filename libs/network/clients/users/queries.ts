import { gql } from '@apollo/client'

export const USER = gql`
  query GetUser($getUserInput: GetUserInput!) {
    findOne(getUserInput: $getUserInput) {
      user {
        uid
        name
        createdAt
        image
        credentials {
          email
        }
      }
    }
    #   {
    #     "uid": "9520063e-4d51-4061-bb34-d56f257e448b"
    #   }
  }
`

export const FIND_ALL = gql`
  query GetAllUsers {
    users {
      uid
      name
      createdAt
      updatedAt
    }
  }
`
