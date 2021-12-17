import { gql } from '@apollo/client'

export const FIND_PROFILE = gql`
  query findProfileByUsername($username: String!) {
    findProfile(username: $username) {
      description
      followers
      following
      gender
      id
      liked
      location
      verified
      website
      me {
        name
        photo
        user
        username
      }
    }
  }
`

export const FIND_USER = gql`
  query findUserByUsername($username: String!) {
    findUser(username: $username) {
      me {
        name
        photo
        user
        username
      }
    }
  }
`