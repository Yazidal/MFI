import axios from "axios";
import React, { useState } from "react";
import { Audio } from "react-loader-spinner";
import "./App.css";

import logo from "./media/logo.png";

function LoadingIndicator() {
  return (
    <Audio
      height="80"
      width="80"
      radius="9"
      color="green"
      ariaLabel="loading"
      wrapperStyle
      wrapperClass
    />
  );
}
function SearchResult({ result }) {
  console.log(result);
  return (
    <div className="result-container">
      {/* Intelligent response section */}
      <div className="intelligent-response">
        <h2>Réponse Intelligente</h2>
        <p>{result.result_openai}</p>
      </div>

      {/* Other responses section */}
      <div className="other-responses">
        <h2>Autres Réponses</h2>
        {result.result_qdrant?.map((res, index) => (
          <div key={index} className="response-item">
            <h3>
              <b>Titre de loi: </b>
              {res.La_loi}
            </h3>
            <p>
              <b>Score: </b>
              {res.Score}
            </p>
            <p>
              <b>Paragraphe: </b>
              {res.Paragraphe}
            </p>
            <p>
              <b>Collection: </b>
              {res.collection}
            </p>
            <a href={res.source} target="_blank" rel="noopener noreferrer">
              En savoir plus
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      // Your API call remains unchanged
      const response = await axios.post("https://your-api-endpoint.com", {
        messages: [{ role: "user", content: query }],
      });

      setResults(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Logo section */}
      <div className="logo-container">
        <img src={logo} alt="Your Logo" className="logo" />
      </div>

      {/* Search container */}
      <div className="search-container">
        {/* Improved search bar with merged input and button */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Recherchez ici..."
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Chercher
          </button>
        </div>
      </div>

      {/* Loading indicator */}
      {loading && <Audio height="80" width="80" color="green" />}

      {/* Display search results */}
      {results && <SearchResult result={results} />}

      {/* Initial message */}
      {!results && !loading && (
        <div className="initial-message">
          <p>Entrez votre requête pour commencer la recherche.</p>
        </div>
      )}
    </div>
  );
}

export default App;
