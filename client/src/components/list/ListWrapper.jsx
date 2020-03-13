import React from "react";
import ListCardsContainer from "./ListCardsContainer";
import EditableListTitleContainer from "./EditableListTitleContainer";
import ToggleableAddCardContainer from "./ToggleableAddCardContainer";

class ListWrapper extends React.Component {
  state = {
    openedAddCard: false
  };

  handleAddCardClick = () => {
    this.setState({
      openedAddCard: true
    });
  };

  handleAddCardClose = () => {
    this.setState({
      openedAddCard: false
    });
  };

  render() {
    const classList = this.state.openedAddCard
      ? "list-wrapper add-dropdown-active"
      : "list-wrapper";
    return (
      <div
        className={classList}
        data-list-id={this.props._id}
        onDrop={this.props.onDrop}
      >
        <div className="list-background">
          <div className="list">
            <a className="more-icon sm-icon" href=""></a>
            <EditableListTitleContainer
              listId={this.props._id}
              title={this.props.title}
            />
            <div className="add-dropdown add-top">
              <div className="card"></div>
              <a className="button">Add</a>
              <i className="x-icon icon"></i>
              <div className="add-options">
                <span>...</span>
              </div>
            </div>
            <ListCardsContainer listId={this.props._id} />
            <ToggleableAddCardContainer
              listId={this.props._id}
              openedAddCard={this.state.openedAddCard}
              onAddCardClick={this.handleAddCardClick}
              onAddCardClose={this.handleAddCardClose}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ListWrapper;
