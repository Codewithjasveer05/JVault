import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { WishlistContext } from "../context/WishlistContext";
import { ShopifyCartContext } from "../context/ShopifyCartContext.jsx";
import { CustomerContext } from "../context/CustomerContext.jsx";

import {
  getProduct,
  createCart,
  addToCart as shopifyAddToCart,
} from "../services/shopify";

import {
  FiHeart,
  FiShoppingBag,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiStar,
} from "react-icons/fi";

const ProductDetail = () => {
  const { handle } = useParams();

  const { setCart } = useContext(ShopifyCartContext);
  const { loggedIn } = useContext(CustomerContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { addToWishlist, isInWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      const data = await getProduct(handle);

      setProduct(data);

      if (data?.featuredImage) {
        setSelectedImage(data.featuredImage.url);
      }
    }

    loadProduct();
  }, [handle]);

  if (!product) {
    return (
      <section className="max-w-7xl mx-auto pt-40 text-center bg-white dark:bg-gray-900 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Loading Product...
        </h2>
      </section>
    );
  }

  const liked = isInWishlist(product.id);
  const inStock = product.variants.nodes[0].availableForSale;

  const handleAddToCart = async () => {
    if (!inStock) return;

    // Must be logged in to add to cart
    if (!loggedIn) {
      toast.error("Please login first to add items to your cart.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    let cartId = localStorage.getItem("cartId");

    if (!cartId) {
      const cart = await createCart();

      cartId = cart.id;

      localStorage.setItem("cartId", cartId);

      console.log("New Cart Created:", cartId);
    } else {
      console.log("Existing Cart:", cartId);
    }

    const updatedCart = await shopifyAddToCart(
      cartId,
      product.variants.nodes[0].id,
      quantity
    );

    console.log("Updated Cart:", updatedCart);

    if (updatedCart) {
      setCart(updatedCart);
    }

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const handleAddToWishlist = () => {
    addToWishlist({
      id: product.id,
      title: product.title,
      brand: product.vendor || "JVault",
      price: Number(product.variants.nodes[0].price.amount),
      images: [
        product.featuredImage?.url ||
          "https://placehold.co/500x500?text=No+Image",
      ],
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-20 bg-white dark:bg-gray-900 transition-colors duration-300">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT */}

        <div>

          <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300">

            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-[350px] sm:h-[550px] object-contain"
            />

          </div>

          <div className="grid grid-cols-4 gap-4 mt-6">

            {product.images?.nodes?.map((image) => (

              <button
                key={image.url}
                onClick={() => setSelectedImage(image.url)}
                className={`rounded-2xl overflow-hidden bg-white border-2 transition ${
                  selectedImage === image.url
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >

                <img
                  src={image.url}
                  alt=""
                  className="h-24 w-full object-contain"
                />

              </button>

            ))}

          </div>

        </div>

        {/* RIGHT */}

        <div>

          <p className="uppercase tracking-[5px] text-red-500 font-semibold">
            {product.vendor}
          </p>

          <h1 className="text-5xl font-bold mt-3 leading-tight text-gray-900 dark:text-white">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mt-6">

            <FiStar className="text-yellow-500 fill-yellow-500" />
            <FiStar className="text-yellow-500 fill-yellow-500" />
            <FiStar className="text-yellow-500 fill-yellow-500" />
            <FiStar className="text-yellow-500 fill-yellow-500" />
            <FiStar className="text-yellow-500 fill-yellow-500" />

            <span className="text-gray-500 dark:text-gray-400">
              Shopify Product
            </span>

          </div>

          <h2 className="text-5xl font-bold mt-8 text-gray-900 dark:text-white">
            ${Number(product.variants.nodes[0].price.amount).toFixed(2)}
          </h2>

          <p
            className={`mt-3 font-semibold ${
              product.variants.nodes[0].availableForSale
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {product.variants.nodes[0].availableForSale
              ? "✔ In Stock"
              : "❌ Out of Stock"}
          </p>

          <hr className="my-8 border-gray-300 dark:border-gray-700" />

          <p className="text-lg text-gray-600 dark:text-gray-400 leading-8">
            {product.description || "No description available."}
          </p>
                    <div className="mt-10">

            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              Quantity
            </p>

            <div className="flex items-center border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl w-44 h-14 mt-4 transition-colors duration-300">

              <button
                className="flex-1 text-xl text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-2xl transition"
                onClick={() =>
                  quantity > 1 && setQuantity(quantity - 1)
                }
              >
                -
              </button>

              <span className="flex-1 text-center font-semibold text-gray-900 dark:text-white">
                {quantity}
              </span>

              <button
                className="flex-1 text-xl text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-2xl transition"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>

            </div>

          </div>

          <div className="flex gap-4 mt-10">

            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`flex-1 h-16 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition
                ${
                  !inStock
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : added
                    ? "bg-green-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
            >
              <FiShoppingBag />

              {!inStock
                ? "Out of Stock"
                : added
                ? "Added To Cart!"
                : "Add To Cart"}

            </button>

            <button
              onClick={handleAddToWishlist}
              className="w-16 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-center items-center hover:bg-red-50 dark:hover:bg-gray-700 transition-colors duration-300"
            >

              <FiHeart
                className={`text-2xl ${
                  liked ? "text-red-500 fill-red-500" : "text-gray-500 dark:text-gray-400"
                }`}
              />

            </button>

          </div>

          <hr className="my-10 border-gray-300 dark:border-gray-700" />

          <div className="space-y-5 text-gray-600 dark:text-gray-400">

            <div className="flex items-center gap-3">

              <FiTruck className="text-red-500" />

              <span>
                Free Shipping Available
              </span>

            </div>

            <div className="flex items-center gap-3">

              <FiRefreshCw className="text-red-500" />

              <span>
                Easy Returns
              </span>

            </div>

            <div className="flex items-center gap-3">

              <FiShield className="text-red-500" />

              <span>
                Secure Checkout
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ProductDetail;