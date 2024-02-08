import React from "react";
import "./movies.css";

const Movie = ({ movie }) => {
  return (
    <div className="movieContainer">
      <h2 className="movieTitle">{movie.Title}</h2>
      <img className="moviePoster" src={movie.Poster} alt={movie.Title} />
    </div>
  );
};

export default Movie;
