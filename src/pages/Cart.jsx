import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Cart() {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  // Load cart
  const loadCart = async () => {
    if (!userId) return;

    try {
      const res = await api.get(`/cart/${userId}`);
      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Remove item
  const removeItem = async (productId) => {
    try {
      await api.post("/cart/remove", {
        userId,
        productId,
      });

      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error);
    }
  };

  // Update quantity
  const updateQty = async (productId, quantity) => {
    if (quantity === 0) {
      removeItem(productId);
      return;
    }

    try {
      await api.post("/cart/update", {
        userId,
        productId,
        quantity,
      });

      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error);
    }
  };

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
        <h1 className="text-2xl text-white">Loading...</h1>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-white mb-8">
          Your Cart
        </h1>

        {cart.items.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center text-gray-300 text-xl">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {cart.items.map((item) => (
                <div
                  key={item.productId._id}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5"
                >
                  {/* Image + Info */}
                  <div className="flex items-center gap-5">
                    <div className="bg-white rounded-2xl p-3">
                      <img
                        src={item.productId.image}
                        alt={item.productId.title}
                        className="w-24 h-24 object-contain"
                      />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {item.productId.title}
                      </h2>

                      <p className="text-cyan-300 mt-2">
                        Rs. {item.productId.price}
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        updateQty(item.productId._id, item.quantity - 1)
                      }
                      className="w-10 h-10 rounded-xl bg-white/20 text-white hover:bg-white/30 transition"
                    >
                      -
                    </button>

                    <span className="text-xl font-bold text-white">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQty(item.productId._id, item.quantity + 1)
                      }
                      className="w-10 h-10 rounded-xl bg-white/20 text-white hover:bg-white/30 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-cyan-300 font-bold text-xl">
                    Rs. {(item.productId.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.productId._id)}
                    className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">
                  Total
                </h2>

                <span className="text-3xl font-bold text-cyan-300">
                  Rs. {total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout-address")}
                className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-lg hover:scale-[1.02] transition duration-300 shadow-lg"
              >
                Proceed To Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}