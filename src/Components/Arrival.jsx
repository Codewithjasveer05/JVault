import { FiHeart, FiStar } from "react-icons/fi";
import { arrivals } from "../data/arrivals.js";

const Arrival = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="mb-10">
        <p className="uppercase tracking-[6px] text-red-500 font-semibold">
          Just Dropped
        </p>

        <h2 className="text-6xl font-bold mt-2 text-black dark:text-white">
          New Arrivals
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {arrivals.map((item) => (
          <div key={item.id}>
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden group">
              <img
                src={item.image}
                alt={item.title}
                className="h-[420px] w-full object-cover duration-500 group-hover:scale-110"
              />

              <span className="absolute top-4 left-4 bg-black dark:bg-gray-800 text-white px-4 py-1 rounded-xl font-semibold">
                NEW
              </span>

              <button className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white flex items-center justify-center shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <FiHeart size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="mt-5">
              <p className="uppercase tracking-widest text-gray-500 dark:text-gray-400 text-sm">
                {item.brand}
              </p>

              <h3 className="text-3xl font-semibold mt-1 text-black dark:text-white">
                {item.title}
              </h3>

              <div className="flex items-center gap-2 mt-2 text-gray-500 dark:text-gray-400">
                <FiStar className="text-yellow-500 fill-yellow-500" />
                <span>{item.rating}</span>
                <span>({item.reviews})</span>
              </div>

              <p className="text-3xl font-bold mt-3 text-black dark:text-white">
                ${item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Arrival;