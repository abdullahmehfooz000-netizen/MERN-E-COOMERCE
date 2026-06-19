import { useEffect, useState } from "react";
import api from "../src/api/axios";
import { Link } from "react-router";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  // Load products
  const loadProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/delete/${id}`);
      alert("Product deleted successfully!");
      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product List</h1>

        <Link
          to="/admin/products/add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </Link>
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3">Title</th>
            <th className="border p-3">Price</th>
            <th className="border p-3">Stock</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td className="border p-3">{product.title}</td>

                <td className="border p-3">
                  Rs. {product.price}
                </td>

                <td className="border p-3">
                  {product.stock}
                </td>

                <td className="border p-3 space-x-4">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="text-blue-500"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-5">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}