import React from "react";
import CardDescription from "./CardDescription";

class CardDescriptionContainer extends React.Component {
  state = {
    description: this.props.description || "",
    showForm: false
  };

  handleCloseEditClick = () => {
    this.setState({ showForm: false, description: this.props.description });
  };

  handleSaveDescription = () => {
    this.props.onUpdateCard(
      localStorage.getItem("jwtToken"),
      this.props.card._id,
      {
        description: this.state.description
      },
      () => {
        this.setState({ showForm: false });
      }
    );
  };

  handleDescriptionChange = e => {
    let newDescription = e.target.value;
    this.setState({ description: newDescription });
  };

  handleEditClick = () => {
    this.setState({ showForm: true });
  };

  render() {
    return (
      <CardDescription
        description={this.state.description}
        showForm={this.state.showForm}
        onEditClick={this.handleEditClick}
        onCloseEditClick={this.handleCloseEditClick}
        onDescriptionChange={this.handleDescriptionChange}
        onSaveDescription={this.handleSaveDescription}
      />
    );
  }
}

export default CardDescriptionContainer;
