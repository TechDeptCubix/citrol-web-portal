import React, { useContext } from "react";
import "../css/LogoutPopup.css";
import { AppContext } from "../context/AppContext";
import { useHistory } from "react-router-dom";

function LogoutPopup(props) {
  const { showLogoutPopup } = props;
  const history = useHistory();

  const { state, changeAdminLoginStatus } = useContext(AppContext);

  if (state.isAdminLoggedIn) {
    console.log("if - Admin is logged in ");
  } else {
    console.log("Logged out Admin, go to Login ");
    history.push("/");
  }

  const logoutAdmin = () => {
    console.log("inside logoutAdmin");
    showLogoutPopup(false);
    localStorage.setItem(
      "currentSatusLog",
      JSON.stringify({ isAdminLoggedIn: false })
    );
    changeAdminLoginStatus(false);
  };

  return (
    <div className="LogoutPopup-main-background">
      <div className="LogoutPopup-container-background">
        <div className="LogoutPopup-image-text-container">
          <span>Log Out</span>
          <p>Are you sure?</p>
        </div>
        <div className="LogoutPopup-buttonContainer">
          <button
            className="LogoutPopup-go-back-button LogoutPopup-cancel-button"
            onClick={() => showLogoutPopup(false)}
          >
            Cancel
          </button>
          <button className="LogoutPopup-go-back-button" onClick={logoutAdmin}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPopup;
