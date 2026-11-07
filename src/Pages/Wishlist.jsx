import { useContext } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { WishlistContext } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist, addToWishlist } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 pt-40 pb-20 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">

        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">
          Wishlist
        </h1>

        <div className="text-center mt-20">

          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Your Wishlist is Empty ❤️
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-4">
            Add your favourite products here.
          </p>

          <Link
            to="/"
            className="inline-block mt-8 bg-red-500 text-white px-8 py-3 rounded-xl hover:bg-red-600 transition"
          >
            Continue Shopping
          </Link>

        </div>

      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pt-40 pb-20 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">

      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-10">
        Wishlist
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {wishlist.map((product) => (

          <div
            key={product.id}
            className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
          >

            <img
              src={
                product.images?.[0] ||
                "https://placehold.co/500x500?text=No+Image"
              }
              alt={product.title}
              className="w-full h-72 object-contain bg-white"
            />

            <div className="p-5">

              <p className="text-sm uppercase text-gray-500 dark:text-gray-400">
                {product.brand}
              </p>

              <h2 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                {product.title}
              </h2>

              <p className="text-red-500 text-2xl font-bold mt-4">
                ${Number(product.price).toFixed(2)}
              </p>

              <button
                onClick={() => addToWishlist(product)}
                className="w-full mt-6 border border-red-500 text-red-500 py-3 rounded-xl hover:bg-red-500 hover:text-white transition flex justify-center items-center gap-2"
              >
                <FiTrash2 />
                Remove From Wishlist
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Wishlist;