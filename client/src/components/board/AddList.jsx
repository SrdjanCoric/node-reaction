import React from "react";

const AddList = props => {
  let classes = ["new-list"];

  if (props.showForm) {
    classes.push("selected");
  }
  return (
    <div
      id="new-list"
      className={classes.join(" ")}
      onClick={props.onInputClick}
    >
      <span>Add a list...</span>
      <input
        type="text"
        placeholder="Add a list..."
        name="title"
        value={props.title}
        onChange={props.onInputChange}
      />
      <div>
        <input
          type="submit"
          className="button"
          value="Save"
          onClick={props.onSubmit}
        />
        <i type="button" className="x-icon icon" onClick={props.onClose}></i>
      </div>
    </div>
  );
};

export default AddList;
