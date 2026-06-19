import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Checkout() {
  const userId = localStorage.getItem("userId");

  const [address, setAddress] = useState([]);
  const [selectAddress, setSelectAddress] = useState(null);
  const [cart, setCart] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    const loadData = async () => {
      try {
        // Load cart
        const cartRes = await api.get(`/cart/${userId}`);
        setCart(cartRes.data);

        // Load addresses
        const addressRes = await api.get(`/address/${userId}`);
        setAddress(addressRes.data);

        // Select first address automatically
        if (addressRes.data.length > 0) {
          setSelectAddress(addressRes.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, [userId, navigate]);

  const placeOrder = async () => {
    try {
      if (!selectAddress) {
        alert("Please select an address");
        return;
      }

      const res = await api.post("/order/place", {
        userId,
        address: selectAddress,
      });

      // Update cart badge
      localStorage.setItem("cartCount", 0);
      window.dispatchEvent(new Event("cartUpdated"));

      alert("Order placed successfully!");

      // Go to success page with order id
      navigate(`/order-success/${res.data.orderId}`);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to place order");
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
    (sum, item) =>
      sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white mb-8">
          Checkout
        </h1>

        {/* Address Section */}
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">
          Select Address
        </h2>

        {address.length === 0 ? (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-5 text-gray-300 mb-8">
            No address found
          </div>
        ) : (
          address.map((addr) => (
            <label
              key={addr._id}
              className="block bg-white/10 border border-white/20 rounded-2xl p-4 text-white mb-4 cursor-pointer"
            >
              <input
                type="radio"
                name="address"
                checked={selectAddress?._id === addr._id}
                onChange={() => setSelectAddress(addr)}
                className="mr-2"
              />

              <strong>{addr.fullName}</strong>

              <p className="text-sm text-gray-300 mt-1">
                {addr.addressLine}, {addr.city}, {addr.state},{" "}
                {addr.pincode}
              </p>

              <p className="text-sm text-gray-300">
                {addr.phone}
              </p>
            </label>
          ))
        )}

        {/* Order Summary */}
        <h2 className="text-2xl font-semibold text-cyan-300 mt-10 mb-4">
          Order Summary
        </h2>

        <div className="bg-white/10 border border-white/20 rounded-2xl p-5">
          {cart.items.map((item) => (
            <div
              key={item.productId?._id}
              className="flex justify-between border-b border-white/10 py-4 text-white"
            >
              <div>
                <p className="font-semibold">
                  {item.productId?.title}
                </p>

                <p className="text-sm text-gray-300">
                  Qty: {item.quantity}
                </p>
              </div>

              <div className="text-cyan-300 font-bold">
                Rs. {(item.productId?.price || 0) * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-8 text-right">
          <h2 className="text-3xl font-bold text-white">
            Total Amount:
            <span className="text-cyan-300 ml-2">
              Rs. {total}
            </span>
          </h2>
        </div>

        {/* Place Order Button */}
        <button
          onClick={placeOrder}
          className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-semibold shadow-lg hover:scale-105 transition duration-300"
        >
          Place Order (COD)
        </button>

      </div>
    </div>
  );
}