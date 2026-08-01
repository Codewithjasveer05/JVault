import { FiShoppingBag } from "react-icons/fi";

const OrderSummary = ({ cart }) => {
  const subtotal = Number(cart.cost.totalAmount.amount);

  const shipping = subtotal > 200 ? 0 : 20;

  const tax = subtotal * 0.08;

  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 sticky top-28 transition-colors duration-300">

      <h2 className="text-3xl font-bold text-black dark:text-white mb-8">
        Order Summary
      </h2>

      <div className="space-y-5">

        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">
            Subtotal
          </span>

          <span className="text-black dark:text-white">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">
            Shipping
          </span>

          <span className="text-black dark:text-white">
            {shipping === 0 ? "Free" : `$${shipping}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">
            Estimated Tax
          </span>

          <span className="text-black dark:text-white">
            ${tax.toFixed(2)}
          </span>
        </div>

      </div>

      <hr className="my-8 border-gray-200 dark:border-gray-700" />

      <div className="flex justify-between text-2xl font-bold">

        <span className="text-black dark:text-white">
          Total
        </span>

        <span className="text-black dark:text-white">
          ${total.toFixed(2)}
        </span>

      </div>

      <a
        href={cart.checkoutUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-10 h-16 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center gap-3 hover:bg-gray-800 dark:hover:bg-gray-200 transition"
      >
        <FiShoppingBag />
        Checkout
      </a>

      <div className="mt-8">

        <p className="text-gray-500 dark:text-gray-400 mb-4">
          We Accept
        </p>

        <div className="flex gap-3">

          <div className="border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 font-semibold text-black dark:text-white">
            VISA
          </div>

          <div className="border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 font-semibold text-black dark:text-white">
            MasterCard
          </div>

          <div className="border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 font-semibold text-black dark:text-white">
            PayPal
          </div>

        </div>

      </div>

    </div>
  );
};

export default OrderSummary;