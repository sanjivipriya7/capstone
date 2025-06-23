'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCart, CartItem } from '@/lib/cart'

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const router = useRouter()

  useEffect(() => {
    setCart(getCart())
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, address, phone, cart }),
    })

    if (res.ok) {
      alert('Order placed successfully!')
      localStorage.removeItem('cart')
      router.push('/')
    } else {
      alert('Something went wrong.')
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          className="border p-2 w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          className="border p-2 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Place Order
        </button>
      </form>
    </div>
  )
}
