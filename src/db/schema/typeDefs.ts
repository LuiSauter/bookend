import { gql } from 'apollo-server'

const typeDefinitions = gql`
  type User {
    username: String!
    name: String!
    photo: String
    id: String!
  }
  type Profile {
    verified: String
    user: User!
    accountType: String
    description: String
    gender: String
    website: String
    location: String
    followers: [String]
    following: [String]
    liked: [String]
  }
  type Post {

  }
`