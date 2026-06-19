import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    try {
      const res = await api.get(
        `/products?search=${search}&category=${category}`
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first.");
        return;
      }

      await api.post("/cart/add", {
        userId,
        productId,
      });

      window.dispatchEvent(new Event("cartUpdated"));

      alert("Product added to cart!");
    } catch (error) {
      console.log(error);
      alert("Failed to add product to cart.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-8">
      {/* Search + Category */}
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">

          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-2/3 px-5 py-3 rounded-2xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-60 px-4 py-3 rounded-2xl bg-white/20 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="" className="text-black">
              All Categories
            </option>

            <option value="Laptops" className="text-black">
              Laptops
            </option>

            <option value="Mobile Phones" className="text-black">
              Mobile Phones
            </option>

            <option value="Electronics" className="text-black">
              Electronics
            </option>

            <option value="Tablets" className="text-black">
              Tablets
            </option>
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-6xl mx-auto mt-10">
        {products.length === 0 ? (
          <h2 className="text-center text-gray-300 text-xl">
            No Products Found
          </h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 shadow-lg hover:scale-105 transition duration-300"
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-contain bg-white rounded-2xl"
                  />

                  <h2 className="mt-3 text-white font-semibold text-lg">
                    {product.title}
                  </h2>

                  <p className="text-cyan-300 font-bold text-lg">
                    Rs. {product.price}
                  </p>
                </Link>

                <button
                  onClick={() => addToCart(product._id)}
                  className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-xl"
                >
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}