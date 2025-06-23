'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OrderConfirmationPage() {
  const router = useRouter()

  useEffect(() => {
    // Just to ensure cart is cleared
    localStorage.removeItem('cart')
  }, [])

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 Order Placed!</h1>
      <p className="text-lg mb-4">Thank you for shopping with Ruby. Your order has been successfully placed.</p>
      <button
        onClick={() => router.push('/products')}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Continue Shopping
      </button>
    </div>
  )
}
