const PromoSkeleton = () => {
  return (
    <div className="w-full relative overflow-hidden rounded-xl h-[50svh] min-h-[300px] md:h-[min(100svh,780px)] md:min-h-[420px]"
      style={{background: "#0d0d1a" }}>

      {/* top + bottom fade overlay */}
      <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0d0d1a] via-[#0d0d1a]/60 to-transparent pointer-events-none" />

      {/* content skeleton */}
      <div className="absolute bottom-0 left-0 p-8 md:p-12 flex flex-col gap-3 z-10 w-full">

        {/* badge */}
        <div className="h-4 w-20 rounded shimmer" />

        {/* title lines */}
        <div className="h-9 w-[55%] rounded shimmer" />
        <div className="h-6 w-[38%] rounded shimmer" />

        {/* meta pills */}
        <div className="flex gap-3 mt-1">
          <div className="h-5 w-16 rounded-full shimmer" />
          <div className="h-5 w-16 rounded-full shimmer" />
          <div className="h-5 w-16 rounded-full shimmer" />
        </div>

        {/* buttons */}
        <div className="flex gap-3 mt-2">
          <div className="h-10 w-32 rounded-lg shimmer" />
          <div className="h-10 w-32 rounded-lg shimmer" />
        </div>
      </div>
    </div>
  )
}

export default PromoSkeleton