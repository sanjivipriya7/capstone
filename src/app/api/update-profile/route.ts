// app/api/update-profile/route.ts
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { sql } from '@vercel/postgres'

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const token = auth.split(' ')[1]
  let decoded: any

  try {
    decoded = jwt.verify(token, JWT_SECRET)
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  const body = await req.json()
  const { name, password } = body

  try {
    if (password) {
      const hashed = await bcrypt.hash(password, 10)
      await sql`
        UPDATE users SET name=${name}, password=${hashed} WHERE id=${decoded.id}
      `
    } else {
      await sql`
        UPDATE users SET name=${name} WHERE id=${decoded.id}
      `
    }

    return NextResponse.json({ message: 'Profile updated' })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
