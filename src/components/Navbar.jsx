import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadCart = async () => {
      try {
        if (!userId) {
          setCartCount(0);
          return;
        }

        const res = await api.get(`/cart/${userId}`);

        if (res.data?.items) {
          const total = res.data.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          setCartCount(total);
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
        setCartCount(0);
      }
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [userId]);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#1e1b4b]/90 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="w-full px-10 py-4 flex items-center justify-between">

        {/* LEFT SIDE */}
        <Link
          to="/"
          className="text-3xl font-bold text-white tracking-wide"
        >
          E-Commerce Store
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-2xl text-white hover:scale-110 transition"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {!userId ? (
            <>
              <Link
                to="/login"
                className="text-white hover:text-purple-300 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-xl text-white transition duration-300"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl text-white transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}