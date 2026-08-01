import { FiArrowRight } from "react-icons/fi";

const SaleBanner = () => {
  return (
  <section className="max-w-7xl mx-auto px-6 py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="relative overflow-hidden rounded-[40px] bg-[#ef3538] px-10 py-20 md:px-20">
        {/* Decorative Circles */}
        <div className="absolute -right-20 top-[-50px] w-80 h-80 rounded-full bg-white/10"></div>
        <div className="absolute -right-10 bottom-[-120px] w-72 h-72 rounded-full bg-white/8"></div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Content */}
          <div>
            <p className="uppercase tracking-[5px] text-red-100 font-semibold mb-5">
              Limited Time
            </p>

            <h2 className="text-white text-5xl md:text-7xl font-bold leading-tight">
              Up to 30% off
              <br />
              Selected Items
            </h2>
          </div>

          {/* Button */}
          <button className="bg-white dark:bg-gray-900 text-red-500 dark:text-white px-10 py-5 rounded-full flex items-center gap-3 text-2xl font-semibold hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            Shop Sale
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SaleBanner;