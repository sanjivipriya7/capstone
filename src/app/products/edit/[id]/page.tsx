import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });

  if (!product) {
    return <div className="text-white p-6">❌ Product not found</div>;
  }

  return (
    <main className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">✏️ Edit Product</h1>

      <form
        action={`/api/products/edit/${product.id}`}
        method="POST"
        encType="multipart/form-data"
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          defaultValue={product.name}
          required
          className="w-full p-2 rounded text-black"
        />
        <input
          type="number"
          name="price"
          defaultValue={product.price}
          required
          className="w-full p-2 rounded text-black"
        />
        <input
          type="number"
          name="weight"
          defaultValue={product.weight}
          required
          className="w-full p-2 rounded text-black"
        />
        <textarea
          name="description"
          defaultValue={product.description || ''}
          className="w-full p-2 rounded text-black"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full p-2 rounded text-black"
        />

        <button
          type="submit"
          className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-400"
        >
          ✅ Update Product
        </button>
      </form>
    </main>
  );
}
