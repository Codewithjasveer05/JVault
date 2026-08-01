import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import ShopSidebar from "../Components/Shopsidebar";
import ProductGrid from "../Components/ProdutGrid";

import { getProducts, getAllProducts } from "../services/shopify";

const priceInRange = (price, label) => {
  switch (label) {
    case "Under $50":
      return price < 50;

    case "$50 - $150":
      return price >= 50 && price <= 150;

    case "$150 - $500":
      return price >= 150 && price <= 500;

    case "Over $500":
      return price > 500;

    default:
      return true;
  }
};

const Shop = () => {
  const { collection } = useParams();

  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);

  const [allProducts, setAllProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(
    collection || "electronics"
  );

  const [selectedPrice, setSelectedPrice] = useState("");

  const [selectedSort, setSelectedSort] = useState("Featured");

  /* -------------------------------
     LOAD PRODUCTS FROM SHOPIFY
  -------------------------------- */

  useEffect(() => {
    async function loadProducts() {
      let data;

      if (!collection || collection === "all-products") {
        data = await getAllProducts();
      } else {
        data = await getProducts(collection);
      }

      setProducts(data);

      setAllProducts(data);

      setSelectedCategory(collection || "electronics");
    }

    loadProducts();
  }, [collection]);

  /* -------------------------------
     FILTER + SEARCH + SORT
  -------------------------------- */

  useEffect(() => {
    let filtered = [...allProducts];

    if (selectedPrice) {
      filtered = filtered.filter((product) =>
        priceInRange(
          Number(product.priceRange.minVariantPrice.amount),
          selectedPrice
        )
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSort === "Price: Low to High") {
      filtered.sort(
        (a, b) =>
          Number(a.priceRange.minVariantPrice.amount) -
          Number(b.priceRange.minVariantPrice.amount)
      );
    }

    if (selectedSort === "Price: High to Low") {
      filtered.sort(
        (a, b) =>
          Number(b.priceRange.minVariantPrice.amount) -
          Number(a.priceRange.minVariantPrice.amount)
      );
    }

    setProducts(filtered);
  }, [
    allProducts,
    selectedPrice,
    selectedSort,
    searchQuery,
  ]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-14 mt-24 bg-white dark:bg-gray-900 transition-colors duration-300">

      {/* Heading */}

      <div className="mb-10">

        <p className="uppercase tracking-[5px] text-red-500 font-semibold">
          Collection
        </p>

        <h1 className="text-5xl font-bold mt-2 capitalize text-gray-900 dark:text-white">
          {collection || "Electronics"}
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-3">
          {products.length} Products Found
        </p>

      </div>

      {/* Layout */}

      <div className="flex gap-10">

        <ShopSidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />

        <div className="flex-1">

          <ProductGrid
            products={products}
          />

        </div>

      </div>

    </section>
  );
};

export default Shop;