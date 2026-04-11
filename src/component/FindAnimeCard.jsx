import { useState } from "react";

const GENRE_STYLES = {
  Action:    "bg-orange-900/40 text-orange-300 border border-orange-700/30",
  Adventure: "bg-emerald-900/40 text-emerald-300 border border-emerald-700/30",
  Fantasy:   "bg-violet-900/40 text-violet-300 border border-violet-700/30",
  Shounen:   "bg-blue-900/40 text-blue-300 border border-blue-700/30",
  Drama:     "bg-pink-900/40 text-pink-300 border border-pink-700/30",
  Comedy:    "bg-yellow-900/40 text-yellow-300 border border-yellow-700/30",
  Horror:    "bg-red-900/40 text-red-300 border border-red-700/30",
  Romance:   "bg-rose-900/40 text-rose-300 border border-rose-700/30",
  SciFi:     "bg-cyan-900/40 text-cyan-300 border border-cyan-700/30",
  Default:   "bg-zinc-800/60 text-zinc-300 border border-zinc-700/30",
};

const StarIcon = () => (
  <svg className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const EpisodeIcon = () => (
  <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="7" width="20" height="15" rx="2" />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    <line x1="10" y1="12" x2="14" y2="14.5" />
    <line x1="10" y1="17" x2="14" y2="14.5" />
  </svg>
);

const FindAnimeCard = ({
  title,
  imageUrl,
  synopsis ,
  score ,
  episodes,
  genres,
  status ,
  rank,
}) => {
  const [imgError, setImgError] = useState(false);

  const genreStyle = (genre) =>
    GENRE_STYLES[genre] || GENRE_STYLES.Default;

  return (
    <div className="group relative flex flex-col sm:flex-row w-full max-w-2xl overflow-hidden rounded-xl mb-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50">

      {/* Image — top on mobile, left on sm+ */}
      <div className="relative w-full sm:w-36 sm:min-w-36 sm:shrink-0 overflow-hidden bg-zinc-800">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={title}
            onError={() => setImgError(true)}
            className="h-48 sm:h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-48 sm:h-full sm:min-h-[220px] w-full flex-col items-center justify-center gap-2">
            <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-[11px] text-zinc-600">No image</span>
          </div>
        )}

        {/* Rank Badge */}
        {rank && (
          <div className="absolute top-2 left-2 rounded bg-violet-600/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
            #{rank}
          </div>
        )}

        {/* Bottom gradient — stronger on mobile (landscape image) */}
        <div className="absolute bottom-0 inset-x-0 h-16 sm:h-12 bg-gradient-to-t from-zinc-900/90 to-transparent" />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2.5 p-4 min-w-0">

        {/* Title + Score */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm sm:text-base font-semibold leading-snug text-white line-clamp-2">
            {title}
          </h3>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-zinc-800 px-2.5 py-1 border border-zinc-700/50">
            <StarIcon />
            <span className="text-xs font-semibold text-amber-300">
              {typeof score === "number" ? score.toFixed(2) : score}
            </span>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1.5">
          {/* Show max 3 on mobile, 5 on larger screens */}
          {genres?.slice(0, 5).map((genre, i) => (
            <span
              key={genre.name}
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${genreStyle(genre.name)} ${i >= 3 ? "hidden sm:inline-flex" : ""}`}
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Synopsis — 2 lines on mobile, 3 on sm+ */}
        <p className="text-xs leading-relaxed text-zinc-400 line-clamp-2 sm:line-clamp-3">
          {synopsis}
        </p>

        {/* Meta */}
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
          <div className="flex items-center gap-1.5">
            <EpisodeIcon />
            <span className="text-[11px] text-zinc-500">Eps</span>
            <span className="text-xs font-semibold text-zinc-300">{episodes ?? "—"}</span>
          </div>

          <div className="h-3 w-px bg-zinc-700 hidden sm:block" />

          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-[11px] text-zinc-500">Status</span>
            <span className={`text-xs font-semibold ${status === "Airing" || status === "Currently Airing" ? "text-emerald-400" : "text-zinc-300"}`}>
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindAnimeCard;
