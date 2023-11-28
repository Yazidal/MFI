import React from "react";
import Search from "../components/Search";
import "./Home.css";
// import { Link } from "react-router-dom";
import logo from "../media/logo.png";

function Home() {
  return (
    <div className="home">
      <div className="home__body">
        <div className="logo-container">
          <img src={logo} alt="Your Logo" className="logo" />
        </div>
        <div className="home_inputContainer">
          <Search />
        </div>
      </div>
    </div>
  );
}

export default Home;
