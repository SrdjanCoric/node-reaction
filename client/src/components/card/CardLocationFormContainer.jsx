import React from "react";
import { connect } from "react-redux";
import CardLocationForm from "./CardLocationForm";
import * as listSelectors from "../../selectors/ListSelectors";
import * as cardSelectors from "../../selectors/CardSelectors";
import { fetchBoards, fetchBoard } from "../../actions/BoardActions";

const sortByTitle = (a, b) => {
  const aTitle = a.title.toLowerCase();
  const bTitle = b.title.toLowerCase();

  if (aTitle < bTitle) return -1;
  if (aTitle > bTitle) return 1;
  return 0;
};

const mapStateToProps = (state, ownProps) => {
  return {
    boards: state.boards.sort(sortByTitle),
    lists: listSelectors
      .boardListsSelector(state, ownProps.card.boardId)
      .sort(sortByTitle),
    cards: cardSelectors
      .listCards(state, ownProps.card.listId)
      .sort((a, b) => a.position - b.position),
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBoards: callback => {
      dispatch(fetchBoards(callback));
    },
    onFetchBoard: (id, callback) => {
      dispatch(fetchBoard(id, callback));
    }
  };
};

class CardLocationFormContainer extends React.Component {
  state = {
    selectedBoard: undefined,
    selectedList: undefined,
    boards: [],
    lists: [],
    positions: [],
    selectedPosition: undefined
  };

  componentDidMount() {
    this.props.onFetchBoards();
    this.setState(
      {
        selectedBoard: this.props.boards.find(board => {
          return board._id === this.props.card.boardId;
        }),
        selectedPosition: this.currentCardPositionIndex(),
        boards: this.props.boards,
        lists: this.props.lists
      },
      () => {
        this.selectList(this.props.card.listId);
      }
    );
  }

  currentCardPositionIndex = () => {
    const cards = this.props.cards;
    let currentPosition = cards.findIndex(
      card => card._id === this.props.card._id
    );
    if (currentPosition === -1) currentPosition = undefined;

    return currentPosition;
  };

  handleBoardChange = e => {
    const selectedValue = Number(e.target.value);

    this.selectBoard(selectedValue);
  };

  handleListChange = e => {
    const selectedValue = Number(e.target.value);

    this.selectList(selectedValue);
  };

  selectBoard = id => {
    this.props.onFetchBoard(id, board => {
      const newLists = board.lists.sort(sortByTitle);
      this.setState(
        {
          selectedBoard: board,
          lists: newLists
        },
        () => {
          if (this.state.selectedBoard.id === this.props.card.boardId) {
            this.selectList(this.props.card.listId);
          } else if (newLists.length) {
            this.selectList(newLists[0]._id);
          } else {
            this.selectList();
          }
        }
      );
    });
  };

  handlePositionChange = e => {
    const selectedValue = +e.target.value;

    this.selectPosition(selectedValue);
  };

  selectPosition = position => {
    if (position === "bottom") {
      position = this.state.positions[this.state.positions.length - 1];
    }

    if (position != null) {
      this.setState(
        {
          selectedPosition: position
        },
        () => {
          this.props.onLocationChange({
            boardId: this.state.selectedBoard && this.state.selectedBoard._id,
            listId: this.state.selectedList && this.state.selectedList._id,
            position: this.state.selectedPosition
          });
        }
      );
    } else {
      this.setState(
        {
          selectedPosition: this.state.positions[0]
        },
        () => {
          this.props.onLocationChange({
            boardId: this.state.selectedBoard && this.state.selectedBoard._id,
            listId: this.state.selectedList && this.state.selectedList._id,
            position: this.state.selectedPosition
          });
        }
      );
    }
  };

  selectList = id => {
    let list;
    const positions = [];
    if (id) {
      list = this.state.lists.find(list => list._id === id);
    } else {
      list = this.state.lists[0];
    }

    if (list) {
      const cards = cardSelectors
        .listCards(this.props.state, list._id)
        .sort((a, b) => a.position - b.position);
      let currentPosition = cards.findIndex(
        card => card._id === this.props.card._id
      );
      if (currentPosition === -1) currentPosition = undefined;

      let potentialPositionsLength;

      if (currentPosition == undefined || this.props.mode === "copy") {
        potentialPositionsLength = cards.length + 1;
      } else {
        potentialPositionsLength = cards.length;
      }

      for (let i = 0; i < potentialPositionsLength; i++) {
        positions.push(i);
      }
    }

    this.setState(
      {
        selectedList: list,
        positions
      },
      () => {
        if (
          this.state.selectedBoard._id === this.props.card.boardId &&
          this.state.selectedList._id === this.props.card.listId &&
          this.props.mode !== "copy"
        ) {
          this.selectPosition(this.currentCardPositionIndex());
        } else {
          this.selectPosition("bottom");
        }
      }
    );
  };

  selectedPositionHumanIndex = () => {
    if (this.state.selectedPosition == null) {
      return "N/A";
    } else {
      return this.state.selectedPosition + 1;
    }
  };

  selectedBoardTitle = () => {
    if (this.state.selectedBoard) {
      return this.state.selectedBoard.title;
    } else {
      return "No Boards";
    }
  };

  selectedBoardId = () => {
    if (this.state.selectedBoard) {
      return this.state.selectedBoard.id;
    } else {
      return undefined;
    }
  };

  selectedListTitle = () => {
    if (this.state.selectedList) {
      return this.state.selectedList.title;
    } else {
      return "No Lists";
    }
  };

  selectedListId = () => {
    if (this.state.selectedList) {
      return this.state.selectedList._id;
    } else {
      return undefined;
    }
  };

  isSubmitDisabled = () => {
    return (
      this.state.selectedBoard == null ||
      this.state.selectedList == null ||
      this.state.selectedPosition == null
    );
  };

  render() {
    return (
      <CardLocationForm
        boards={this.state.boards}
        lists={this.state.lists}
        positions={this.state.positions}
        selectedBoardId={this.selectedBoardId()}
        selectedBoardTitle={this.selectedBoardTitle()}
        selectedListId={this.selectedListId()}
        selectedListTitle={this.selectedListTitle()}
        selectedPosition={this.state.selectedPosition}
        currentPosition={this.currentCardPositionIndex()}
        selectedPositionHumanIndex={this.selectedPositionHumanIndex()}
        onPositionChange={this.handlePositionChange}
        currentBoardId={this.props.card.boardId}
        currentListId={this.props.card.listId}
        onBoardChange={this.handleBoardChange}
        onListChange={this.handleListChange}
        isSubmitDisabled={this.isSubmitDisabled()}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardLocationFormContainer);
