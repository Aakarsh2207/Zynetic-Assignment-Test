import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialProducts = [
  {
    id: 1,
    name: "Laptop",
    description: "Portable computer",
    category: "Electronics",
    price: 799,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Book",
    description: "Educational book",
    category: "Stationery",
    price: 20,
    rating: 4.0,
  },
  {
    id: 3,
    name: "Headphones",
    description: "Noise cancelling",
    category: "Electronics",
    price: 199,
    rating: 4.7,
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts && storedProducts.length > 0) {
      setProducts(storedProducts);
    } else {
      setProducts(initialProducts);
      localStorage.setItem("products", JSON.stringify(initialProducts));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const filteredProducts = products
    .filter((product) => {
      const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = categoryFilter ? product.category === categoryFilter : true;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.rating - b.rating;
      if (sortOrder === "desc") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Dashboard</h1>
        <div className="flex gap-2">
          <button onClick={() => navigate("/add-product")} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            + Add Product
          </button>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <input type="text" placeholder="Search by name or description" className="border px-3 py-2 rounded w-full md:w-1/3" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select className="border px-3 py-2 rounded w-full md:w-1/4" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">Filter by category</option>
          <option value="Electronics">Electronics</option>
          <option value="Stationery">Stationery</option>
        </select>
        <select className="border px-3 py-2 rounded w-full md:w-1/4" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort by rating</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <table className="w-full table-auto border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Rating</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">Rs. {product.price}</td>
                <td className="border px-4 py-2">{product.rating}</td>
                <td className="border px-4 py-2">
                  <button className="text-blue-500 mr-2 hover:underline" onClick={() => navigate(`/edit-product/${product.id}`)}>
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline" onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2 text-center" colSpan="5">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
