import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.handle}`} className="group block">
      <div className="relative overflow-hidden rounded-3xl bg-white">
        <img
          src={
            product.featuredImage?.url ||
            "https://placehold.co/600x700?text=No+Image"
          }
          alt={product.title}
          className="h-[340px] w-full object-contain duration-500 group-hover:scale-105"
        />

        {/* Wishlist */}
        <button className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white flex justify-center items-center shadow-lg hover:bg-red-500 hover:text-white transition duration-300">
          <FiHeart size={20} />
        </button>

        {/* Quick Add */}
        <button className="absolute bottom-0 left-0 w-full bg-black dark:bg-white text-white dark:text-black py-4 flex justify-center items-center gap-2 translate-y-full group-hover:translate-y-0 transition duration-300">
          <FiShoppingBag />
          Quick Add
        </button>
      </div>

      <div className="mt-5">
        <p className="uppercase tracking-[4px] text-gray-400 dark:text-gray-500 text-sm">
          {product.vendor || "JVault"}
        </p>

        <h2 className="font-semibold text-2xl mt-2 text-black dark:text-white">
          {product.title}
        </h2>

        <div className="flex items-center gap-2 mt-2">
          <FiStar className="text-yellow-500 fill-yellow-500" />

          <span className="text-black dark:text-white">
            4.8
          </span>

          <span className="text-gray-400 dark:text-gray-500">
            (214)
          </span>
        </div>

        <p className="text-3xl font-bold mt-3 text-black dark:text-white">
          ${product.priceRange.minVariantPrice.amount}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;