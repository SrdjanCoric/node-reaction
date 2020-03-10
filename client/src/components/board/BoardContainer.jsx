import { connect } from "react-redux";
import * as actions from "../../actions/BoardActions";
import Board from "./Board";

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
      boardId: boardId
    };
  } else {
    return {
      board: null,
      card: card,
      boardId: boardId
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBoard: (boardId, callback) => {
      dispatch(actions.fetchBoard(boardId, callback));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
