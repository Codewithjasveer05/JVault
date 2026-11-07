import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";

import Shop from "./Pages/Shop";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import New from "./Pages/New";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Wishlist from "./Pages/Wishlist";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import About from "./Pages/About";
import ScrollToTop from "./Components/ScrollToTop";
import ChatBot from "./Components/ChatBot";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop/>
      <Navbar />

      <main className="flex-1 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:collection" element={<Shop />} />
          <Route path="/about" element={<About/>} />
          <Route path="/new" element={<New />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="*" element={<Error />} />
        </Routes>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;