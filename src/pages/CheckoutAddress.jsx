import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function CheckoutAddress() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = async (e) => {
    e.preventDefault();

    try {
      await api.post("/address/add", {
        ...form,
        userId,
      });

      navigate("/checkout");
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-8">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-white mb-8">
          Delivery Address
        </h1>

        <form onSubmit={saveAddress} className="space-y-5">

          <input
            type="text"
            name="fullName"
            value={form.fullName}
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="text"
            name="phone"
            value={form.phone}
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="text"
            name="addressLine"
            value={form.addressLine}
            placeholder="Address"
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="text"
            name="city"
            value={form.city}
            placeholder="City"
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="text"
            name="state"
            value={form.state}
            placeholder="State"
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="text"
            name="pincode"
            value={form.pincode}
            placeholder="Pincode"
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition duration-300"
          >
            Save Address
          </button>

        </form>
      </div>
    </div>
  );
}