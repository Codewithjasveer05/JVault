import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag } from "react-icons/fi";

import { WishlistContext } from "../context/WishlistContext.jsx";
import { ShopifyCartContext } from "../context/ShopifyCartContext.jsx";
import SkeletonCard from "./SkeletonCard.jsx";
import {
  createCart,
  addToCart as shopifyAddToCart,
} from "../services/shopify";

const FeaturedProducts = ({ products, loading }) => {
  const { addToWishlist, isInWishlist } = useContext(WishlistContext);
  const { setCart } = useContext(ShopifyCartContext);

  const [addedId, setAddedId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  // Wishlist still stores its own simplified shape — unrelated to the cart bug
  const toWishlistItem = (product) => ({
    id: product.id,
    title: product.title,
    brand: product.vendor || "JVault",
    price: Number(product.priceRange.minVariantPrice.amount),
    images: [
      product.featuredImage?.url ||
        "https://placehold.co/500x500?text=No+Image",
    ],
  });

  const handleQuickAdd = async (product) => {
    const variant = product.variants?.nodes?.[0];

    if (!variant || !variant.availableForSale) return;

    setLoadingId(product.id);

    let cartId = localStorage.getItem("cartId");

    if (!cartId) {
      const cart = await createCart();
      cartId = cart.id;
      localStorage.setItem("cartId", cartId);
    }

    const updatedCart = await shopifyAddToCart(cartId, variant.id, 1);

    if (updatedCart) {
      setCart(updatedCart);
    }

    setLoadingId(null);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleWishlist = (product) => {
    addToWishlist(toWishlistItem(product));
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-white dark:bg-gray-900 transition-colors duration-300">

      {/* Heading */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <p className="uppercase tracking-[6px] text-red-500 font-semibold">
            Handpicked
          </p>

          <h2 className="text-6xl font-bold mt-2 text-black dark:text-white">
            Featured
          </h2>
        </div>

        <Link
          to="/shop"
          className="hidden md:flex items-center gap-2 text-xl text-black dark:text-white hover:text-red-500 transition"
        >
          See all →
        </Link>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products.map((item) => {
              const liked = isInWishlist(item.id);
              const variant = item.variants?.nodes?.[0];
              const outOfStock = variant && !variant.availableForSale;

              return (
                <div key={item.id}>

                  {/* Image */}
                  <div className="relative rounded-3xl overflow-hidden group">

                    <img
                      src={
                        item.featuredImage?.url ||
                        "https://placehold.co/500x500?text=No+Image"
                      }
                      alt={item.title}
                      className="h-[310px] w-full object-cover duration-500 group-hover:scale-110"
                    />

                    {/* Wishlist */}
                    <button
                      onClick={() => handleWishlist(item)}
                      className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white flex items-center justify-center shadow hover:bg-red-500 hover:text-white transition"
                    >
                      <FiHeart
                        size={20}
                        className={liked ? "fill-red-500 text-red-500" : ""}
                      />
                    </button>

                    {/* Quick Add */}
                    <button
                      onClick={() => handleQuickAdd(item)}
                      disabled={outOfStock || loadingId === item.id}
                      className={`absolute bottom-0 left-0 w-full py-4 flex justify-center items-center gap-2 translate-y-full group-hover:translate-y-0 transition duration-300 ${
                        outOfStock
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : addedId === item.id
                          ? "bg-green-600 text-white"
                          : "bg-black dark:bg-white text-white dark:text-black"
                      }`}
                    >
                      <FiShoppingBag />

                      {outOfStock
                        ? "Out of Stock"
                        : loadingId === item.id
                        ? "Adding..."
                        : addedId === item.id
                        ? "Added!"
                        : "Quick Add"}
                    </button>

                  </div>

                  {/* Details */}
                  <div className="mt-5">

                    <h3 className="text-2xl font-semibold mt-2 leading-8 text-black dark:text-white">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-3xl font-bold text-black dark:text-white">
                        ${item.priceRange.minVariantPrice.amount}
                      </span>
                    </div>

                  </div>

                </div>
              );
            })}

      </div>
    </section>
  );
};

export default FeaturedProducts;