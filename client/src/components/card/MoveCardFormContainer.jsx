import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import MoveCardForm from "./MoveCardForm";
import calculatePosition from "../../lib/PositionCalculator";
import * as actions from "../../actions/CardActions";
import * as cardSelectors from "../../selectors/CardSelectors";

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateCard: (cardId, card, callback) => {
      dispatch(actions.updateCard(cardId, card, callback));
    }
  };
};

class MoveCardFormContainer extends Component {
  state = {
    location: {
      boardId: undefined,
      listId: undefined,
      position: undefined
    }
  };

  handleLocationChange = location => {
    this.setState({ location });
  };

  handleSubmit = e => {
    if (this.isSubmitDisabled()) {
      return;
    }

    e.preventDefault();

    const { boardId, listId, position } = this.state.location;
    const listCards = cardSelectors.listCards(
      this.props.state,
      listId,
      (a, b) => {
        return a.position - b.position;
      }
    );

    const sourceBoardId = this.props.card.boardId;
    const changingBoard = boardId !== sourceBoardId;

    const currentIndex = listCards.findIndex(
      card => card._id === this.props.card._id
    );

    this.props.onUpdateCard(
      this.props.card._id,
      {
        listId: listId,
        position: calculatePosition(listCards, position, currentIndex)
      },
      () => {
        if (changingBoard) {
          this.props.history.push(`/boards/${sourceBoardId}`);
        } else {
          this.props.onClose(new Event("click"));
        }
      }
    );
  };

  isSubmitDisabled = () => {
    const { boardId, listId, position } = this.state.location;

    return boardId == null || listId == null || position == null;
  };
  render() {
    return (
      <MoveCardForm
        card={this.props.card}
        onCloseClick={this.props.onClose}
        onLocationChange={this.handleLocationChange}
        onSubmit={this.handleSubmit}
        isSubmitDisabled={this.isSubmitDisabled()}
      />
    );
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MoveCardFormContainer);
