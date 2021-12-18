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
  query findUserByProfileId($profile: String!) {
    findUser(profile: $profile) {
      followers
      following
      verified
      id
      description
      location
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