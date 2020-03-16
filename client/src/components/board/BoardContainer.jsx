import React from "react";
import { connect } from "react-redux";
import * as boardActions from "../../actions/BoardActions";
import Board from "./Board";
import { Redirect } from "react-router-dom";
import * as userActions from "../../actions/UserActions";

const mapStateToProps = (state, ownProps) => {
  let boardId;
  let card;
  const { url } = ownProps.match;
  if (url.match(new RegExp("^/boards/"))) {
    boardId = ownProps.match.params.id;
  } else {
    card = state.cards.find(card => card._id === ownProps.match.params.id);
    if (card) {
      boardId = card.boardId;
    } else {
      boardId = null;
    }
  }
  if (boardId) {
    return {
      board: state.boards.find(board => board._id === boardId),
      card: card,
      boardId: boardId,
      user: state.user,
      loading: state.loading
    };
  } else {
    return {
      board: null,
      card: card,
      boardId: boardId,
      user: state.user,
      loading: state.loading
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBoard: (token, boardId, callback) => {
      dispatch(boardActions.fetchBoard(token, boardId, callback));
    },
    onFetchUser: token => {
      dispatch(userActions.fetchUser(token));
    }
  };
};

class BoardContainer extends React.Component {
  componentDidMount() {
    let token = sessionStorage.getItem("jwtToken");
    this.props.onFetchUser(token);
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.user.isLoggedIn !== this.props.user.isLoggedIn &&
      !this.props.user.isLoggedIn
    ) {
      let token = sessionStorage.getItem("jwtToken");
      this.props.onFetchUser(token);
    }
  }
  render() {
    if (this.props.user.invalidUser) {
      return <Redirect to="/" />;
    } else if (this.props.user.isLoggedIn) {
      return (
        <Board
          board={this.props.board}
          card={this.props.card}
          boardId={this.props.boardId}
          user={this.props.user}
          loading={this.props.loading}
          match={this.props.match}
          onFetchBoard={this.props.onFetchBoard}
        />
      );
    } else {
      return null;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
