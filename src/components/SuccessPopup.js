import React from "react";
import ic_success from "../img/ic_success.png";
import "../css/SuccessPopup.css";
import { Link } from "react-router-dom";

function SuccessPopup(props) {
  const { showHideSuccessPopup, popupDetail } = props;

  return (
    <div className="SuccessPopup-main-background">
      <div className="SuccessPopup-container-background">
        <div className="SuccessPopup-image-text-container">
          <img src={ic_success} alt="placeholder" />
          <span>SUCCESS</span>
        </div>

        <div className="SuccessPopup-details-text-container">
          <span>{popupDetail}</span>
        </div>

        <div className="SuccessPopup-button-container">
          <Link to="/home" className="SuccessPopup-go-back-button">
            {" "}
            BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessPopup;
