'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)

    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
    setCartCount(totalItems)

    const updateCartCount = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]')
      const updatedCount = updatedCart.reduce((sum: number, item: any) => sum + item.quantity, 0)
      setCartCount(updatedCount)
    }

    window.addEventListener('storage', updateCartCount)
    return () => window.removeEventListener('storage', updateCartCount)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    alert('Logged out!')
    setIsLoggedIn(false)
    router.push('/login')
  }

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link href="/" className="font-bold text-xl">
          🛒 Ruby
        </Link>
        <Link href="/products" className="hover:underline">
          Products
        </Link>
        <Link href="/cart" className="hover:underline">
          Cart ({cartCount})
        </Link>
        {isLoggedIn && (
          <>
            <Link href="/my-orders" className="hover:underline">
              My Orders
            </Link>
            <Link href="/admin-orders" className="hover:underline">
              Admin
            </Link>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
          </>
        )}
      </div>

      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className="mr-4 hover:underline">
              Login
            </Link>
            <Link href="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
