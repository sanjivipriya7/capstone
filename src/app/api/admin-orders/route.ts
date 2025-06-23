import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'
import jwt from 'jsonwebtoken'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const JWT_SECRET = 'mysecretkey'

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader) return NextResponse.json({ error: 'No token' }, { status: 401 })

    const token = authHeader.split(' ')[1]
    const user = jwt.verify(token, JWT_SECRET) as { email: string }

    if (user.email !== 'admin@ruby.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC')
    return NextResponse.json(result.rows)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
