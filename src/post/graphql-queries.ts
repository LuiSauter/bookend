import { gql } from '@apollo/client'

export const ALL_POSTS = gql`
  query allPostsByPagination($pageSize: Int!, $skipValue: Int!) {
    allPosts(pageSize: $pageSize, skipValue: $skipValue) {
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

export const POSTS_COUNT = gql`
  query {
    postCount
  }
`

export const FINDONE_POST = gql`
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
