import {
  FiSearch,
  FiHeart,
  FiMoon,
  FiSun,
  FiShoppingBag,
  FiUser,
  FiX,
  FiMenu,
} from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopifyCartContext } from "../context/ShopifyCartContext.jsx";
import { WishlistContext } from "../context/WishlistContext.jsx";
import { CustomerContext } from "../context/CustomerContext.jsx";
import {useTheme} from "../context/ThemeContext.jsx"
const Navbar = () => {
  const { cart } = useContext(ShopifyCartContext);
  const { wishlist } = useContext(WishlistContext);
  const { loggedIn, logout, customer} = useContext(CustomerContext)
  // const {customer} = useContext(CustomerContext)
   const {theme, toggleTheme} = useTheme()

  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
    setShowSearch(false);
  };

  const handleLogout = () => {
  logout();
  navigate("/");
};
  return (
  <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">

      {/* Desktop Navbar */}
     <nav className="max-w-7xl mx-auto h-20 px-6 bg-white dark:bg-gray-900 text-black dark:text-white flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 bg-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl font-bold">J</span>
          </div>

          <h1 className="text-3xl font-bold">
            JVault
          </h1>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-10 text-lg font-medium">

          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/shop">Shop</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/new">New In</NavLink></li>

        </ul>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-6 text-2xl">

          <button onClick={() => setShowSearch(!showSearch)}>
            <FiSearch />
          </button>

          <NavLink to="/wishlist" className="relative">
            <FiHeart />

            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {wishlist?.length || 0}
            </span>
          </NavLink>

      <button onClick={toggleTheme}>
  {theme === "light" ? <FiMoon /> : <FiSun />}
</button>

         {loggedIn ? (
  <div className="relative">
    <button
      onClick={() => setShowProfileMenu(!showProfileMenu)}
      className="w-10 h-10 rounded-full bg-red-500 text-white font-bold flex items-center justify-center"
    >
      {customer?.firstName?.charAt(0).toUpperCase() || "J"}
    </button>

    {showProfileMenu && (
      <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border z-50 overflow-hidden">

        <NavLink
          to="/profile"
          onClick={() => setShowProfileMenu(false)}
          className="block px-4 py-3 hover:bg-gray-100"
        >
          👤 My Profile
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 hover:bg-gray-100"
        >
          🚪 Logout
        </button>

      </div>
    )}
  </div>
) : (
  <>
    <NavLink to="/login">
      <FiUser />
    </NavLink>

    <NavLink
      to="/register"
      className="bg-red-500 text-white px-5 py-2 rounded-xl text-base"
    >
      Sign Up
    </NavLink>
  </>
)}

      
          <NavLink to="/cart" className="relative">
            <FiShoppingBag />

            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {cart?.totalQuantity || 0}
            </span>
          </NavLink>

        </div>

        {/* Mobile Right Side */}
        <div className="flex lg:hidden items-center gap-5">

          <button onClick={() => setShowSearch(!showSearch)}>
            <FiSearch className="text-2xl" />
          </button>

          <NavLink to="/wishlist" className="relative">
            <FiHeart className="text-2xl" />

            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {wishlist?.length || 0}
            </span>
          </NavLink>

          <NavLink to="/cart" className="relative">

            <FiShoppingBag className="text-2xl" />

            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {cart?.totalQuantity || 0}
            </span>

          </NavLink>

          <button
            onClick={() => setShowMenu(!showMenu)}
          >
            {
              showMenu
                ? <FiX className="text-3xl" />
                : <FiMenu className="text-3xl" />
            }
          </button>

        </div>

      </nav>

      {/* Search Bar */}
     {showSearch && (
  <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-5 px-6 transition-colors duration-300">

    <form
      onSubmit={handleSearchSubmit}
     className="max-w-3xl mx-auto flex items-center gap-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-5 py-3 transition-colors duration-300"
    >
<FiSearch className="text-xl text-gray-500 dark:text-gray-400" />

      <input
        autoFocus
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      className="flex-1 bg-transparent outline-none text-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
        placeholder="Search products..."
      />

      <button
        type="button"
        onClick={() => setShowSearch(false)}
       className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-red-500 transition"
      >
        <FiX />
      </button>

    </form>

  </div>
)}
      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${showMenu
            ? "max-h-screen"
            : "max-h-0"
          }`}
      >

        <div className="bg-white border-t">

          <div className="flex flex-col p-6 gap-6 text-lg">

            <NavLink to="/" onClick={() => setShowMenu(false)}>
              Home
            </NavLink>

            <NavLink to="/shop" onClick={() => setShowMenu(false)}>
              Shop
            </NavLink>

            <NavLink to="/about" onClick={() => setShowMenu(false)}>
              About
            </NavLink>

            <NavLink to="/new" onClick={() => setShowMenu(false)}>
              New In
            </NavLink>

            <NavLink to="/wishlist" onClick={() => setShowMenu(false)}>
              Wishlist
            </NavLink>

            <NavLink to="/login" onClick={() => setShowMenu(false)}>
              Login
            </NavLink>

            <NavLink
              to="/register"
              onClick={() => setShowMenu(false)}
              className="bg-red-500 text-white py-3 rounded-xl text-center"
            >
              Sign Up
            </NavLink>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;