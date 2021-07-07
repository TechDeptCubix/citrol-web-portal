import React, { createContext, Component } from "react";

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    isAdminLoggedIn: false,
    companyCode: "",
    userName: "",
  };

  componentDidMount() {
    let currentLocalValues = localStorage.getItem("currentSatusLog");
    if (currentLocalValues) {
      let previousStateOfLogin = JSON.parse(
        localStorage.getItem("currentSatusLog")
      );

      console.log(
        "component DiD mount previous state ",
        previousStateOfLogin.isAdminLoggedIn
      );

      //if previously logged in and didnt logged out then go to home
      // currently goes to home even if browser closed and came back or page refreshed
      // remove this snippet if we want this (ie end session on browser close or page refresh)
      if (previousStateOfLogin.isAdminLoggedIn) {
        this.setState(previousStateOfLogin);
      }
    } else {
      console.log("currentLocalValues null ");
    }
  }
  componentDidUpdate() {
    console.log("component DidUpdate AppContext");
  }
  componentWillUnmount() {
    console.log("component WillUnmount ");
  }

  changeAdminLoginStatus = (loginStatus) => {
    console.log("changeAdminLoginStatus from Login.js is ", loginStatus);

    localStorage.setItem(
      "currentSatusLog",
      JSON.stringify({ isAdminLoggedIn: loginStatus })
    );
    this.setState({ isAdminLoggedIn: loginStatus });
  };

  changeCompanyCodeStatus = (companyCodeStatus) => {
    console.log("called changeCompanyCodeStatus");
    //this.setState({ companyCode: companyCodeStatus });
    this.setState((prevState) => ({
      // object that we want to update
      ...prevState, // keep all other key-value pairs
      companyCode: companyCodeStatus, // update the value of specific key
    }));
  };

  changeUserNameStatus = (userNameStatus) => {
    console.log("called changeCompanyCodeStatus");
    //this.setState({ companyCode: companyCodeStatus });
    this.setState((prevState) => ({
      // object that we want to update
      ...prevState, // keep all other key-value pairs
      userName: userNameStatus, // update the value of specific key
    }));
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          changeAdminLoginStatus: this.changeAdminLoginStatus,
          changeCompanyCodeStatus: this.changeCompanyCodeStatus,
          changeUserNameStatus: this.changeUserNameStatus,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
