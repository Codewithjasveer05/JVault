import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { loginCustomer } from "../services/shopify.js";
import { CustomerContext } from "../context/CustomerContext.jsx";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";
  const { login } = useContext(CustomerContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginCustomer(email, password);

      if (response.customerUserErrors.length > 0) {
        toast.error("Incorrect email or password.");
      } else {
        login(response.customerAccessToken.accessToken);
        toast.success("Login Successful!");

        navigate(redirectTo, { replace: true });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 py-10 transition-colors duration-300">

      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="bg-red-500 text-white p-10 flex flex-col justify-center">
          <h1 className="text-5xl font-bold">
            Welcome Back!
          </h1>

          <p className="mt-6 text-lg leading-8">
            Login to continue shopping, manage your orders, wishlist and
            profile.
          </p>
        </div>

        {/* Right Side */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="p-10"
        >
          <h2 className="text-4xl font-bold text-black dark:text-white">
            Login
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {location.state?.from
              ? "Please login to add items to your cart."
              : "Enter your account details."}
          </p>

          {/* Email */}
          <div className="mt-8 relative">
            <FiMail className="absolute left-4 top-4 text-gray-500 dark:text-gray-400 text-xl" />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-red-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mt-5 relative">
            <FiLock className="absolute left-4 top-4 text-gray-500 dark:text-gray-400 text-xl" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl py-3 pl-12 pr-12 outline-none focus:border-red-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-xl text-gray-600 dark:text-gray-300"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Remember Me */}
          <div className="flex justify-between items-center mt-5 text-sm">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                className="accent-red-500"
              />
              Remember Me
            </label>

            <Link
              to="/forgot-password"
              className="text-red-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          {error && (
            <p className="text-red-500 mt-4 text-sm">
              {error}
            </p>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-8">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>

            <span className="text-gray-500 dark:text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          </div>

          {/* Google */}
       <button
  type="button"
  disabled
  className="w-full border border-gray-300 dark:border-gray-700 rounded-xl py-4 font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-70"
>
  Continue with Google
</button>

          {/* Register */}
          <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
            Don't have an account?

            <Link
              to="/register"
              state={location.state}
              className="text-red-500 font-semibold ml-2"
            >
              Create Account
            </Link>
          </p>

        </form>
      </div>
    </section>
  );
};

export default Login;