import { useRouteError, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const [glitch, setGlitch] = useState(false);
  const [dots, setDots] = useState("");

  const statusCode = error?.status || 404;
  const statusText = error?.statusText || "Page Not Found";

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center overflow-hidden relative font-mono">

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,59,59,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,59,59,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          animation: "gridMove 20s linear infinite",
        }}
      />

      {/* Red glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #ff3b3b, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #ff6b3b, transparent)" }} />

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)",
        }}
      />

      {/* Main card */}
      <div className="relative z-10 text-center px-8 max-w-2xl w-full">

        {/* Status code with glitch effect */}
        <div className="relative mb-2 select-none">
          <h1
            className="text-[10rem] leading-none font-black tracking-tighter"
            style={{
              color: glitch ? "transparent" : "#ff3b3b",
              textShadow: glitch
                ? "3px 0 #ff6b3b, -3px 0 #ff003b"
                : "0 0 40px rgba(255,59,59,0.5), 0 0 80px rgba(255,59,59,0.2)",
              transition: "all 0.05s",
              WebkitTextStroke: glitch ? "2px #ff6b3b" : "0px transparent",
            }}
          >
            {statusCode}
          </h1>

          {/* Ghost duplicate for glitch */}
          {glitch && (
            <h1
              className="absolute inset-0 text-[10rem] leading-none font-black tracking-tighter"
              style={{
                color: "#00ffcc",
                opacity: 0.4,
                transform: "translate(-4px, 2px)",
              }}
            >
              {statusCode}
            </h1>
          )}
        </div>

        {/* Divider line */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-linear-to-r from-transparent to-red-500 opacity-50" />
          <span className="text-red-500 text-xs tracking-widest uppercase opacity-70">
            System Error
          </span>
          <div className="flex-1 h-px bg-linear-to-l from-transparent to-red-500 opacity-50" />
        </div>

        {/* Error message */}
        <p
          className="text-2xl font-bold mb-4 tracking-wide"
          style={{ color: "#ff8c8c" }}
        >
          {statusText}
        </p>

        {/* Terminal-style error detail */}
        <div
          className="rounded-lg p-4 mb-10 text-left border text-sm"
          style={{
            background: "rgba(255,59,59,0.05)",
            borderColor: "rgba(255,59,59,0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
            <span className="text-xs ml-2 opacity-40 text-gray-400">terminal</span>
          </div>
          <p className="text-red-400 opacity-70">
            <span className="text-gray-500">$ </span>
            route.resolve({" "}
            <span className="text-orange-400">
              "{window?.location?.pathname || "/unknown"}"
            </span>{" "}
            )
          </p>
          <p className="text-red-500 mt-1">
            ✗ Error:{" "}
            {error?.message || "The requested route could not be resolved."}
          </p>
          <p className="text-gray-500 mt-1 flex items-center gap-1">
            <span className="text-green-500">→</span> Awaiting user input{dots}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="group px-8 py-3 rounded-lg text-sm font-bold tracking-widest uppercase border transition-all duration-300 cursor-pointer"
            style={{
              borderColor: "rgba(255,59,59,0.4)",
              color: "#ff8c8c",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,59,59,0.1)";
              e.currentTarget.style.borderColor = "rgba(255,59,59,0.8)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255,59,59,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255,59,59,0.4)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ← Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-lg text-sm font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #ff3b3b, #ff6b3b)",
              color: "#0a0a0f",
              boxShadow: "0 0 30px rgba(255,59,59,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 50px rgba(255,59,59,0.7)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 30px rgba(255,59,59,0.4)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            ⌂ Home
          </button>
        </div>

        {/* Footer */}
        <p className="mt-12 text-xs tracking-widest opacity-20 text-gray-400 uppercase">
          React Router · Error Boundary
        </p>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: perspective(500px) rotateX(5deg) translateY(0); }
          100% { transform: perspective(500px) rotateX(5deg) translateY(60px); }
        }
      `}</style>
    </div>
  );
}