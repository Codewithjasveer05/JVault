import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getCart, linkCartToCustomer } from "../services/shopify";
import { CustomerContext } from "./CustomerContext";

export const ShopifyCartContext = createContext();

const ShopifyCartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { loggedIn, customer, customerToken } = useContext(CustomerContext);
  const email = customer?.email;
  const linkedCartId = useRef("");

  const loadCart = async () => {
    const cartId = localStorage.getItem("cartId");

    if (!cartId) return;

    const data = await getCart(cartId);

    setCart(data);
  };

  // Each customer has their own cart. Logged out = no cart.
  useEffect(() => {
    if (!loggedIn) {
      localStorage.removeItem("cartId");
      setCart(null);
      return;
    }

    if (!email) return; // wait until the customer profile is loaded

    const saved = localStorage.getItem(`cartId:${email}`);

    if (saved) {
      localStorage.setItem("cartId", saved);
      loadCart();
    } else {
      localStorage.removeItem("cartId");
      setCart(null);
    }
  }, [loggedIn, email]);

  // Remember which cart belongs to this customer
  useEffect(() => {
    if (loggedIn && email && cart?.id) {
      localStorage.setItem(`cartId:${email}`, cart.id);
    }
  }, [cart?.id, loggedIn, email]);

  // Attach the cart to the customer's Shopify account (checkout is pre-filled)
  useEffect(() => {
    if (!loggedIn || !customerToken || !cart?.id) return;
    if (linkedCartId.current === cart.id) return;

    linkedCartId.current = cart.id;
    linkCartToCustomer(cart.id, customerToken);
  }, [cart?.id, loggedIn, customerToken]);

  return (
    <ShopifyCartContext.Provider value={{ cart, setCart, loadCart }}>
      {children}
    </ShopifyCartContext.Provider>
  );
};

export default ShopifyCartProvider;