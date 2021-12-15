import { gql } from 'apollo-server-micro'

const typeDefinitions = gql`
  type Signin {
    name: String
    email: String
    _id: String
    message: String
  }
  type User {
    username: String!
    name: String!
    photo: String
    id: String!
  }
  type Profile {
    verified: Boolean
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
  type Comment {
    text: String!
    user: User!
    id: String!
  }
  type Post {
    description: String!
    image: String
    user: User!
    comments: [Comment]!
    id: String!
  }

  type Query {
    userCount: Int!
    findUser(username: String!): Profile
    allPosts: [Post]!
    findPost(id: String!): Post
  }

  type Mutation {
    signin(email: String!, name: String!): Signin!
    addProfile(
      user: String!
      username: String!
      name: String!
      photo: String
      description: String
      gender: String
      website: String
      location: String
      followers: [String]
      following: [String]
      liked: [String]
    ): Profile!
    addPost(description: String!, image: String, user: String!): Post!
  }
`

export default typeDefinitions
