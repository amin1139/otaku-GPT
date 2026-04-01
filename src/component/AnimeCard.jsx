const AnimeCard = ({ anime }) => {
  return (
    <div className="anime-card">
      <img src={anime.image} alt={anime.title} />
      <h3>{anime.title}</h3>
      <p>{anime.description}</p>
    </div>
  );
};

export default AnimeCard;