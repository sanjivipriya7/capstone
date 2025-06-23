import jwt from 'jsonwebtoken'

const JWT_SECRET = 'your_secret_key' // same as in route.ts

export function getUserFromToken(token: string) {
  try {
    const user = jwt.verify(token, JWT_SECRET)
    return user
  } catch (err) {
    return null
  }
}
