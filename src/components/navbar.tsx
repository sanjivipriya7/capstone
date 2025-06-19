'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-6 shadow-lg">
      <Link href="/" className="text-xl font-bold hover:text-blue-400">🏠 Home</Link>
      <Link href="/products" className="hover:text-blue-400">🛍️ All Products</Link>
      <Link href="/products/new" className="hover:text-blue-400">➕ Add Product</Link>
    </nav>
  );
}
