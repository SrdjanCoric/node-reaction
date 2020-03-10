import React from "react";

const CardDescription = props => {
  return (
    <form className="description">
      <p>Description</p>
      {props.showForm ? null : (
        <span
          id="description-edit"
          className="link"
          onClick={props.onEditClick}
        >
          Edit
        </span>
      )}
      {props.showForm ? (
        <div>
          <textarea
            className="textarea-toggle"
            rows="1"
            value={props.description}
            autoFocus={true}
            onChange={props.onDescriptionChange}
          ></textarea>
          <div>
            <div
              className="button"
              value="Save"
              onClick={props.onSaveDescription}
            >
              Save
            </div>
            <i className="x-icon icon" onClick={props.onCloseEditClick}></i>
          </div>
        </div>
      ) : (
        <p className="textarea-overlay">{props.description}</p>
      )}
    </form>
  );
};

export default CardDescription;
