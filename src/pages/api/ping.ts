import { dbConnect, runMiddleware } from '../../db/utils'
import { NextApiRequest, NextApiResponse } from 'next'
import Morgan from 'morgan'

dbConnect()

// define the morgan middelware
const morgan = Morgan('dev')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // run morgan before the return response
  await runMiddleware(req, res, morgan)

  // return response to the client
  return res.json({ msg: 'Pong!' })
}
