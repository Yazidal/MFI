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
// function SearchResult({ result }) {
//   return (
//     <div className="result-container">
//       <div className="other-responses">
//         {result.result_qdrant?.map((res, index) => (
//           <div key={index} className="response-item">
//             <h3>
//               <b>Titre de loi:</b> {res.La_loi}
//             </h3>
//             {/* <p>
//               <b>Score:</b> {res.Score}
//             </p> */}
//             <p>
//               <b>Paragraphe:</b> {res.Paragraphe}
//             </p>
//             <p>
//               <b>Collection:</b> {res.collection}
//             </p>
//             <a href={res.source} target="_blank" rel="noopener noreferrer">
//               En savoir plus
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
function SearchResult({ result }) {
  // Sort the results by Score in ascending order
  const sortedResults = result.result_qdrant?.sort((a, b) => b.Score - a.Score);

  return (
    <div className="result-container">
      <div className="other-responses">
        {sortedResults?.map((res, index) => (
          <div key={index} className="response-item">
            <h3>
              <b>Titre de loi:</b> {res.titre}
            </h3>
            {/* <p>
              <b>Score:</b> {res.Score}
            </p> */}
            <p>
              <b>Paragraphe:</b> {res.Paragraphe}
            </p>
            <p>
              <b>Collection:</b> {res.collection}
            </p>
            <p>
              <b>Référence:</b> {res.La_loi}
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

      const response = await axios.post(
        "https://aymanemalih-qdrant-flask.hf.space/chat",
        {
          messages: [{ role: "user", content: query }],
        }
      );
      console.log("response: ", response);

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

// import React from "react";
// import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
// // import "./App.css";
// import Home from "./pages/Home";
// import SearchPage from "./pages/SearchPage";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Switch>
//           <Route path="/MFI/search">
//             <SearchPage />
//           </Route>
//           <Route path="/MFI">
//             <Home />
//           </Route>
//         </Switch>
//       </Router>
//     </div>
//   );
// }

// export default App;
