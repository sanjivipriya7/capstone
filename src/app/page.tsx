// app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Ruby Shop</h1>
      <p className="mb-4">Click below to view or add silver items.</p>

      <div className="space-x-4">
        <Link href="/products">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            View Products
          </button>
        </Link>

        <Link href="/products/new">
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </Link>
      </div>
    </div>
  );
}
