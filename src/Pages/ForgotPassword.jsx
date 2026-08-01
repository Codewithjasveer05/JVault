import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { recoverCustomer } from "../services/shopify.js";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResetPassword = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const response = await recoverCustomer(email);

      if (response.customerUserErrors.length > 0) {
        setError(response.customerUserErrors[0].message);
      } else {
        setSuccess(
          "Password reset link sent! Please check your email."
        );
        setEmail("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-300">

      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-black dark:text-white">
          Forgot Password
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-3">
          Enter your email address and we'll send you a password reset link.
        </p>

        <div className="mt-8 relative">

          <FiMail className="absolute left-4 top-4 text-gray-500 dark:text-gray-400" />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-red-500 transition"
          />

        </div>

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full mt-8 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {error && (
          <p className="text-red-500 mt-4">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-600 mt-4">
            {success}
          </p>
        )}

      </div>

    </section>
  );
};

export default ForgotPassword;