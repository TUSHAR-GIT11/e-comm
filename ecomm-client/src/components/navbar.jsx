import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Search from "./search";
import { useCart } from "react-use-cart";
function Navbar() {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("token");
  const { totalItems } = useCart();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link to="/">
            <h1 className="text-2xl font-bold text-black">
              Shop<span className="text-green-600">Kart</span>
            </h1>
          </Link>

          {/* SEARCH BAR */}
          <div className="hidden md:flex flex-1 mx-8">
            <Search />
            {/* <button className="bg-green-600 text-white px-6 rounded-r-lg hover:bg-green-700">
              Search
            </button> */}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-6">
            {jwt ? (
              <>
                {/* CART ICON */}
                <Link to="/cart" className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700 hover:text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m14-9l2 9m-5-4a1 1 0 11-2 0m-8 0a1 1 0 11-2 0"
                    />
                  </svg>

                  {/* CART COUNT */}
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                    {totalItems}
                  </span>
                </Link>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="
    px-4 py-2
    text-sm font-medium
    text-gray-700
    border border-gray-300
    rounded-lg
    hover:bg-gray-100
    transition
  "
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="
    px-4 py-2
    text-sm font-medium
    text-white
    bg-black
    rounded-lg
    hover:bg-gray-800
    transition
  "
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="md:hidden px-4 pb-3">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </nav>
  );
}

export default Navbar;
