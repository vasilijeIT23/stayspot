import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
  mutation RegisterUser($registerUserInput: RegisterUserInput!) {
    register(registerUserInput: $registerUserInput) {
      uid
      name
      image
    }
    #   query example:
    # {
    #   "registerUserInput": {
    #     "email": "example@example2.com",
    #     "name": "John Doe",
    #     "password": "password",
    #     "image": "https://example.com/avatar.png"
    #   }
    # }
  }
`

export const LOGIN_USER = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      user {
        uid
        name
        customer {
          uid
        }
        manager {
          uid
        }
        admin {
          uid
        }
      }
    }

    #   example query:
    #   {
    #     "loginInput": {
    #         "email": "example@example2.com",
    #         "password": "password"
    #     }
    #   }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      name
    }
    #    query example:
    #    {
    #     "updateUserInput": {
    #         "uid": "9520063e-4d51-4061-bb34-d56f257e448b",
    #         "name": "Cork"
    #     }
    #   }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($uid: String!) {
    removeUser(uid: $uid) {
      uid
    }
    #   query example:
    #   {
    #     "uid": "5a676a3e-fc61-43c5-98b8-433fcaf35e72"
    #   }
  }
`

export const CHANGE_EMAIL = gql`
  mutation ChangeEmail($changeEmailInput: ChangeEmailInput!) {
    changeEmail(changeEmailInput: $changeEmailInput)
  }
`

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($changePasswordInput: ChangePasswordInput!) {
    changePassword(changePasswordInput: $changePasswordInput)
  }
`
