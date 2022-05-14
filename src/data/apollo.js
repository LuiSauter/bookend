import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const isServer = typeof document === 'undefined'
const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState

let CLIENT

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
}

function myFetchImplementation(url, options) {
  options = options || {}
  const { operationName } = JSON.parse(options.body)
  return fetch(`${url}?opname=${operationName}`, options)
}

export function getApolloClient(forceNew) {
  if (!CLIENT || forceNew) {
    CLIENT = new ApolloClient({
      ssrMode: isServer,
      connectToDevTools: false,
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
        fetch: myFetchImplementation,
      }),
      defaultOptions: defaultOptions,
    })
  }
  return CLIENT
}
