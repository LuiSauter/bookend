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
    post: [String]
  }
  type Comment {
    text: String!
    user: User!
    id: String!
  }
  type Post {
    title: String!
    description: [String]
    image: String
    bookUrl: String!
    user: String!
    comments: [String]
    tags: [String]
    id: String!
  }

  type Query {
    userCount: Int!
    findUser(email: String!): Profile
    findProfile(username: String!): Profile!
    allUsers: [User]!
    allPosts: [Post]
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
    addPost(
      image: String
      title: String
      description: [String]!
      bookUrl: String!
      tags: [String]
      email: String!
    ): Post
    deletePost(id: String!, user: String!): String
    deleteUser(user: String!): String
  }
`

export default typeDefinitions
