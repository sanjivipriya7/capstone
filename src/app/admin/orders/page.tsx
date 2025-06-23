import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📦 All Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="mb-6 border p-4 rounded bg-gray-800">
            <p><strong>🧑 Name:</strong> {order.name}</p>
            <p><strong>📍 Address:</strong> {order.address}</p>
            <p><strong>📞 Phone:</strong> {order.phone}</p>
            <p><strong>🕒 Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <div className="mt-2 ml-4">
              <h2 className="font-semibold">🛍️ Items:</h2>
              <ul className="list-disc list-inside">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} — ₹{item.price} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
