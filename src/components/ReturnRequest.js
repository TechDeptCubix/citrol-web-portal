import React from "react";
import BackgroundImage from "./BackgroundImage";
import "../css/ReturnRequest.css";
import { useState } from "react";
import SuccessPopup from "./SuccessPopup";

function ReturnRequest() {
  const [popupTextState, setPopupTextState] = useState("");
  const [showSuccessComponent, setShowSuccessComponent] = useState(false);

  const showHideSuccessPopup = (textPopup) => {
    setPopupTextState(textPopup);
    setShowSuccessComponent(!showSuccessComponent);
  };

  return (
    <div>
      <div className="ReturnRequest-main-container">
        <h4>Return Request</h4>

        <hr className="ReturnRequest-divider" />

        <div className="ReturnRequest-inner-container">
          <div className="ReturnRequest-left-container">
            <div className="ReturnRequest-label-value-container">
              <label>Order No.</label>
              <span className="ReturnRequest-label-value-colon">:</span>
              <span className="ReturnRequest-label-value">1960</span>
            </div>
            <div className="ReturnRequest-label-value-container">
              <label>Reference</label>
              <span className="ReturnRequest-label-value-colon">:</span>
              <span className="ReturnRequest-label-value">By Ajas</span>
            </div>
            <div className="ReturnRequest-label-value-container">
              <label>Sales Return For</label>
              <span className="ReturnRequest-label-value-colon">:</span>
              <span className="ReturnRequest-label-value">234</span>
            </div>
          </div>

          <div className="ReturnRequest-right-container">
            <div className="ReturnRequest-label-value-container">
              <label>Date &amp; Time</label>
              <span className="ReturnRequest-label-value-colon">:</span>
              <span className="ReturnRequest-label-value">
                11/05/2021 9:05:45
              </span>
            </div>

            <div className="ReturnRequest-label-value-container">
              <label>Enter your Remarks</label>
              <span className="ReturnRequest-label-value-colon">:</span>
              <input name="remarks" type="text" />
            </div>
          </div>
        </div>

        <table className="ReturnRequest-table">
          <thead>
            <tr>
              <th>Sl.No.</th>
              <th>Part Number</th>
              <th>Description</th>
              <th>Invoice Qty</th>
              <th>Return Qty</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{1}</td>
              <td>{1632}</td>
              <td>{"HIGH SENSE ABS SENSORS"}</td>
              <td>{"20"}</td>
              <td>
                <input type="text" name="quantity" />
              </td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>{2}</td>
              <td>{"PQP0612552"}</td>
              <td>{"Ultra Break pad"}</td>
              <td>{"10"}</td>
              <td>
                <input type="text" name="quantity" />
              </td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
          </tbody>
        </table>
        <BackgroundImage />
      </div>

      <div className="ReturnRequest-button-container">
        <button
          className="ReturnRequest-button"
          onClick={() => showHideSuccessPopup("Drafted Request")}
        >
          Draft Request
        </button>{" "}
        <span>Or </span>
        <button
          className="ReturnRequest-button"
          onClick={() => showHideSuccessPopup("Request Send")}
        >
          Sent Request
        </button>
      </div>

      {showSuccessComponent && (
        <SuccessPopup
          popupDetail={popupTextState}
          showHideSuccessPopup={showHideSuccessPopup}
        />
      )}
    </div>
  );
}

export default ReturnRequest;
