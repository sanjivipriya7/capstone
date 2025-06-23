'use client'

import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    const decoded = JSON.parse(atob(token.split('.')[1]))
    setUser(decoded)
    setName(decoded.name)
  }, [])

  const handleUpdate = async (e: any) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    if (!token) return

    const res = await fetch('/api/update-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, password }),
    })

    const data = await res.json()
    if (res.ok) {
      setMessage('Profile updated successfully!')
    } else {
      setMessage(data.error || 'Update failed')
    }
  }

  if (!user) return <p className="p-4">Not logged in.</p>

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password (optional)"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Update Profile
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-blue-700">{message}</p>}
    </div>
  )
}
