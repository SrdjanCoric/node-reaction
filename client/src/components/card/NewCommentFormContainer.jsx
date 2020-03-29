import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/CommentActions";
import NewCommentForm from "./NewCommentForm";

const mapDispatchToProps = (dispatch, ownProps) => {
  let token = localStorage.getItem("jwtToken");
  return {
    onSubmit: (text, callback) => {
      dispatch(actions.createComment(token, ownProps.cardId, text, callback));
    }
  };
};

class NewCommentFormContainer extends Component {
  state = {
    comment: "",
    isSaving: false
  };

  handleChange = e => {
    this.setState({ comment: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ isSaving: true });

    this.props.onSubmit(this.state.comment, () => {
      this.setState({
        comment: "",
        isSaving: false
      });
    });
  };

  render() {
    return (
      <NewCommentForm
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        comment={this.state.comment}
      />
    );
  }
}

export default connect(null, mapDispatchToProps)(NewCommentFormContainer);
