import { PageConfig } from 'next'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServer } from 'apollo-server-micro'
import { dbConnect } from '../../db/utils/mongoose'
import Cors from 'micro-cors'
import typeDefinitions from 'src/db/typeDefs'
import resolvers from 'src/db/resolvers'
import enviroment from 'src/config/config'

dbConnect()

export const schema = makeExecutableSchema({
  typeDefs: typeDefinitions,
  resolvers,
})

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}

const cors = Cors()

export const apolloServer = new ApolloServer({
  schema,
  // context: async ({ req }) => {
  //   const auth = req ? req.headers.authorization : null
  //   if (auth && auth.toLowerCase().startsWith('Bearer ')) {
  //     const token = auth.substring(7)
  //     const { id } = jwt.verify(token, vars.jwtSecret)
  //     const currentUser = await User.findById(id).populate('')
  //     return { currentUser }
  //   }
  // },
})

const startServer = apolloServer.start()

export default cors(async (req, res) => {
  // const uriPermision = [enviroment.originURI_1, enviroment.originURI_2]
  // const isMatch = uriPermision.some((uri) => uri === req.headers.origin)
  // if (!isMatch) {
  //   res.end()
  //   return false
  // }
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer
  await apolloServer.createHandler({ path: enviroment.pathUri })(req, res)
})
