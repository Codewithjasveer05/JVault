import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { createCustomer } from "../services/shopify.js";
import { loginCustomer } from "../services/shopify.js";
import { CustomerContext } from "../context/CustomerContext.jsx";
import toast from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { login } = useContext(CustomerContext);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await createCustomer(
        firstName,
        lastName,
        email,
        password
      );

      console.log(response);

      if (response.customerUserErrors.length > 0) {
        toast.error(response.customerUserErrors[0].message);
      } else {
        const loginResponse = await loginCustomer(email, password);

        if (loginResponse.customerUserErrors.length > 0) {
          toast.error(loginResponse.customerUserErrors[0].message);
          return;
        }

        login(loginResponse.customerAccessToken.accessToken);

        navigate(redirectTo, { replace: true });
      }
    } catch (error) {
      console.error("Register Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 px-4 py-10">

      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 transition-colors duration-300">

        {/* Left */}

        <div className="bg-red-500 text-white p-10 flex flex-col justify-center">

          <h1 className="text-5xl font-bold">
            Welcome to JVault
          </h1>

          <p className="mt-6 text-lg leading-8 text-red-50">
            Create your account to start shopping the latest products, save
            your wishlist, and manage your orders.
          </p>

        </div>

        {/* Right */}

        <div className="p-10">

          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Join us today.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">

            <div className="relative">

              <FiUser className="absolute left-4 top-4 text-gray-500 dark:text-gray-400" />

              <input
                type="text"
                placeholder="First Name"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl py-3 pl-12 pr-4 outline-none focus:border-red-500 transition-colors"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

            </div>

            <div className="relative">

              <FiUser className="absolute left-4 top-4 text-gray-500 dark:text-gray-400" />

              <input
                type="text"
                placeholder="Last Name"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl py-3 pl-12 pr-4 outline-none focus:border-red-500 transition-colors"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

            </div>

          </div>

          <div className="mt-5 relative">

            <FiMail className="absolute left-4 top-4 text-gray-500 dark:text-gray-400" />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl py-3 pl-12 pr-4 outline-none focus:border-red-500 transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div className="mt-5 relative">

            <FiLock className="absolute left-4 top-4 text-gray-500 dark:text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl py-3 pl-12 pr-12 outline-none focus:border-red-500 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-600 dark:text-gray-400"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>

          </div>

          <div className="mt-5 relative">

            <FiLock className="absolute left-4 top-4 text-gray-500 dark:text-gray-400" />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl py-3 pl-12 pr-4 outline-none focus:border-red-500 transition-colors"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

          </div>

          {error && (
            <p className="text-red-500 mt-3 text-sm">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-600 mt-3 text-sm">
              {success}
            </p>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full mt-8 bg-red-500 hover:bg-red-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="flex items-center gap-3 my-8">

            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>

            <span className="text-gray-500 dark:text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>

          </div>

          <button className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            Continue with Google
          </button>

          <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
            Already have an account?
            <Link
              to="/login"
              state={location.state}
              className="text-red-500 font-semibold ml-2 hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </section>
  );
};

export default Register;