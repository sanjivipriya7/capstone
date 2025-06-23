'use client'

import { useEffect, useState } from 'react'
import { getCart, saveCart } from '@/lib/cart'

export default function CartPage() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(getCart())
  }, [])

  const handleIncrease = (id: number) => {
    const updatedCart = cart.map((item: any) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    setCart(updatedCart)
    saveCart(updatedCart)
  }

  const handleDecrease = (id: number) => {
    const updatedCart = cart
      .map((item: any) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item: any) => item.quantity > 0)

    setCart(updatedCart)
    saveCart(updatedCart)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item: any) => (
          <div key={item.id} className="border-b py-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p>₹{item.price} x {item.quantity}</p>
              <p className="text-sm font-medium mt-1">Total: ₹{item.price * item.quantity}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="bg-gray-300 px-2 rounded"
                onClick={() => handleDecrease(item.id)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="bg-gray-300 px-2 rounded"
                onClick={() => handleIncrease(item.id)}
              >
                +
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
  