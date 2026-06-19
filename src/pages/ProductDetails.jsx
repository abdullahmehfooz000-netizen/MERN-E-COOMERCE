import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const loadProduct = async () => {
    try {
      const res = await api.get("/products");
      const p = res.data.find((item) => item._id === id);
      setProduct(p);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-8">

        {/* Product Image */}
        <div className="bg-white rounded-3xl p-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="mt-8">
          <h1 className="text-4xl font-bold text-white">
            {product.title}
          </h1>

          <p className="text-gray-300 mt-4 leading-7">
            {product.description}
          </p>

          <p className="text-3xl font-bold text-cyan-300 mt-6">
            Rs. {product.price}
          </p>

          <button className="mt-8 px-8 py-3 rounded-2xl bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition duration-300 shadow-lg">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}