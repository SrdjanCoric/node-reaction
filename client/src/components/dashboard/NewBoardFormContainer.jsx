import React from "react";
import { connect } from "react-redux";
import NewBoardForm from "./NewBoardForm";
import * as actions from "../../actions/BoardActions";

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (token, newBoard, callback) => {
      dispatch(actions.createBoard(token, newBoard));
      callback();
    }
  };
};

class NewBoardFormContainer extends React.Component {
  state = {
    title: ""
  };

  handleTextChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const newBoard = { title: this.state.title };

    this.props.onSubmit(localStorage.getItem("jwtToken"), newBoard, () => {
      this.setState({
        title: ""
      });
      this.props.onCloseClick(new Event("click"));
    });
  };

  render() {
    return (
      <NewBoardForm
        onCloseClick={this.props.onCloseClick}
        onTextChange={this.handleTextChange}
        onSubmit={this.handleSubmit}
        title={this.state.title}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBoardFormContainer);
