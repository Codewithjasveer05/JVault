import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const New = () => {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-36 pb-20 text-center">

        <p className="uppercase tracking-[6px] text-red-500 font-semibold">
          Just Dropped
        </p>

        <h1 className="text-5xl md:text-7xl font-bold mt-4 text-black dark:text-white">
          New Arrivals
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 leading-8">
          Discover the latest additions to JVault. Fresh styles,
          premium quality, and timeless essentials curated just for you.
        </p>

        <Link
          to="/shop"
          className="inline-flex items-center gap-3 mt-10 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold transition"
        >
          Shop Collection
          <FiArrowRight />
        </Link>

      </div>

      {/* Coming Soon Card */}
      <div className="max-w-7xl mx-auto px-6 pb-24">

        <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 py-24 px-8 text-center transition-colors duration-300">

          <h2 className="text-4xl font-bold text-black dark:text-white">
            New Collection Coming Soon
          </h2>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
            We're preparing our newest arrivals.
            Check back soon for the latest premium products.
          </p>

        </div>

      </div>

    </section>
  );
};

export default New;