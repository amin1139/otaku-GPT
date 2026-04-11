import { useRef, useState, useCallback } from "react";
import AnimeCard from "./AnimeCard"; // your existing component

const AnimeListContainer = ({ title, animeList }) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
    
  const SCROLL_AMOUNT = 400;

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT, behavior: "smooth" });
    setTimeout(updateArrows, 350);
  };

  return (
    <section className="w-full py-6 px-4 md:px-8 group/section">
      {/* Section Heading */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-1 h-6 rounded-full bg-[#E50914]" />
        <h2 className="text-white font-bold text-xl md:text-2xl tracking-wide uppercase">
          {title}
        </h2>
        <span className="ml-2 text-[#E50914] text-sm font-semibold opacity-0 group-hover/section:opacity-100 transition-opacity duration-300 cursor-pointer flex items-center gap-1">
          Explore All
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className={`
            absolute left-0 top-0 z-10 h-full w-12 flex items-center justify-center
            bg-linear-to-r from-black/80 to-transparent
            text-white transition-all duration-300 rounded-l-md
            hover:from-black/95 hover:text-[#E50914]
            ${showLeft ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Anime Cards Row */}
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="
            flex gap-3 overflow-x-auto overflow-y-visible
            scroll-smooth pb-3
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          "
        >
          {animeList.map((anime) => (
            <div key={anime?.mal_id} className="w-36 sm:w-44 md:w-52 shrink-0">
              <AnimeCard anime={anime} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className={`
            absolute right-0 top-0 z-10 h-full w-12 flex items-center justify-center
            bg-gradient-to-l from-black/80 to-transparent
            text-white transition-all duration-300 rounded-r-md
            hover:from-black/95 hover:text-[#E50914]
            ${showRight ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default AnimeListContainer;