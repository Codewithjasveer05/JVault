import { createContext, useEffect, useState } from "react";
import {getCustomer} from "../services/shopify.js"
export const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
  const [customerToken, setCustomerToken] = useState(() => localStorage.getItem("customerToken"));

  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem("customerToken"));
  const[customer, setCustomer] = useState(null)

  /* ------------------------------
     Check Login
  ------------------------------ */

const checkLogin = async () => {
  const token = localStorage.getItem("customerToken");

  if (token) {
    setCustomerToken(token);
    setLoggedIn(true);

    const data = await getCustomer(token);

    setCustomer(data);
  } else {
    setCustomerToken(null);
    setLoggedIn(false);
    setCustomer(null);
  }
};
  /* ------------------------------
     Login
  ------------------------------ */

const login = async (token) => {
  localStorage.setItem("customerToken", token);

  setCustomerToken(token);

  setLoggedIn(true);

  const data = await getCustomer(token);

  setCustomer(data);
};

  /* ------------------------------
     Logout
  ------------------------------ */
const logout = () => {
  localStorage.removeItem("customerToken");

  setCustomerToken(null);

  setLoggedIn(false);

  setCustomer(null);
};
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        customerToken,
        loggedIn,
        login,
        logout,
        checkLogin,
        customer,
        setCustomer
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;