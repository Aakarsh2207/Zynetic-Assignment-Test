import React, { useState } from "react";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    rating: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Product:", form);
    // TODO: call backend API to save product
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit}>
        {["name", "description", "category", "price", "rating"].map((field) => (
          <input key={field} name={field} value={form[field]} onChange={handleChange} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className="w-full mb-3 p-2 border rounded" required />
        ))}
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
