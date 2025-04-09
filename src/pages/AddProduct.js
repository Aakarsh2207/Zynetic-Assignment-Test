import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      ...form,
      id: Date.now(), // unique ID
      price: parseFloat(form.price),
      rating: parseFloat(form.rating),
    };

    // Save to localStorage for demo
    const existing = JSON.parse(localStorage.getItem("products")) || [];
    const updated = [...existing, newProduct];
    localStorage.setItem("products", JSON.stringify(updated));

    alert("Product added successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="p-6 max-w-md mx-auto hover:shadow-md">
      <h1 className="text-xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["name", "description", "category", "price", "rating"].map((field) => (
          <input key={field} name={field} value={form[field]} onChange={handleChange} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className="w-full p-2 border rounded hover:border-blue-600" required />
        ))}
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
