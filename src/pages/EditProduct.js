import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams(); // product ID from URL
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    rating: "",
  });

  useEffect(() => {
    // TODO: Fetch product details from backend using id
    // Temporary mock data:
    const product = {
      name: "Sample Product",
      description: "Sample Desc",
      category: "Sample Category",
      price: "100",
      rating: "4.5",
    };
    setForm(product);
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Product:", form);
    // TODO: call backend API to update product
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        {["name", "description", "category", "price", "rating"].map((field) => (
          <input key={field} name={field} value={form[field]} onChange={handleChange} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className="w-full mb-3 p-2 border rounded" required />
        ))}
        <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
