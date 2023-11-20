import axios from "axios";
import React, { useState } from "react";
import { Audio } from "react-loader-spinner";
import "./App.css";

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
  // return <div className="loading-indicator">Loading...</div>;
}

function SearchResult({ result }) {
  console.log(result);
  return (
    <div className="result-container">
      <div className="intelligent-response">
        <h2>Réponse Intelligente</h2>
        <p>{result.result_openai}</p>
      </div>
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
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSearch = async () => {
    try {
      setLoading(true); // Set loading to true when starting the request

      const response = await axios.post(
        "https://e010-102-78-175-52.ngrok-free.app/chat",
        {
          messages: [{ role: "user", content: query }],
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false when the request is completed
    }
  };

  return (
    <div className="app-container">
      <div className="search-container">
        <h1>Moteur de recherche MFI</h1>
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
      {loading && <LoadingIndicator />}{" "}
      {/* Display loading indicator when loading */}
      {results && <SearchResult result={results} />}
      {!results && !loading && (
        <div className="initial-message">
          <p>Entrez votre requête pour commencer la recherche.</p>
        </div>
      )}
    </div>
  );
}

export default App;
