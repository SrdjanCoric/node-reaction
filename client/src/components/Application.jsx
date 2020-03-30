import React from "react";
import { Route, Redirect } from "react-router-dom";
import TopNav from "./shared/TopNav";
import BoardContainer from "./board/BoardContainer";
import CardModalContainer from "./card/CardModalContainer";
import UISection from "./ui/UISection";
import AllBoards from "./ui/AllBoards";
import CardArchived from "./ui/CardArchived";
import CardEditingDescription from "./ui/CardEditingDescription";
import Card from "./ui/Card";
import CopyCardPopover from "./ui/CopyCardPopover";
import CreateBoard from "./ui/CreateBoard";
import DueDatePopover from "./ui/DueDatePopover";
import LabelsPopover from "./ui/LabelsPopover";
import MoveCardPopover from "./ui/MoveCardPopover";
import SingleBoard from "./ui/SingleBoard";
import SignupContainer from "./user/SignupContainer";
import LoginContainer from "./user/LoginContainer";
import BoardsDashboardContainer from "./dashboard/BoardsDashboardContainer";
import AuthRoute from "./shared/AuthRoute";
import { clearStorage, checkAuth } from "../utils/helpers";

class Application extends React.Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    if (checkAuth()) {
      return;
    }
    this.props.onLogout();
  }

  componentDidUpdate(prevProps) {
    let logoutTimer;

    if (
      prevProps.isLoggedIn !== this.props.isLoggedIn &&
      this.props.isLoggedIn
    ) {
      logoutTimer = setTimeout(this.props.onLogout, 30 * 1000);
      this.setState({ redirect: true });
    } else if (
      prevProps.isLoggedIn !== this.props.isLoggedIn &&
      !this.props.isLoggedIn
    ) {
      this.setState({ redirect: false });
    } else if (!this.props.token) {
      clearTimeout(logoutTimer);
    }
  }
  render() {
    if (!this.props.isLoggedIn && this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <TopNav user={this.props.user} loading={this.props.loading} />
        <Route path="/login" exact component={LoginContainer} />
        <AuthRoute exact path="/" component={BoardsDashboardContainer} />
        <AuthRoute
          exact
          path="/(boards|cards)/:id"
          component={BoardContainer}
        />
        <AuthRoute exact path="/cards/:id" component={CardModalContainer} />
        <Route
          path="/signup"
          render={() => <SignupContainer user={this.props.user} />}
        />
        <Route path="/ui" exact component={UISection} />
        <Route path="/ui/allBoards" component={AllBoards} />
        <Route path="/ui/cardArchived" component={CardArchived} />
        <Route
          path="/ui/cardEditingDescription"
          component={CardEditingDescription}
        />
        <Route path="/ui/card" component={Card} />
        <Route path="/ui/copyCardPopover" component={CopyCardPopover} />
        <Route path="/ui/createBoard" component={CreateBoard} />
        <Route path="/ui/dueDatePopover" component={DueDatePopover} />
        <Route path="/ui/labelsPopover" component={LabelsPopover} />
        <Route path="/ui/moveCardPopover" component={MoveCardPopover} />
        <Route path="/ui/singleBoard" component={SingleBoard} />
      </div>
    );
  }
}

export default Application;
