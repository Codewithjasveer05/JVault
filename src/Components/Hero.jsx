import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1974&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/45 dark:bg-black/60 transition-colors duration-300"></div>

      <div className="relative max-w-7xl mx-auto w-full px-8 flex justify-between items-center">
        {/* Left Content */}
        <div className="max-w-2xl">
          <p className="uppercase tracking-[6px] text-red-600 font-semibold mb-5">
            New Season — SS 2025
          </p>

          <h1 className="text-7xl lg:text-8xl font-extrabold leading-none text-black dark:text-white">
            Less Noise.
            <br />
            <span className="text-red-600">More You.</span>
          </h1>

          <p className="mt-8 text-xl text-gray-700 dark:text-gray-300 leading-8">
            Curated essentials from the world's best brands. Timeless pieces
            that earn their place in your life.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">
            <Link
              to="/shop"
              className="bg-red-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-700 transition"
            >
              Shop Now →
            </Link>

            <Link
              to="/new"
              className="bg-white dark:bg-gray-800 text-black dark:text-white px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              New Arrivals
            </Link>
          </div>
        </div>

        {/* Right Cards */}
        <div className="hidden lg:flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-7 shadow-xl w-40 transition-colors duration-300">
            <h2 className="text-3xl font-bold text-black dark:text-white">
              12K+
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Products
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-7 shadow-xl w-40 transition-colors duration-300">
            <h2 className="text-3xl font-bold text-black dark:text-white">
              4.8★
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Avg Rating
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-7 shadow-xl w-40 transition-colors duration-300">
            <h2 className="text-3xl font-bold text-black dark:text-white">
              Free
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Returns
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;  