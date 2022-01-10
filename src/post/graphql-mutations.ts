import { gql } from '@apollo/client'

export const ADD_POST = gql`
  mutation addPostBook(
    $title: String
    $description: [String]!
    $email: String!
    $bookUrl: String!
    $image: String
    $tags: [String]
  ) {
    addPost(
      title: $title
      description: $description
      email: $email
      bookUrl: $bookUrl
      image: $image
      tags: $tags
    )
  }
`

export const FIND_POST_BY_ID = gql`
  query findPostById($id: String!) {
    findPost(id: $id) {
      bookUrl
      comments
      description
      id
      image
      tags
      title
      user
    }
  }
`

export const LIKE_POST = gql`
  mutation likePost($id: String!, $email: String!) {
    likePost(id: $id, email: $email)
  }
`