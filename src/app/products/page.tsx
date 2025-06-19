import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ProductListPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const category = searchParams.category || "";
  const q = searchParams.q?.toLowerCase() || "";

  const products = await prisma.product.findMany({
    where: {
      AND: [
        category ? { category } : {},
        q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  const categories = ["Necklace", "Ring", "Coin", "Anklet"];

  return (
    <main className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🛒 Silver Products</h1>

      {/* 🔍 Search and Filter */}
      <form className="flex gap-4 mb-6" method="GET">
        <select
          name="category"
          defaultValue={category}
          className="bg-gray-800 border border-gray-600 p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="q"
          placeholder="Search products..."
          defaultValue={q}
          className="bg-gray-800 border border-gray-600 p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
        >
          Search
        </button>
      </form>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-700 p-4 rounded-lg bg-gray-900 shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">
                <a
                  href={`/products/${product.id}`}
                  className="hover:underline text-blue-400"
                >
                  {product.name}
                </a>
              </h2>

              <p className="text-sm mb-1">
                💸 <strong>Price:</strong> ₹{product.price}
              </p>
              <p className="text-sm mb-1">
                ⚖️ <strong>Weight:</strong> {product.weight}g
              </p>
              <p className="text-sm mb-1">
                🏷️ <strong>Category:</strong> {product.category}
              </p>
              <p className="text-sm mb-2">
                📝 <strong>Description:</strong> {product.description}
              </p>

              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}

              {/* Edit & Delete */}
              <div className="flex justify-between mt-4">
                <a
                  href={`/products/edit/${product.id}`}
                  className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400"
                >
                  ✏️ Edit
                </a>
                <form action={`/api/products/${product.id}`} method="POST">
                  <input type="hidden" name="_method" value="DELETE" />
                  <button
                    type="submit"
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
                  >
                    🗑️ Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
