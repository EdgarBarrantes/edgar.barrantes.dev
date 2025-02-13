import type { NextApiRequest, NextApiResponse } from 'next'
import { getPaginatedContent } from '../../utils/data'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = Number(req.query.page) || 1
  const data = await getPaginatedContent('thoughts', page)
  res.status(200).json(data)
} 