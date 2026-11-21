import type { NextApiRequest, NextApiResponse } from 'next'

// For Coolify's health check and the uptime monitor (see olympus DEPLOY.md).
export default function health(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'no-store')
  res.status(200).json({ ok: true })
}
