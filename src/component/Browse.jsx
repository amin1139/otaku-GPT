import { useEffect, useState } from "react";
import useAnimePromo from "../hooks/useAnimePromo";
import { useSelector } from "react-redux";
import { Store } from "lucide-react";
import PromoVideo from "./PromoVideo";

const Browse = () => {
  const {loading, error } = useAnimePromo();
  const promo = useSelector((store) => store.anime.promo)
  if(promo === null) return
  console.log(promo);

  return (
    <div
      className="w-full min-h-screen"
      style={{ background: "linear-gradient(to right, #000000, #152331)" }}
    >
      <PromoVideo src={promo?.trailer?.embed_url} title={promo?.entry?.title}/>
    </div>
  );
};

export default Browse;
