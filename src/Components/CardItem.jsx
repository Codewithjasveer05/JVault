import {
  FiMinus,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

const CartItem = ({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm transition-colors duration-300 flex flex-col md:flex-row gap-6 items-center">

      {/* Product Image */}
      <img
        src={item.merchandise.product.featuredImage.url}
        alt={item.merchandise.product.title}
        className="w-40 h-40 rounded-2xl object-contain bg-white"
      />

      {/* Product Info */}
      <div className="flex-1">

        <p className="uppercase tracking-[4px] text-red-500 font-semibold">
          {item.merchandise.product.vendor || "JVault"}
        </p>

        <h2 className="text-2xl font-bold mt-2 text-black dark:text-white">
          {item.merchandise.product.title}
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {item.merchandise.title}
        </p>

        <p className="text-3xl font-bold mt-5 text-black dark:text-white">
          ${Number(item.merchandise.price.amount).toFixed(2)}
        </p>

      </div>

      {/* Quantity */}
      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden">

        <button
          onClick={() => decreaseQuantity(item)}
          className="px-5 py-4 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white transition"
        >
          <FiMinus />
        </button>

        <span className="px-6 font-semibold text-black dark:text-white">
          {item.quantity}
        </span>

        <button
          onClick={() => increaseQuantity(item)}
          className="px-5 py-4 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white transition"
        >
          <FiPlus />
        </button>

      </div>

      {/* Delete */}
      <button
        onClick={() => removeItem(item)}
        className="text-red-500 hover:text-red-600 transition text-2xl"
      >
        <FiTrash2 />
      </button>

    </div>
  );
};

export default CartItem;