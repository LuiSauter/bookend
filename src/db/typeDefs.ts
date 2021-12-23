import { gql } from 'apollo-server-micro'

const typeDefinitions = gql`
  type Signin {
    name: String!
    email: String!
    id: String!
    profile: String
    message: String
  }
  type User {
    username: String!
    name: String!
    photo: String
    user: String!
    email: String!
    verified: Boolean!
  }
  type Profile {
    verified: Boolean
    id: String!
    me: User!
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
    findUser(email: String!): Profile
    findProfile(username: String!): Profile!
    allUsers: [User]!
    allPosts: [Post]!
    findPost(id: String!): Post
  }

  type Mutation {
    signin(email: String!, name: String!, image: String!): Signin
    updateProfile(
      name: String!
      username: String!
      profile: String!
      description: String
      gender: String
      website: String
      location: String
    ): Profile
    follow(user: String!, email: String!): Profile
    unFollow(user: String!, email: String!): Profile
    addPost(description: String!, image: String, user: String!): Post!
    deleteUser(user: String!): String
  }
`

export default typeDefinitions
