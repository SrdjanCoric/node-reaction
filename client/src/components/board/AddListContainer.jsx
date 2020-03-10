import React from "react";
import { connect } from "react-redux";
import AddList from "./AddList";
import * as actions from "../../actions/ListActions";

const mapDispatchToProps = (dispatch, ownProps) => {
  let boardId = ownProps.boardId;
  return {
    onSubmit: title => {
      try {
        dispatch(actions.createList(boardId, title));
      } catch (e) {
        console.error(e);
      }
    }
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
    this.props.onSubmit(this.state.title);
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

export default connect(null, mapDispatchToProps)(AddListContainer);
