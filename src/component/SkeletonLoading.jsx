const CardSkeletonLoader = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden w-full">
      
      {/* Thumbnail */}
      <div className="h-60 w-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />

      {/* Body */}
      <div className="p-3 space-y-2">

        {/* Title */}
        <div className="h-3.5 w-4/5 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse" />
        <div className="h-3.5 w-4/5 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse" />
        <div className="h-3.5 w-4/5 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse" />
        
      </div>
    </div>
  );
};

export default CardSkeletonLoader;