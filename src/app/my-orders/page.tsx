'use client'

import { useEffect, useState } from 'react'

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    fetch('/api/my-orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setOrders(data))
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order: any) => (
          <div key={order.id} className="border p-4 rounded mb-4">
            <p className="text-sm text-gray-600">Order ID: {order.id}</p>
            <p className="text-sm text-gray-600">Placed on: {new Date(order.created_at).toLocaleString()}</p>
            <p className="font-semibold mt-2">Total: ₹{order.total}</p>
            <div className="mt-2 text-sm">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="ml-2">
                  - {item.name} (x{item.quantity}) - ₹{item.price}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
