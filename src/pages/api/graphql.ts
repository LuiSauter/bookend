import { NextApiRequest, NextApiResponse, PageConfig } from 'next'
import { dbConnect } from '../../db/utils/mongoose'
import { ApolloServer } from 'apollo-server-micro'
import { makeExecutableSchema } from '@graphql-tools/schema'
import Cors from 'micro-cors'
import typeDefinitions from 'src/db/typeDefs'
import resolvers from 'src/db/resolvers'

dbConnect()

export const schema = makeExecutableSchema({
  typeDefs: typeDefinitions,
  resolvers: resolvers,
})

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}

const cors = Cors()

export const apolloServer = new ApolloServer({ schema })

const startServer = apolloServer.start()

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res)
})
