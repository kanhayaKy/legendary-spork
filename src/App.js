import "./App.css";
import { useState } from "react";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const API_KEY = "";

  const onSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onSearchClick = () => {
    let url =
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=` +
      searchQuery +
      "&key=" +
      API_KEY;
    fetch(url)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setSearchResults(jsonResponse.items);
      });

    setSearchResults([]);
  };

  return (
    <div className="App">
      <div className="searchBar">
        <input
          name="searchInput"
          value={searchQuery}
          onChange={onSearchInputChange}
        />
        <button onClick={onSearchClick}>Search</button>
      </div>

      <div className="searchResults">
        {searchResults.map((video) => (
          <div className="videoCard">
            <img
              alt="Vido thumbnail"
              src={video?.snippet?.thumbnails?.default?.url}
            />
            <p>{video?.snippet?.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
