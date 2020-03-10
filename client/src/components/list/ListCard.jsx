import React from "react";
import { Link } from "react-router-dom";

const ListCard = ({ _id, title, labels, description }) => {
  return (
    <Link to={`/cards/${_id}`} data-card-id={_id}>
      <div className="card-background">
        <div className="card ">
          <i className="edit-toggle edit-icon sm-icon"></i>
          <div className="card-info">
            {labels
              ? labels.map((label, idx) => (
                  <div
                    key={idx}
                    className={`card-label ${label} colorblindable`}
                  ></div>
                ))
              : null}
            <p>{title}</p>
          </div>
          <div className="card-icons">
            {description ? <i className="description-icon sm-icon"></i> : null}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListCard;
