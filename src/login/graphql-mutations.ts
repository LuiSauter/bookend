import { gql } from '@apollo/client'

export const LOGINQL = gql`
  mutation loginUser($email: String!, $name: String!, $image: String!) {
    signin(email: $email, name: $name, image: $image) {
      id
      email
      name
      profile
      message
    }
  }
`