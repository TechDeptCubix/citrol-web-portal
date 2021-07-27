import React, { createContext, Component } from "react";

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    isAdminLoggedIn: false,
    companyCode: "",
    userName: "",
  };

  componentDidMount() {
    ////console.log("our cookie in AppContext " + document.cookie);
    if (document.cookie.length != 0) {
      let previousStateOfLogin = JSON.parse(this.getCookie("citrolLoggedIn"));
      ////console.log("our cookie login state in App Context ",previousStateOfLogin);
      if (previousStateOfLogin.isAdminLoggedIn) {
        this.setState(previousStateOfLogin);
      }
    } else {
      //console.log("Cookie not available");
    }
  }
  componentDidUpdate() {
    //console.log("component DidUpdate AppContext");
  }
  componentWillUnmount() {
    //console.log("component WillUnmount ");
  }

  changeAdminLoginStatus = (loginStatus) => {
    //console.log("changeAdminLoginStatus from Login.js is ", loginStatus);

    document.cookie =
      "citrolLoggedIn=" +
      JSON.stringify({
        isAdminLoggedIn: loginStatus,
      });

    this.setState({ isAdminLoggedIn: loginStatus });
  };

  changeCompanyCodeStatus = (companyCodeStatus) => {
    //console.log("called changeCompanyCodeStatus");

    this.setState((prevState) => ({
      // object that we want to update
      ...prevState, // keep all other key-value pairs
      companyCode: companyCodeStatus, // update the value of specific key
    }));
  };

  changeUserNameStatus = (userNameStatus) => {
    //console.log("called changeCompanyCodeStatus");

    this.setState((prevState) => ({
      // object that we want to update
      ...prevState, // keep all other key-value pairs
      userName: userNameStatus, // update the value of specific key
    }));
  };

  getCookie = (n) => {
    let a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
    return a ? a[1] : "";
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
