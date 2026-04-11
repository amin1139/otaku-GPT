import { Search, Store } from "lucide-react";
import { useRef, useState } from "react";
import groq from "../utils/ai";
import { useDispatch } from "react-redux";
import { findAnimeList, findAnimeLoading } from "../utils/findGptSlice";

const SearchBar = () => {
  const [searchBtnDisbale, setSearchBtnDisable] = useState(false)
  const search = useRef(null);
  const dispatch = useDispatch()

  const handleSearchBtn = async () => {
  if (!search.current?.value.trim()) return
  setSearchBtnDisable(true)
  dispatch(findAnimeLoading(true))
  try {
    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [
        { role: 'system', content: 'You are an anime suggesting assistant. Give only 5 anime names separated by commas, nothing else.' },
        { role: 'user', content: search.current.value }
      ]
    })
    const animeList = response.choices[0].message.content.split(",").map(name => name.trim());

    // fetch data from jikan

    const results = [];
    for (let i = 0; i < animeList.length; i++) {
      if (i > 0) await new Promise((r) => setTimeout(r, 400));
      const jikanRes = await fetch(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(animeList[i])}&limit=1`,
      );
      const jikanData = await jikanRes.json();
      const anime = jikanData.data?.[0];
      if (anime) results.push(anime);      
    }
    dispatch(findAnimeList(results))
  } catch (err) {
    console.error(err)
  } finally{
    setSearchBtnDisable(false)
    dispatch(findAnimeLoading(false))
  }
}

  return (
    <div className="relative w-full max-w-2xl z-10">
      {/* Glow behind input */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-20 blur-xl pointer-events-none"
        style={{ background: "linear-gradient(90deg, #1d4ed8, #E50914)" }}
      />

      <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-white/20 transition-colors duration-300">
        <Search className="w-5 h-5 text-white/30 ml-4 flex-shrink-0" />

        <input
          ref={search}
          className="flex-1 bg-transparent text-white placeholder-white/25 px-4 py-4 text-sm md:text-base outline-none"
          type="text"
          placeholder="e.g. a dark anime like Death Note with mind games..."
        />

        <button
          disabled={searchBtnDisbale}
          onClick={handleSearchBtn}
          className="m-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: "linear-gradient(135deg, #E50914, #b91c1c)" }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
