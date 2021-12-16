import { connect, connection, ConnectOptions } from 'mongoose'
import config from '../../config/config'

const environment = 'development'

const connectionString =
  environment === 'development'
    ? config.MONGO_DATABASE
    : config.MONGO_DATABASE_TEST

const conn = {
  isConnected: false,
}

export async function dbConnect() {
  const database = connectionString
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions
  if (conn.isConnected) return
  const db = await connect(database, options)
  if (db.connections[0].readyState === 1) {
    return (conn.isConnected = true)
  }
}

connection.on('connected', () => {
  console.log('Mongodb connected to db')
})

connection.on('error', (err) => {
  console.error('Mongodb connected to', err.message)
  process.exit(1)
})
