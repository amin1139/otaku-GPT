const FindAnimeCardSkeleton = () => {
  return (
    <div className="relative flex flex-col sm:flex-row w-full max-w-2xl overflow-hidden rounded-xl mb-3 bg-zinc-900 border border-zinc-800">

      {/* Image skeleton */}
      <div className="relative w-full sm:w-36 sm:min-w-36 sm:shrink-0 bg-zinc-800">
        <div className="h-48 sm:h-full sm:min-h-[220px] w-full animate-pulse bg-zinc-700/60" />
        {/* Rank badge skeleton */}
        <div className="absolute top-2 left-2 h-4 w-8 rounded animate-pulse bg-zinc-600/60" />
      </div>

      {/* Info skeleton */}
      <div className="flex flex-1 flex-col gap-3 p-4 min-w-0">

        {/* Title + Score */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="h-4 w-3/4 rounded animate-pulse bg-zinc-700/60" />
            <div className="h-4 w-1/2 rounded animate-pulse bg-zinc-700/60 sm:hidden" />
          </div>
          {/* Score pill */}
          <div className="shrink-0 h-6 w-14 rounded-full animate-pulse bg-zinc-700/60" />
        </div>

        {/* Genre pills */}
        <div className="flex flex-wrap gap-1.5">
          {[60, 72, 56, 68].map((w, i) => (
            <div
              key={i}
              className={`h-5 rounded-full animate-pulse bg-zinc-700/60 ${i >= 3 ? "hidden sm:block" : ""}`}
              style={{ width: `${w}px`, animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>

        {/* Synopsis lines */}
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-full rounded animate-pulse bg-zinc-700/60" style={{ animationDelay: "40ms" }} />
          <div className="h-3 w-5/6 rounded animate-pulse bg-zinc-700/60" style={{ animationDelay: "80ms" }} />
          <div className="h-3 w-2/3 rounded animate-pulse bg-zinc-700/60 hidden sm:block" style={{ animationDelay: "120ms" }} />
        </div>

        {/* Meta — episodes + status */}
        <div className="mt-auto flex items-center gap-4 pt-1">
          <div className="h-3.5 w-16 rounded animate-pulse bg-zinc-700/60" />
          <div className="h-3 w-px bg-zinc-700 hidden sm:block" />
          <div className="h-3.5 w-24 rounded animate-pulse bg-zinc-700/60" />
        </div>
      </div>
    </div>
  );
};

export default FindAnimeCardSkeleton;