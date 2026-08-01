import { Link } from "react-router-dom";
import { FiHome, FiShoppingBag } from "react-icons/fi";

const Error = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6 transition-colors duration-300">
      <div className="text-center max-w-2xl">

        <h1 className="text-8xl md:text-9xl font-extrabold text-red-500">
          404
        </h1>

        <h2 className="mt-6 text-4xl md:text-5xl font-bold text-black dark:text-white">
          Page Not Found
        </h2>

        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-8">
          Sorry, the page you're looking for doesn't exist or may have been
          moved. Let's get you back to shopping.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">

          <Link
            to="/"
            className="flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold transition"
          >
            <FiHome />
            Go Home
          </Link>

          <Link
            to="/shop"
            className="flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 px-8 py-4 rounded-2xl font-semibold transition"
          >
            <FiShoppingBag />
            Continue Shopping
          </Link>

        </div>

      </div>
    </section>
  );
};

export default Error;