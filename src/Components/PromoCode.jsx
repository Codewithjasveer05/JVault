import { useState } from "react";

const PromoCode = () => {
  const [code, setCode] = useState("");

  const applyCoupon = () => {
    if (!code.trim()) {
      alert("Enter a promo code");
      return;
    }

    alert(`Promo "${code}" applied (Demo)`);

    setCode("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 transition-colors duration-300">

      <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
        Promo Code
      </h2>

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Enter coupon..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-2xl px-5 py-4 outline-none focus:border-red-500 transition"
        />

        <button
          onClick={applyCoupon}
          className="bg-red-500 hover:bg-red-600 text-white px-8 rounded-2xl transition"
        >
          Apply
        </button>

      </div>

    </div>
  );
};

export default PromoCode;