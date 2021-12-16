import { gql } from '@apollo/client'

export const xd = gql`
  mutation {
    signin(
      email: "sauters@gmail.com"
      name: "sauters"
      image: "asdaaaaaaaaaa"
    ) {
      id
      email
      name
      profile
      message
    }
  }
`