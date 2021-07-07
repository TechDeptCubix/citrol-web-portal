import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function ProtectedRoute({ component: Component, ...rest }) {
  const { state } = useContext(AppContext);

  let isLocalStorageKeyCreated;

  let previousStateOfLogin = JSON.parse(
    localStorage.getItem("currentSatusLog")
  );

  if (previousStateOfLogin) {
    isLocalStorageKeyCreated = previousStateOfLogin.isAdminLoggedIn;
  } else {
    isLocalStorageKeyCreated = false;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLocalStorageKeyCreated || state.isAdminLoggedIn) {
          console.log("Route success  local", isLocalStorageKeyCreated);
          console.log(
            "Route success  loginContextState",
            state.isAdminLoggedIn
          );
          return <Component />;
        } else {
          console.log("Route failure  local", isLocalStorageKeyCreated);
          console.log(
            "Route failure  loginContextState",
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
