import { useSelector } from "react-redux"
import SearchBar from "./SearchBar"
import FindAnimeCard from "./FindAnimeCard"
import FindAnimeCardSkeleton from "./FindAnimeCardSkeleton"

const FindGpt = () => {
  const findAnimeResult = useSelector((store) => store.FindGpt.findAnimeList)
  const findAnimeLoading = useSelector((store) => store.FindGpt.findAnimeLoading)
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #000000 0%, #0a1628 50%, #152331 100%)" }}
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 rounded-full opacity-20 blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #1d4ed8 0%, transparent 70%)" }}
      />
      <div className="absolute bottom-1/4 left-1/4 w-75 h-50 rounded-full opacity-10 blur-[80px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #E50914 0%, transparent 70%)" }}
      />

      {/* Header text */}
      <div className="flex gap-2 justify-center items-center text-center mb-10 mt-6 z-10">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 ">
          <div className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
          <span className="text-white/50 text-xs tracking-widest uppercase">AI Powered</span>
        </div>
        
        <p className="text-white/40 text-sm md:text-2xl max-w-md mx-auto leading-relaxed" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>
          Let AI find the perfect match.
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-2 mt-6 justify-center z-10 max-w-lg">
        {["Dark fantasy with magic", "Slice of life romance", "Epic battle shounen", "Psychological thriller"].map((s) => (
          <button key={s}
            className="text-xs text-white/40 border border-white/10 hover:border-white/30 hover:text-white/70 px-3 py-1.5 rounded-full transition-all duration-200 bg-white/5 hover:bg-white/10">
            {s}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-6 justify-center mb-3">
        {
        findAnimeLoading ? Array.from({ length: 5 }).map((_, i) => <FindAnimeCardSkeleton key={i} />) 
          :
        findAnimeResult?.map((anime)=>{
          return(
            <FindAnimeCard 
              key={anime?.mal_id}
              title={anime?.title_english}
              imageUrl={anime?.images?.jpg?.large_image_url}
              synopsis={anime?.synopsis}
              score={anime?.score}
              episodes={anime?.episodes}
              genres={anime?.genres}
              status={anime?.status}
              rank={anime?.rank}
            />
          )
        })}
      </div>
    </div>
  )
}

export default FindGpt