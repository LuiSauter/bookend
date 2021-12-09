import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  switch (method) {
  case 'GET':
    try {
      return res.status(200).json({})
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  case 'POST':
    try {
      return res.status(200).json({})
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  case 'PUT':
    return res.status(200).json('books PUT')
  default:
    return res.status(400).json('invalid method')
  }
}