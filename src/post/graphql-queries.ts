import { gql } from '@apollo/client'

export const ALL_POSTS = gql`
  query {
    allPosts {
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
