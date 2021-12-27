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
    ) {
      id
    }
  }
`