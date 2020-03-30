import React from "react";
import BoardHeader from "./BoardHeader";
import ListContainer from "./ListContainer";

class Board extends React.Component {
  componentDidMount() {
    let boardId;
    const { url } = this.props.match;
    if (url.match(new RegExp("^/boards/"))) {
      boardId = this.props.match.params.id;
    } else {
      if (this.props.card) {
        boardId = this.props.card.boardId;
      } else {
        boardId = null;
      }
    }
    if (!boardId) return null;
    this.props.onFetchBoard(localStorage.getItem("jwtToken"), boardId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.boardId !== prevProps.boardId && this.props.boardId) {
      this.props.onFetchBoard(
        localStorage.getItem("jwtToken"),
        this.props.boardId
      );
    }
  }
  render() {
    if (this.props.board) {
      return (
        <div>
          <BoardHeader title={this.props.board.title} />
          <main>
            <ListContainer boardId={this.props.board._id} />
          </main>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Board;
