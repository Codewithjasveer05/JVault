import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import {toast, Toaster} from "react-hot-toast"
import WishlistProvider from "./context/WishlistContext.jsx";
import ShopifyCartProvider from "./context/ShopifyCartContext.jsx"
import CartProvider from './context/Cartcontext.jsx';
import CustomerProvider from './context/CustomerContext.jsx';
import ThemeProvider from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
    position="top-right"
    reverseOrder={false}
    toastOptions={{
      duration: 3000,
    }}
  />
  <ThemeProvider>
    <CustomerProvider>
    <CartProvider>
      <ShopifyCartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>  
      </ShopifyCartProvider>
    </CartProvider>
    </CustomerProvider>
  </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);