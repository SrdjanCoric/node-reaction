import React from "react";
import BoardsDashboardContainer from "../dashboard/BoardsDashboardContainer";
import Login from "./Login";

const AuthLayer = props => {
  const mainPageComponent = props.isLoggedIn ? (
    <BoardsDashboardContainer />
  ) : (
    <Login />
  );
  return mainPageComponent;
};

export default AuthLayer;
