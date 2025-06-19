import { useState } from "react";
import axios from "axios";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/products/create", {
      ...formData,
      price: parseInt(formData.price),
    });
    alert("Product added successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <input name="name" placeholder="Product Name" onChange={handleChange} /><br />
      <textarea name="description" placeholder="Description" onChange={handleChange} /><br />
      <input name="price" placeholder="Price" type="number" onChange={handleChange} /><br />
      <input name="image" placeholder="Image URL" onChange={handleChange} /><br />
      <button type="submit">Add Product</button>
    </form>
  );
}
