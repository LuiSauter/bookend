import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import config from '../config/config'

export function GraphqlApolloCLient () {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: config.originURI_2 + config.pathUri,
    }),
    cache: new InMemoryCache(),
  })
  return client
}