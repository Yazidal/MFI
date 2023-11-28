import Button from "@material-ui/core/Button";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Search.css";

import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

function Search({ hideButtons = false }) {
  const [{}, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const history = useHistory();

  const search = (e) => {
    e.preventDefault();

    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      term: input,
    });

    history.push("/MFI/search");
  };

  return (
    <form className="search">
      <div className="search__input">
        <SearchIcon className="search__inputIcon" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search the web"
        />
      </div>
      {!hideButtons ? (
        <div className="search__buttons">
          <Button onClick={search} type="submit" variant="outlined">
            MFI search engine <KeyboardArrowRightIcon />
          </Button>
        </div>
      ) : (
        <div className="search__buttons">
          <Button
            onClick={search}
            className="search__buttonsHidden"
            type="submit"
            variant="outlined"
          >
            MFI search engine <KeyboardArrowRightIcon />
          </Button>
        </div>
      )}
    </form>
  );
}

export default Search;
