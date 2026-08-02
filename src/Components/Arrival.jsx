import { useEffect, useState } from "react";
import { getNewArrivals } from "../services/shopify";
import ProductCard from "./ProductCard";

const Arrival = () => {
  const [arrivals, setArrivals] = useState([]);

  useEffect(() => {
    async function loadArrivals() {
      const data = await getNewArrivals();
      setArrivals(data);
    }

    loadArrivals();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-white dark:bg-gray-900 transition-colors duration-300">

      <div className="mb-10">
        <p className="uppercase tracking-[6px] text-red-500 font-semibold">
          Just Dropped
        </p>

        <h2 className="text-6xl font-bold mt-2 text-black dark:text-white">
          New Arrivals
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {arrivals.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
};

export default Arrival;