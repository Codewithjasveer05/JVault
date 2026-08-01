const SkeletonCard = () => {
  return (
    <div className="animate-pulse">
      <div className="h-72 rounded-xl bg-gray-300 dark:bg-gray-700 transition-colors duration-300"></div>

      <div className="mt-4 h-5 w-3/4 rounded bg-gray-300 dark:bg-gray-700 transition-colors duration-300"></div>

      <div className="mt-2 h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700 transition-colors duration-300"></div>

      <div className="mt-4 h-10 rounded bg-gray-300 dark:bg-gray-700 transition-colors duration-300"></div>
    </div>
  );
};

export default SkeletonCard;