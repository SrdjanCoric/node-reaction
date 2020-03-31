import React from "react";
import { Link } from "react-router-dom";

const TopNav = props => {
  const createAbbreviation = fullName => {
    return fullName
      .split(" ")
      .map(name => name[0].toUpperCase())
      .join("");
  };

  let nav;
  if (props.isLoggedIn) {
    nav = (
      <ul className="user-info">
        <li className="create-icon icon"></li>
        <li className="split-button-1">
          {createAbbreviation(props.user.fullName)}
        </li>
        <li className="split-button-2">{props.user.fullName}</li>
        <li className="login-nav split-button-2">
          <Link to="/login" onClick={props.onLogout}>
            Log out
          </Link>
        </li>
      </ul>
    );
  } else {
    nav = (
      <ul className="login-nav">
        <li>
          <Link to="/">Log in</Link>
        </li>

        <li>
          {" "}
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    );
  }
  return (
    <nav>
      <ul>
        <li className="boards trello-icon icon">
          <Link to={"/"}>
            <span className="under-link">Boards</span>
          </Link>
        </li>
        <li className="search-container">
          <div className="search search-icon icon"></div>
          <div className="active-search">
            <div>
              <input type="text" />
            </div>
            <i className="x-icon icon"></i>
            <i className="goto-icon icon"></i>
          </div>
        </li>
      </ul>
      <h1>Trello</h1>
      {nav}
    </nav>
  );
};

export default TopNav;
