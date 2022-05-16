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
    description: String
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
    likes: [String]
    likesCount: Int
    createdAt: String
    author: String
  }

  type Query {
    postCount: Int!
    userCount: Int!
    findUser(email: String!): Profile
    findUserById(user: String!): Profile
    findProfile(username: String, name: String): Profile
    searchUsers(name: String!): [User]
    searchBooks(words: String!): [Post]
    searchBooksAuthor(words: String!): [Post]
    allUsers: [User]!
    allPosts(pageSize: Int!, skipValue: Int!): [Post]
    allPostRanking(pageSize: Int!, skipValue: Int!): [Post]
    allPostsByUsername(
      pageSize: Int!
      skipValue: Int!
      username: String!
    ): [Post]
    allPostUserCount(username: String!): Int!
    findPost(id: [String]): [Post]
    getColors(image: String!): String
  }

  type Mutation {
    signin(email: String!, name: String!, image: String!): String
    updateProfile(
      name: String!
      username: String!
      profile: String!
      description: String
      gender: String
      website: String
      location: String
    ): Profile
    follow(user: String!, email: String!): String
    unFollow(user: String!, email: String!): String
    addPost(
      image: String
      title: String
      description: [String]!
      bookUrl: String!
      tags: [String]
      email: String!
      author: String
    ): String
    likePost(id: String!, email: String!): String
    disLikePost(id: String!, email: String!): String
    deletePost(id: String!, user: String!): String
    deleteUser(user: String!): String
    giveVerification(
      user: String!
      verification: Boolean
      wordSecret: String!
    ): String
  }
`

export default typeDefinitions
