import { createContext, useEffect, useState } from "react";
import { getCart } from "../services/shopify";

export const ShopifyCartContext = createContext();

const ShopifyCartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  const loadCart = async () => {
    const cartId = localStorage.getItem("cartId");

    if (!cartId) return;

    const data = await getCart(cartId);

    setCart(data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <ShopifyCartContext.Provider value={{ cart, setCart, loadCart }}>
      {children}
    </ShopifyCartContext.Provider>
  );
};

export default ShopifyCartProvider;