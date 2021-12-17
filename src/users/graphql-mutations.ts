import { gql } from '@apollo/client'

export const CREATE_PROFILE = gql`
  mutation createProfileByUser(
    $username: String!
    $profile: String!
    $description: String
    $gender: String
    $website: String
    $location: String
  ) {
    createProfile(
      username: $username
      profile: $profile
      description: $description
      gender: $gender
      website: $website
      location: $location
    ) {
      description
      followers
      following
      liked
      gender
      id
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