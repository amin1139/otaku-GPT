const AnimeCard = ({anime }) => {

  return (
    <div className="group relative w-52 flex-shrink-0 cursor-pointer">
      {/* Card Image Wrapper */}
      <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-lg shadow-black/50">
        {/* Poster Image */}
        <img
          src={anime?.images?.jpg?.large_image_url}
          alt={anime.title_english}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        {/* Score Badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <svg className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-yellow-400 text-xs font-bold">{anime.score}</span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-xl">
            <svg className="w-6 h-6 text-white fill-white ml-1" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Episodes tag on hover */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
          <span className="text-[11px] text-white/80 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
            {anime?.episodes} {"eps"}
          </span>
        </div>
      </div>

      {/* Text Below Card */}
      <div className="mt-2 px-0.5">
        <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#E50914] transition-colors duration-200">
          {anime?.title_english}
        </h3>
        <p className="text-zinc-500 text-xs mt-0.5 truncate">{anime?.genres.map(genre => genre.name).join(', ')}</p>
      </div>

      {/* Bottom red accent line on hover */}
      <div className="absolute -bottom-0 left-0 h-0.5 w-0 bg-[#E50914] rounded-full group-hover:w-full transition-all duration-300 ease-out" />
    </div>
  );
};

export default AnimeCard;