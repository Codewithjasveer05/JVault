import { Link } from "react-router-dom";
import { categories } from "../data/Category.js";

const CategorySection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-white dark:bg-gray-900 transition-colors duration-300">

      {/* Heading */}
      <div className="flex items-end justify-between mb-10">

        <div>
          <p className="uppercase tracking-[6px] text-red-500 font-semibold">
            Browse
          </p>

          <h2 className="text-6xl font-bold mt-2 text-black dark:text-white">
            Shop by Category
          </h2>
        </div>

        <Link
          to="/shop"
          className="hidden md:flex items-center gap-2 text-xl text-black dark:text-white hover:text-red-500 transition"
        >
          View all →
        </Link>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {categories.map((item) => (
          <Link
            key={item.id}
            to={`/shop/${item.slug}`}
            className="relative h-[420px] rounded-3xl overflow-hidden group cursor-pointer"
          >

            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

            {/* Text */}
            <div className="absolute bottom-7 left-7 text-white">

              <h3 className="text-4xl font-bold">
                {item.title}
              </h3>

           

            </div>

          </Link>
        ))}

      </div>

    </section>
  );
};

export default CategorySection;