import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PromoVideo from "./PromoVideo";
import AnimeListContainer from "./AnimeListContainer";
import useTopAnimeList from "../hooks/useTopAnimeList";
import useSeasonAnimeList from "../hooks/useSeasonAnimeList";
import CardSkeletonLoader from "./SkeletonLoading";
import PromoSkeleton from "./PromoSkeleton";
const FindGpt = lazy(() => import('./FindGpt'))

const Browse = () => {
  const { loading: topListLoading } = useTopAnimeList()
  const { loading: seasonLoading } = useSeasonAnimeList()

  const promo = useSelector((store) => store.anime.promo)
  const topAnimeList = useSelector((store) => store.anime.topAnime)
  const seasonAnimeList = useSelector((store) => store.anime.seasonAnime)
  const isFindGptBtnActive = useSelector((store) => store.FindGpt.isActive)

  if (isFindGptBtnActive)
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <FindGpt />
      </Suspense>
    );

  if (topListLoading || promo === null){
    return(
      <>
      <div className="w-full min-h-screen" style={{ background: "linear-gradient(to right, #000000, #152331)" }}>
        <PromoSkeleton/>
        <SkeletonRow />
      </div>
      </>
      
    )
  }

  return (
    <div className="w-full min-h-screen" style={{ background: "linear-gradient(to right, #000000, #152331)" }}>
      
      <PromoVideo src={promo?.trailer?.embed_url} title={promo?.title_english} />

      {/* Top Anime Section */}
      {topListLoading
        ? <SkeletonRow />
        : <AnimeListContainer title={"Top Anime"} animeList={topAnimeList || [] } type="top" />
      }

      {/* Season Anime Section */}
      {seasonLoading
        ? <SkeletonRow />
        : <AnimeListContainer title={"Season Anime"} animeList={seasonAnimeList || []} type="season" />
      }

    </div>
  )
}

const SkeletonRow = () => (
  <div className="mt-4 flex overflow-x-auto px-4 scrollbar-hide">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="w-36 sm:w-44 md:w-52 flex-shrink-0 mr-3">
        <CardSkeletonLoader />
      </div>
    ))}
  </div>
)

export default Browse