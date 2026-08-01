import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-full flex justify-center py-20">
          <h2 className="text-2xl font-semibold text-gray-400 dark:text-gray-500">
            No Products Found
          </h2>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;