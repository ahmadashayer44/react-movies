import "./App.css";
import Movie from "./Movie";
import * as React from "react";
import { useState, useEffect } from "react";
function App() {
  const [action, setAction] = useState(true);
  const [adventure, setAdventure] = useState(false);
  const [horror, setHorror] = useState(false);
  const [actionMovies, setActionMovies] = useState([]);
  const [adventureMovies, setAdventureMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);

  useEffect(() => {
    let imdbIds = [
      "tt0816692",
      "tt0167261",
      "tt0434409",
      "tt1877830",
      "tt10160976",
      "tt7366338",
      "tt2911666",
      "tt0468569",
      "tt22687790",
      ,
      "tt7462410",
      "tt0482571",
      "tt1345836",
      "tt7286456",
    ];
    const imdbIds2 = [
      "tt7431994",
      "tt6051216",
      "tt3565486",
      "tt23334464",
      "tt14779804",
      "tt4320258",
      "tt1795096",
    ];
    const imdbIds3 = [
      "tt0075143",
      "tt2063241",
      "tt3084150",
      "tt3109706",
      "tt3109682",
      "tt3109692",
      "tt9077108",
      "tt4588194",
    ];
    const fetchMovieDetails = async (imdbId) => {
      const apiKey = "94b116e0";
      const apiUrl = `https://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const movieData = await response.json();
        return movieData;
      } catch (error) {
        console.error(
          `Error fetching data for IMDb ID ${imdbId}: ${error.message}`
        );
        return null;
      }
    };

    const fetchAllMovies = async (imdbIds) => {
      const allMovieDetails = [];

      for (const imdbId of imdbIds) {
        const movieData = await fetchMovieDetails(imdbId);
        if (movieData) {
          allMovieDetails.push(movieData);
        }
      }

      return allMovieDetails;
    };
    fetchAllMovies(imdbIds)
      .then((movies) => {
        let arr = [];
        for (const movie of movies) {
          arr.push(<Movie movie={movie} />);
        }
        setActionMovies(arr);
      })

      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
    fetchAllMovies(imdbIds2)
      .then((movies) => {
        let arr = [];
        for (const movie of movies) {
          arr.push(<Movie movie={movie} />);
        }
        setAdventureMovies(arr);
      })

      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
    fetchAllMovies(imdbIds3)
      .then((movies) => {
        let arr = [];
        for (const movie of movies) {
          arr.push(<Movie movie={movie} />);
        }
        setHorrorMovies(arr);
      })

      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 id="siteHeader">Movie Studio</h1>
        <div id="navBar">
          <button
            style={
              horror
                ? { backgroundColor: "white", color: "black" }
                : { backgroundColor: "black", color: "white" }
            }
            onClick={() => {
              setAction(false);
              setAdventure(false);
              setHorror(true);
            }}
          >
            Horror
          </button>
          <button
            style={
              action
                ? { backgroundColor: "white", color: "black" }
                : { backgroundColor: "black", color: "white" }
            }
            onClick={() => {
              setAction(true);
              setAdventure(false);
              setHorror(false);
            }}
          >
            Action
          </button>
          <button
            style={
              adventure
                ? { backgroundColor: "white", color: "black" }
                : { backgroundColor: "black", color: "white" }
            }
            onClick={() => {
              setAction(false);
              setAdventure(true);
              setHorror(false);
            }}
          >
            Adventure
          </button>
        </div>
        <div id="moviesBody">
          {action ? actionMovies : adventure ? adventureMovies : horrorMovies}
        </div>
      </header>
    </div>
  );
}

export default App;
