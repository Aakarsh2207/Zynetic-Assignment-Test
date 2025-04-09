import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    rating: "",
  });

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find((p) => p.id === parseInt(id));
    if (product) {
      setForm(product);
    } else {
      alert("Product not found");
      navigate("/dashboard");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...form,
      price: parseFloat(form.price),
      rating: parseFloat(form.rating),
    };

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = products.map((p) => (p.id === parseInt(id) ? updatedProduct : p));

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    alert("Product updated successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="p-6 max-w-md mx-auto hover:shadow-md">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["name", "description", "category", "price", "rating"].map((field) => (
          <input key={field} name={field} value={form[field]} onChange={handleChange} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className="w-full p-2 border rounded hover:border-blue-600" required />
        ))}
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
