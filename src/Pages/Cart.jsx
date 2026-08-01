import { useContext } from "react";
import { Link } from "react-router-dom";

import CartItem from "../Components/CardItem.jsx";
import OrderSummary from "../Components/OrderSummary.jsx";
import PromoCode from "../Components/PromoCode.jsx";

import { ShopifyCartContext } from "../context/ShopifyCartContext.jsx";
import { updateCartLine, removeCartLine } from "../services/shopify";

const Cart = () => {
  const { cart, setCart, loadCart } = useContext(ShopifyCartContext);

  /* ------------------------------------------
     Update Quantity
  ------------------------------------------ */

  const updateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1) return;

    const cartId = localStorage.getItem("cartId");

    setCart((prev) => {
      const updatedLines = prev.lines.nodes.map((line) =>
        line.id === item.id ? { ...line, quantity: newQuantity } : line
      );

      const totalQuantity = updatedLines.reduce(
        (sum, line) => sum + line.quantity,
        0
      );

      return {
        ...prev,
        lines: { nodes: updatedLines },
        totalQuantity,
      };
    });

    try {
      const updatedCart = await updateCartLine(cartId, item.id, newQuantity);

      if (updatedCart) {
        setCart((prev) => ({
          ...prev,
          totalQuantity: updatedCart.totalQuantity,
          cost: updatedCart.cost,
        }));
      }
    } catch (err) {
      console.error("Failed to update quantity:", err);
      loadCart();
    }
  };

  const increaseQuantity = (item) => updateQuantity(item, item.quantity + 1);

  const decreaseQuantity = (item) => {
    if (item.quantity === 1) return;
    updateQuantity(item, item.quantity - 1);
  };

  /* ------------------------------------------
     Remove Item
  ------------------------------------------ */

  const removeItem = async (item) => {
    const cartId = localStorage.getItem("cartId");

    setCart((prev) => {
      const updatedLines = prev.lines.nodes.filter(
        (line) => line.id !== item.id
      );

      const totalQuantity = updatedLines.reduce(
        (sum, line) => sum + line.quantity,
        0
      );

      return {
        ...prev,
        lines: { nodes: updatedLines },
        totalQuantity,
      };
    });

    try {
      const updatedCart = await removeCartLine(cartId, item.id);

      if (updatedCart) {
        setCart((prev) => ({
          ...prev,
          totalQuantity: updatedCart.totalQuantity,
          cost: updatedCart.cost,
        }));
      }
    } catch (err) {
      console.error("Failed to remove item:", err);
      loadCart();
    }
  };

  /* ------------------------------------------
     Empty Cart
  ------------------------------------------ */

  if (!cart || cart.lines.nodes.length === 0) {
    return (
      <section className="max-w-7xl mx-auto pt-40 text-center bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">

        <h1 className="text-5xl font-bold text-black dark:text-white">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-4">
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/shop"
          className="inline-block mt-8 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl transition"
        >
          Continue Shopping
        </Link>

      </section>
    );
  }

  /* ------------------------------------------
     Cart Page
  ------------------------------------------ */

  return (
    <section className="max-w-7xl mx-auto px-4 pt-32 pb-20 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">

      <h1 className="text-5xl font-bold text-black dark:text-white mb-12">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {cart.lines.nodes.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeItem={removeItem}
            />
          ))}
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <PromoCode />
          <OrderSummary cart={cart} />
        </div>

      </div>

    </section>
  );
};

export default Cart;