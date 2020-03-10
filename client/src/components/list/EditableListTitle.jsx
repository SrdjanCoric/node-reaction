import React from "react";

class EditableListTitle extends React.Component {
  state = {
    title: this.props.title || "",
    editing: false
  };

  handleTitleClick = () => {
    this.setState({ editing: !this.state.editing });
  };

  handleTitleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  };

  handleTitleUpdate = e => {
    this.props.onTitleUpdate(this.state.title);
    this.setState({ editing: false });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  render() {
    return (
      <div>
        {this.state.editing ? (
          <input
            type="text"
            name="title"
            className="list-title"
            value={this.state.title}
            onKeyPress={this.handleKeyPress}
            onBlur={this.handleTitleUpdate}
            onChange={this.handleTitleChange}
          />
        ) : (
          <p className="list-title" onClick={this.handleTitleClick}>
            {this.state.title}
          </p>
        )}
      </div>
    );
  }
}

export default EditableListTitle;
