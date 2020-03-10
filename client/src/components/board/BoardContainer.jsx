import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/BoardActions";
import * as boardSelectors from "../../selectors/BoardSelectors";
import Board from "./Board";

const mapStateToProps = (state, ownProps) => {
  let boardId = +ownProps.match.params.id;
  return {
    board: boardSelectors.getBoardById(state, boardId)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFetchBoard: () => {
      let boardId = +ownProps.match.params.id;
      dispatch(actions.fetchBoard(boardId));
    }
  };
};

class BoardContainer extends React.Component {
  componentDidMount() {
    this.props.onFetchBoard();
  }

  render() {
    if (this.props.board) {
      return <Board board={this.props.board} />;
    } else {
      return null;
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer);
