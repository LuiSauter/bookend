import { NextApiRequest, NextApiResponse } from 'next'
import { conn } from 'src/utils/database'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  switch (method) {
  case 'GET':
    try {
      const query = 'SELECT * FROM books'
      const response = await conn.query(query)
      // throw new Error('something goes wrong')
      return res.status(200).json(response.rows)
    } catch (error: any) {
      return res.status(400).json({error: error.message})
    }
  case 'POST':
    try {
      const { title, description, book } = body
      const query =
        'INSERT INTO books(title, description, book) VALUES($1, $2, $3) RETURNING *'
      const values = [title, description, book]
      const response = await conn.query(query, values)
      return res.status(200).json(response.rows[0])
    } catch (error: any) {
      return res.status(400).json({error: error.message})
    }
  case 'PUT':
    return res.status(200).json('books PUT')
  default:
    return res.status(400).json('invalid method')
  }
}