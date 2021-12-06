import { NextApiRequest, NextApiResponse } from 'next'
import { conn } from '../../../utils/database'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {method, query} = req
  switch (method) {
  case 'GET': {
    const text = 'SELECT * FROM tasks WHERE id = $1'
    const values = [query.id]
    const result = await conn.query(text, values)
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Task not found' })
    }
    return res.json(result.rows[0])
  }
  case 'PUT':
    return res.json('updating a unique task')
  case 'DELETE':
    return res.json('deleting a unique task')
  default:
    return res.status(400).json('method not allowed')
  }
}