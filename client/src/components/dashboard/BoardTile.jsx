import React from "react";

import { Link } from "react-router-dom";

const BoardTile = props => (
  <li className="board-tile">
    <Link to={`/boards/${props._id}`}>
      <span className="board-title">{props.title}</span>
    </Link>
  </li>
);

export default BoardTile;
