const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
              V
            </div>

            <h2 className="text-4xl font-bold text-black dark:text-white">
              Vault
            </h2>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-lg leading-8">
            Curated essentials from brands
            <br />
            that build things to last.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-2xl font-bold uppercase mb-8 text-black dark:text-white">
            Shop
          </h3>

          <ul className="space-y-5 text-gray-500 dark:text-gray-400 text-xl">
            <li className="hover:text-red-500 transition cursor-pointer">
              New Arrivals
            </li>
            <li className="hover:text-red-500 transition cursor-pointer">
              Best Sellers
            </li>
            <li className="hover:text-red-500 transition cursor-pointer">
              About
            </li>
            <li className="hover:text-red-500 transition cursor-pointer">
              Gift Cards
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-2xl font-bold uppercase mb-8 text-black dark:text-white">
            Help
          </h3>

          <ul className="space-y-5 text-gray-500 dark:text-gray-400 text-xl">
            <li className="hover:text-red-500 transition cursor-pointer">
              Shipping & Returns
            </li>
            <li className="hover:text-red-500 transition cursor-pointer">
              Size Guide
            </li>
            <li className="hover:text-red-500 transition cursor-pointer">
              Track Order
            </li>
            <li className="hover:text-red-500 transition cursor-pointer">
              Contact Us
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-2xl font-bold uppercase mb-8 text-black dark:text-white">
            Company
          </h3>

          <ul className="space-y-5 text-gray-500 dark:text-gray-400 text-xl">
            <li className="hover:text-red-500 transition cursor-pointer">
              About
            </li>
            <li className="hover:text-red-500 transition cursor-pointer">
              Careers
            </li>
            <li className="hover:text-red-500 transition cursor-pointer">
              Press
            </li>
            <li className="hover:text-red-500 transition cursor-pointer">
              Sustainability
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            © 2025 Vault. All rights reserved.
          </p>

          <div className="flex gap-10 text-lg text-gray-500 dark:text-gray-400 mt-4 md:mt-0">
            <a href="#" className="hover:text-red-500 transition">
              Privacy
            </a>

            <a href="#" className="hover:text-red-500 transition">
              Terms
            </a>

            <a href="#" className="hover:text-red-500 transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;