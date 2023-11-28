import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Search from "../components/Search";

import logo from "../media/logo.png";
import useGoogleSearch from "../useGoogleSearch";

import "./SearchPage.css";
// import Response from "../response";

function SearchPage() {
  const [{ term }, dispatch] = useStateValue();

  // LIVE API CALL
  const { data } = useGoogleSearch(term);

  // MOCK API CALL
  //   const data = Response;
  //   console.log(data);

  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link className="searchPage__logo" to="/MFI">
          <img src={logo} alt="Your Logo" className="logo" />
        </Link>
        <div className="searchPage__headerBody">
          <Search hideButtons />
        </div>
      </div>

      {term && (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            About {data?.result_qdrant.length} results
          </p>

          {data?.result_qdrant.map((item) => (
            <div className="searchPage__result">
              <a className="searchPage__resultTitle" href={item.link}>
                <h2>{item.La_loi}</h2>
              </a>

              {/* <a className="searchPage__resultLink" href={item.link}>
                {item.pagemap?.cse_thumbnail?.length > 0 &&
                  item.pagemap?.cse_thumbnail[0]?.src && (
                    <img
                      className="searchPage__resultImage"
                      src={item.pagemap?.cse_thumbnail[0]?.src}
                      alt=""
                    />
                  )}
                {item.displayLink}
              </a> */}

              <p className="searchPage__resultSnippet">{item.Paragraphe}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
