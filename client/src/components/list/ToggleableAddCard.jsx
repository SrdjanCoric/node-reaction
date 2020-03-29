import React from "react";

class ToggleableAddCard extends React.Component {
  state = {
    title: ""
  };

  handleTitleChange = e => {
    e.preventDefault();
    e.stopPropagation();
    let title = e.target.value;

    this.setState({
      title: title
    });
  };

  handleAddCardClose = () => {
    this.setState({
      title: ""
    });
    this.props.onAddCardClose();
  };

  handleAddCard = e => {
    e.preventDefault();
    this.props.onAddCard(this.state.title, () => {
      this.setState({
        title: ""
      });
    });

    this.props.onAddCardClose();
  };
  render() {
    const cardClass = ["add-dropdown", "add-bottom"];
    if (this.props.openedAddCard) {
      cardClass.push("active-card");
    }
    return (
      <React.Fragment>
        <div className={cardClass.join(" ")}>
          <div className="card">
            <div className="card-info"></div>
            <textarea
              onChange={this.handleTitleChange}
              value={this.state.title}
              name="add-card"
            ></textarea>
            <div className="members"></div>
          </div>
          <a className="button" onClick={this.handleAddCard}>
            Add
          </a>
          <i className="x-icon icon" onClick={this.handleAddCardClose}></i>
          <div className="add-options">
            <span>...</span>
          </div>
        </div>
        <div
          onClick={() => this.props.onAddCardClick(this.props.listId)}
          className="add-card-toggle"
          data-position="bottom"
        >
          Add a card...
        </div>
      </React.Fragment>
    );
  }
}

export default ToggleableAddCard;
