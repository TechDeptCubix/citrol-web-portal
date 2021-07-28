import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function ProtectedRoute({ component: Component, ...rest }) {
  const { state } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (state.isAdminLoggedIn) {
          console.log(
            "ProtectedRoute Route success  loginContextState",
            state.isAdminLoggedIn
          );
          return <Component />;
        } else {
          console.log(
            "ProtectedRoute Route failure  loginContextState",
            state.isAdminLoggedIn
          );
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
