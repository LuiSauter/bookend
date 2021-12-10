import { gql } from 'apollo-server-micro'

const typeDefinitions = gql`
  type Token {
    token: String!
  }
  type Signup {
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
    signup(email: String!, password: String!, confirm_password: String!): Signup
    signin(email: String!, password: String!): Token
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
