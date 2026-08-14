import React from "react";

function GenreFilter({ genres }) {
  const handleGenreClick = (genre) => {
    console.log("Selected genre:", genre);
  };

  return (
    <div className="genre-filter">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => handleGenreClick(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;