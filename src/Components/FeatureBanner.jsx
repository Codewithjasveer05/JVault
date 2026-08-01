import { FiZap, FiShield, FiRefreshCcw } from "react-icons/fi";

const FeaturesBanner = () => {
  const features = [
    {
      icon: <FiZap size={24} />,
      title: "Express Delivery",
      desc: "Next-day on orders over $75",
    },
    {
      icon: <FiShield size={24} />,
      title: "Secure Payments",
      desc: "256-bit SSL encryption",
    },
    {
      icon: <FiRefreshCcw size={24} />,
      title: "Free Returns",
      desc: "30-day hassle-free returns",
    },
  ];

  return (
    <section className="w-full border-y border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 px-8 py-8 border-r border-gray-200 dark:border-gray-700 last:border-r-0"
          >
            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
              {item.icon}
            </div>

            {/* Text */}
            <div>
              <h3 className="text-xl font-semibold text-black dark:text-white">
                {item.title}
              </h3>

              <p className="text-gray-500 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesBanner;