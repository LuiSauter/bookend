import { NextApiRequest, NextApiResponse } from 'next'
import { conn } from 'src/utils/database'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {method, query, body} = req
  switch (method) {
  case 'GET':
    try {
      const text = 'SELECT * FROM books WHERE id = $1'
      const values = [query.id]
      const result = await conn.query(text, values)
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'book not found' })
      }
      return res.json(result.rows[0])
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  case 'PUT':
    try {
      const {title, description, book} = body
      const text = 'UPDATE books SET title = $1, description = $2, book = $3 WHERE id = $4 RETURNING *'
      const values = [title, description, book, query.id]
      const result = await conn.query(text, values)

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'book not found' })
      }
      return res.json(result.rows[0])
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  case 'DELETE':
    try {
      const text = 'DELETE FROM books WHERE id = $1 RETURNING *'
      const values = [query.id]
      const result = await conn.query(text, values)

      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'book not found' })
      }
      return res.json(result.rows[0])
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  default:
    return res.status(400).json('method not allowed')
  }
}