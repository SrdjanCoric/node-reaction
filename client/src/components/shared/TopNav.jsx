import React from "react";
import { Link } from "react-router-dom";

const TopNav = props => (
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
    {props.loggedIn ? (
      <ul className="user-info">
        <li className="create-icon icon"></li>
        <li className="split-button-1">VR</li>
        <li className="split-button-2">Victor Reyes</li>
        <li className="info-icon icon"></li>
        <li className="notifications-icon icon"></li>
      </ul>
    ) : (
      <ul className="login-nav">
        <li>
          <Link to="/">Log in</Link>
        </li>

        <li>
          {" "}
          <Link to="/signUp">Sign Up</Link>
        </li>
      </ul>
    )}
  </nav>
);

export default TopNav;
