'use client'

import { useEffect, useState } from 'react'

export default function ProductsPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const handleAddToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')

    // Check if already in cart
    const existingItem = cart.find((item: any) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Product added to cart!')
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 font-bold">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product: any) => (
          <div key={product.id} className="border p-4 rounded shadow">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="mb-2 w-full h-48 object-cover rounded"
              />
            )}
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-sm text-gray-700">{product.description}</p>
            <p className="font-semibold mt-1">₹{product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
