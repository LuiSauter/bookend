import { gql } from '@apollo/client'

export const UPDATE_PROFILE = gql`
  mutation updateProfileByUser(
    $name: String!
    $username: String!
    $profile: String!
    $description: String
    $gender: String
    $website: String
    $location: String
  ) {
    updateProfile(
      name: $name
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