import { NavLink } from "react-router-dom";

const categories = [
  "All Products",
  "Electronics",
  "Fashion",
  "Footwear",
  "Accessories",
  "Home & Living",
];

const prices = [
  "Under $50",
  "$50 - $150",
  "$150 - $500",
  "Over $500",
];

const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
];

const ShopSidebar = ({
  selectedPrice,
  setSelectedPrice,
  selectedSort,
  setSelectedSort,
}) => {
  return (
    <div className="w-72 hidden lg:block shrink-0">
      <div className="sticky top-28">

        {/* CATEGORY */}
        <h3 className="uppercase tracking-[5px] text-gray-500 dark:text-gray-400 font-semibold mb-8">
          Category
        </h3>

        <div className="flex flex-col gap-2">
          {categories.map((category) => {
            const url =
              category === "All Products"
                ? "/shop/all-products"
                : `/shop/${category.toLowerCase().replace(/\s*&\s*/g, "-").replace(/\s+/g, "-")}`;
            
            return (
              <NavLink key={category} to={url}>
                {({ isActive }) => (
                  <div
                    className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-red-500 text-white"
                        : "text-gray-600 dark:text-gray-400 hover:text-red-500"
                    }`}
                  >
                    {category}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* PRICE */}
        <div className="mt-16">
          <h3 className="uppercase tracking-[5px] text-gray-500 dark:text-gray-400 font-semibold mb-8">
            Price Range
          </h3>

          <div className="flex flex-col gap-2">
            {prices.map((price) => (
              <button
                key={price}
                onClick={() =>
                  setSelectedPrice(selectedPrice === price ? "" : price)
                }
                className={`text-left px-3 py-2 transition duration-300 ${
                  selectedPrice === price
                    ? "text-red-500 font-semibold"
                    : "text-gray-600 dark:text-gray-400 hover:text-red-500"
                }`}
              >
                {price}
              </button>
            ))}
          </div>
        </div>

        {/* SORT */}
        <div className="mt-16">
          <h3 className="uppercase tracking-[5px] text-gray-500 dark:text-gray-400 font-semibold mb-8">
            Sort By
          </h3>

          <div className="flex flex-col gap-2">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedSort(option)}
                className={`text-left px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedSort === option
                    ? "bg-red-500 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-red-500"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShopSidebar;