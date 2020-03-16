import React from "react";
import { connect } from "react-redux";
import AddList from "./AddList";
import * as actions from "../../actions/ListActions";
import calculatePosition from "../../lib/PositionCalculator";

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

const mergeStateToProps = (stateProps, dispatchProps, ownProps) => {
  let boardId = ownProps.boardId;
  let listsFromBoard = stateProps.state.lists.filter(
    list => list.boardId === boardId
  );
  let targetPosition = listsFromBoard.length;
  let position = calculatePosition(listsFromBoard, targetPosition);
  return {
    onSubmit: (token, title) => {
      try {
        dispatchProps.dispatch(
          actions.createList(token, boardId, title, position)
        );
      } catch (e) {
        console.error(e);
      }
    },
    user: stateProps.state.user,
    ...ownProps
  };
};

class AddListContainer extends React.Component {
  state = {
    title: "",
    showForm: false
  };
  handleInputChange = e => {
    e.stopPropagation();
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  };

  handleInputClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showForm: true });
  };

  handleClose = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showForm: false });
  };

  handleSubmit = e => {
    e.stopPropagation();
    e.preventDefault();
    this.props.onSubmit(this.props.user.token, this.state.title);
    this.handleClose(e);
    this.setState({ title: "" });
  };
  render() {
    return (
      <AddList
        onSubmit={this.handleSubmit}
        onClose={this.handleClose}
        onInputClick={this.handleInputClick}
        onInputChange={this.handleInputChange}
        showForm={this.state.showForm}
        title={this.state.title}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeStateToProps
)(AddListContainer);
