'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    const payload = JSON.parse(atob(token.split('.')[1]))
    if (payload.email !== 'admin@ruby.com') {
      alert('Access denied')
      router.push('/')
      return
    }

    setIsAdmin(true)

    fetch('/api/admin-orders', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setOrders(data))
  }, [])

  if (!isAdmin) return null

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin: All Orders</h1>
      {orders.map((order: any) => (
        <div key={order.id} className="border p-4 rounded mb-4">
          <p className="text-sm text-gray-600">Order ID: {order.id}</p>
          <p className="text-sm text-gray-600">User ID: {order.user_id}</p>
          <p className="text-sm text-gray-600">Placed on: {new Date(order.created_at).toLocaleString()}</p>
          <p className="font-semibold mt-2">Total: ₹{order.total}</p>
          <div className="mt-2 text-sm">
            {order.items.map((item: any, idx: number) => (
              <div key={idx}>
                - {item.name} (x{item.quantity}) - ₹{item.price}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
