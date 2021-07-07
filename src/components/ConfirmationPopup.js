import React from "react";
import ic_success from "../img/ic_success.png";
import "../css/SuccessPopup.css";

function ConfirmationPopup(props) {
  const { showHideConfirmationPopup, confirmedSentEnquiry, popupDetail } =
    props;

  return (
    <div className="SuccessPopup-main-background">
      <div className="SuccessPopup-container-background">
        <div className="SuccessPopup-image-text-container">
          <span>{popupDetail}</span>
        </div>

        <div className="SuccessPopup-details-text-container">
          <span>Are you sure?</span>
        </div>

        <div className="SuccessPopup-button-container">
          <button
            className="SuccessPopup-go-back-button SuccessPopup-ok-button"
            onClick={showHideConfirmationPopup}
          >
            Cancel
          </button>
          <button
            className="SuccessPopup-go-back-button"
            onClick={confirmedSentEnquiry}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
