import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CustomerContext } from "../context/CustomerContext";

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useContext(CustomerContext);

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;