import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'
import jwt from 'jsonwebtoken'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const JWT_SECRET = 'mysecretkey' // replace with process.env.JWT_SECRET in real app

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader) return NextResponse.json({ error: 'No token' }, { status: 401 })

    const token = authHeader.split(' ')[1]
    const user = jwt.verify(token, JWT_SECRET) as { id: number }

    const result = await pool.query(
      'SELECT id, items, total, created_at FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [user.id]
    )

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
