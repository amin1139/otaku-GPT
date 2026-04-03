import React, { useState, useEffect } from "react";

function buildYouTubeUrl(raw) {
  if (!raw) return null;
  const match = raw.match(/\/embed\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  const id = match[1];
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    controls: "0",
    rel: "0",
    modestbranding: "1",
    playlist: id, // required for loop
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
}

const PromoVideo = ({ src, title, description }) => {
  const cleanSrc = buildYouTubeUrl(src);
  const [ready, setReady] = useState(false);
  console.log(src);
  

  // Fade the iframe in after a short delay
  // (YouTube iframe fires no reliable load event cross-origin)
  useEffect(() => {
    if (!cleanSrc) return;
    const t = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(t);
  }, [cleanSrc]);

  return (
    <div className="relative w-full overflow-hidden bg-black h-[50svh] min-h-[300px] md:h-[min(100svh,780px)] md:min-h-[420px]">

      {/* ── YouTube iframe ── */}
      {cleanSrc && (
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ opacity: ready ? 1 : 0, transition: "opacity 1s ease" }}
        >
          <iframe
            className="absolute top-1/2 left-1/2 pointer-events-none border-0"
            style={{
              transform: "translate(-50%, -50%)",
              width: "177.78vh",   /* 16/9 × 100vh */
              height: "56.25vw",   /* 9/16 × 100vw */
              minWidth: "100%",
              minHeight: "100%",
            }}
            src={cleanSrc}
            title="Promo Video"
            allow="autoplay; fullscreen"
          />
        </div>
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(0,0,0,.85) 0%, rgba(0,0,0,.5) 50%, rgba(0,0,0,.1) 100%),
            linear-gradient(to top,   rgba(0,0,0,.7)  0%, transparent 45%),
            linear-gradient(to bottom,rgba(0,0,0,.3)  0%, transparent 30%)
          `,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 bottom-30 flex items-end h-full px-6 pb-14 md:px-14 lg:px-20">
        <div className="text-white max-w-lg w-full">

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 drop-shadow-lg">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-sm md:text-base text-white/75 font-light leading-relaxed mb-6 max-w-md line-clamp-3">
              {description}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">

            {/* Play Now */}
            <button className="flex items-center gap-2 bg-white hover:bg-white/90 text-black font-semibold px-5 py-2.5 md:px-7 md:py-3 rounded-md text-sm md:text-base transition-all active:scale-95 shadow-lg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              Play Now
            </button>

            {/* More Info */}
            <button className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/25 text-white font-medium px-5 py-2.5 md:px-7 md:py-3 rounded-md text-sm md:text-base transition-all active:scale-95">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="8" strokeWidth="3" />
                <line x1="12" y1="12" x2="12" y2="16" />
              </svg>
              More Info
            </button>

          </div>
        </div>
      </div>

    </div>
  );
};

export default PromoVideo;