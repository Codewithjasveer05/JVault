import { Link } from "react-router-dom";
import {
  FiAward,
  FiTruck,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";

const About = () => {
  return (
    <section className="bg-white dark:bg-gray-900 transition-colors duration-300">

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-36 pb-24 text-center">

        <p className="uppercase tracking-[5px] text-red-500 font-semibold">
          About JVault
        </p>

        <h1 className="text-5xl md:text-7xl font-bold mt-4 text-black dark:text-white">
          Fashion That Speaks
        </h1>

        <p className="max-w-3xl mx-auto mt-8 text-lg leading-8 text-gray-600 dark:text-gray-400">
          At JVault, we believe fashion is more than clothing—it's confidence,
          identity, and self-expression. We curate premium collections that
          combine timeless style with modern trends for everyday wear.
        </p>

      </div>

      {/* Our Story */}

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">

        <div>
          <h2 className="text-4xl font-bold text-black dark:text-white">
            Our Story
          </h2>

          <p className="mt-6 text-gray-600 dark:text-gray-400 leading-8">
            JVault was created with one simple vision: to make premium fashion
            accessible to everyone. Every product is carefully selected for its
            quality, comfort, and style.
          </p>

          <p className="mt-6 text-gray-600 dark:text-gray-400 leading-8">
            Whether you're shopping for everyday essentials or standout pieces,
            JVault delivers an effortless shopping experience backed by secure
            payments, fast shipping, and trusted customer support.
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-12 border border-gray-200 dark:border-gray-700 transition-colors duration-300">

          <h3 className="text-3xl font-bold text-black dark:text-white">
            Our Mission
          </h3>

          <p className="mt-6 text-gray-600 dark:text-gray-400 leading-8">
            To inspire confidence by providing premium-quality products,
            exceptional customer service, and a seamless online shopping
            experience.
          </p>

        </div>

      </div>

      {/* Why Choose Us */}

      <div className="max-w-7xl mx-auto px-6 py-24">

        <h2 className="text-4xl font-bold text-center text-black dark:text-white">
          Why Choose JVault?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 text-center transition">

            <FiAward className="mx-auto text-5xl text-red-500" />

            <h3 className="text-2xl font-semibold mt-6 text-black dark:text-white">
              Premium Quality
            </h3>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Every product is selected with strict quality standards to ensure
              durability and comfort.
            </p>

          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 text-center transition">

            <FiTruck className="mx-auto text-5xl text-red-500" />

            <h3 className="text-2xl font-semibold mt-6 text-black dark:text-white">
              Fast Delivery
            </h3>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Quick and reliable shipping with real-time order tracking to your
              doorstep.
            </p>

          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 text-center transition">

            <FiShield className="mx-auto text-5xl text-red-500" />

            <h3 className="text-2xl font-semibold mt-6 text-black dark:text-white">
              Secure Shopping
            </h3>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Safe payments and trusted checkout powered by Shopify's secure
              infrastructure.
            </p>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="bg-red-500 py-20">

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center text-white">

          <div>
            <h3 className="text-5xl font-bold">10K+</h3>
            <p className="mt-3">Happy Customers</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">500+</h3>
            <p className="mt-3">Premium Products</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">99%</h3>
            <p className="mt-3">Positive Reviews</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">24/7</h3>
            <p className="mt-3">Customer Support</p>
          </div>

        </div>

      </div>

      {/* CTA */}

      <div className="max-w-7xl mx-auto px-6 py-24 text-center">

        <h2 className="text-4xl font-bold text-black dark:text-white">
          Ready to Explore Our Collection?
        </h2>

        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
          Discover premium fashion designed for your everyday lifestyle.
        </p>

        <Link
          to="/shop"
          className="inline-flex items-center gap-3 mt-10 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold transition"
        >
          Shop Now
          <FiArrowRight />
        </Link>

      </div>

    </section>
  );
};

export default About;