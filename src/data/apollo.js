import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const isServer = typeof window === 'undefined'
const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState

let CLIENT

export function getApolloClient(forceNew) {
  if (!CLIENT || forceNew) {
    CLIENT = new ApolloClient({
      ssrMode: isServer,
      connectToDevTools: true,
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              allPostRanking: {
                keyArgs: [],
                merge(existing, incoming, { args: { skipValue = 0 } }) {
                  const merged = existing ? existing.slice(0) : []
                  for (let i = 0; i < incoming.length; ++i) {
                    merged[skipValue + i] = incoming[i]
                  }
                  return merged
                },
              },
              allPosts: {
                keyArgs: [],
                merge(existing, incoming, { args: { skipValue = 0 } }) {
                  const merged = existing ? existing.slice(0) : []
                  for (let i = 0; i < incoming.length; ++i) {
                    merged[skipValue + i] = incoming[i]
                  }
                  return merged
                },
              },
              allPostsByUsername: {
                read(existing, { args: { skipValue, pageSize } }) {
                  return (
                    existing && existing.slice(skipValue, skipValue + pageSize)
                  )
                },
              },
            },
          },
        },
      }).restore(windowApolloState || {}),
      link: new HttpLink({
        uri: '/api/graphql',
      }),
    })
  }
  return CLIENT
}
