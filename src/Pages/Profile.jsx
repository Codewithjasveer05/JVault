import { useContext } from "react";
import { CustomerContext } from "../context/CustomerContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { logout, customer } = useContext(CustomerContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!customer) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Loading Profile...
        </h1>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 transition-colors duration-300">

        {/* Avatar */}

        <div className="flex justify-center">
          <div className="w-28 h-28 rounded-full bg-red-500 flex items-center justify-center text-white text-5xl font-bold">
            {customer.firstName.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Name */}

        <h1 className="text-3xl font-bold text-center mt-8 text-gray-900 dark:text-white">
          {customer.firstName} {customer.lastName}
        </h1>

        {/* Email */}

        <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
          {customer.email}
        </p>

        {/* Divider */}

        <hr className="my-8 border-gray-300 dark:border-gray-700" />

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl text-lg font-semibold transition"
        >
          Logout
        </button>

      </div>

    </section>
  );
};

export default Profile;