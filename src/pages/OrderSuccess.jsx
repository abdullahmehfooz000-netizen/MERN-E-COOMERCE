import { useParams } from "react-router";

export default function OrderSuccess() {
  const { id } = useParams();

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex items-center justify-center p-6">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl px-10 py-12 text-center">

        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-4xl font-bold text-white mb-4">
          Order Placed Successfully
        </h1>

        <p className="text-gray-300">
          Your Order ID
        </p>

        <p className="text-cyan-300 text-xl font-bold mt-2 mb-6">
          {id}
        </p>

        <p className="text-gray-300 mb-8">
          Thank you for your purchase.
        </p>

        <button
          onClick={goHome}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold"
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
}