import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import AnimeCard from "./AnimeCard";
import useTopAnimeList from "../hooks/useTopAnimeList";
import useSeasonAnimeList from "../hooks/useSeasonAnimeList";
import CardSkeletonLoader from "./SkeletonLoading";
import { useEffect, useState, useRef, useCallback } from "react";

const ExploreAll = () => {
  const [animeData, setAnimeData] = useState([]);
  const [page, setPage] = useState(1);
  const [showShimmer, setShowShimmer] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const isFetching = useRef(false);

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const { loading: topLoading } = useTopAnimeList();
  const { loading: seasonLoading } = useSeasonAnimeList();

  const topAnimeList = useSelector((store) => store.anime.topAnime) || [];
  const seasonAnimeList = useSelector((store) => store.anime.seasonAnime) || [];

  const isTop = type === "top";
  const animeList = isTop ? topAnimeList : seasonAnimeList;
  const heading = isTop ? "Top Anime" : "Season Anime";
  const loading = isTop ? topLoading : seasonLoading;
  const url = isTop
    ? "https://api.jikan.moe/v4/top/anime"
    : "https://api.jikan.moe/v4/seasons/now";

  useEffect(() => {
    if (animeList.length > 0) {
      setAnimeData(animeList);
      setPage(1);
      setHasMore(true);
    }
  }, [animeList]);

  const fetchNextPage = useCallback(async () => {
    if (isFetching.current || !hasMore) return;

    isFetching.current = true;
    setShowShimmer(true);

    try {
      const nextPage = page + 1;
      const res = await fetch(`${url}?page=${nextPage}`);
      const data = await res.json();

      if (!data.data || data.data.length === 0) {
        setHasMore(false); 
      } else {
        setAnimeData((prev) => [...prev, ...data.data]);
        setPage(nextPage);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setShowShimmer(false);
      isFetching.current = false;
    }
  }, [page, url, hasMore]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      
      const nearBottom =
        window.scrollY + window.innerHeight >= document.body.scrollHeight - 200;

      if (nearBottom) fetchNextPage();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage]);

  return (
    <div className="w-full min-h-screen bg-black">
      {/* Header */}
      <div className="px-6 pt-24 pb-6">
        <p className="text-zinc-400 text-sm tracking-[0.3em] uppercase mb-1">
          Discover
        </p>
        <h1 className="text-white text-3xl md:text-4xl font-bold">{heading}</h1>
        <div className="mt-3 w-12 h-0.5 bg-red-500" />
      </div>

      {/* Initial loading */}
      {loading ? (
        <div className="px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array(12).fill(0).map((_, i) => (
            <CardSkeletonLoader key={i} />
          ))}
        </div>
      ) : (
        <div className="px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {animeData.map((anime) => (
            <AnimeCard key={anime?.mal_id} anime={anime} />
          ))}
        </div>
      )}

      {/* Scroll shimmer — grid ke saath seamlessly append hoga */}
      {showShimmer && (
        <div className="px-6 pb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
          {Array(6).fill(0).map((_, i) => (
            <CardSkeletonLoader key={i} />
          ))}
        </div>
      )}

      {/* End of list */}
      {!hasMore && !loading && (
        <p className="text-center text-zinc-500 text-sm py-8 tracking-widest uppercase">
          You've seen it all
        </p>
      )}
    </div>
  );
};

export default ExploreAll;