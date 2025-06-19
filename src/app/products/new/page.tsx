'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    weight: '',
    description: '',
    category: 'Necklace',
    image: null as File | null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const body = new FormData();
    for (const key in formData) {
      const value = formData[key as keyof typeof formData];
      if (value) {
        body.append(key, value);
      }
    }

    await fetch('/api/products/new', {
      method: 'POST',
      body,
    });

    window.location.href = '/products';
  };

  return (
    <main className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-4">➕ Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />
        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          required
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (grams)"
          required
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />
        <textarea
          name="description"
          placeholder="Description"
          required
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />

        {/* 🆕 Category Dropdown */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        >
          <option value="Necklace">Necklace</option>
          <option value="Ring">Ring</option>
          <option value="Coin">Coin</option>
          <option value="Anklet">Anklet</option>
        </select>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />

        <button
          type="submit"
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
        >
          Create Product
        </button>
      </form>
    </main>
  );
}
