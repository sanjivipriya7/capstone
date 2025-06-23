import { PrismaClient } from '@prisma/client'
import { addToCart } from '@/lib/cart'

const prisma = new PrismaClient()

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  })

  if (!product) {
    return <main className="p-6 text-white bg-black min-h-screen">❌ Product not found</main>
  }

  return (
    <main className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <p className="text-lg mb-2">💸 <strong>Price:</strong> ₹{product.price}</p>
      <p className="text-lg mb-2">⚖️ <strong>Weight:</strong> {product.weight}g</p>
      <p className="text-lg">📝 <strong>Description:</strong> {product.description}</p>

      {/* ✅ Add to Cart Button */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        onClick={() => {
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          })
          alert('Added to cart!')
        }}
      >
        Add to Cart
      </button>
    </main>
  )
}
