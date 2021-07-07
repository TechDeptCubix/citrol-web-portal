import React from "react";
import "../css/ViewReturnRequest.css";
import BackgroundImage from "./BackgroundImage";

function ViewReturnRequest() {
  return (
    <div>
      <div className="ViewReturnRequest-main-container">
        <h4>View Return Request</h4>

        <hr className="ViewReturnRequest-divider" />

        <div className="ViewReturnRequest-inner-container">
          <div className="ViewReturnRequest-left-container">
            <div className="ViewReturnRequest-label-value-container">
              <label>Order No.</label>
              <span className="ViewReturnRequest-label-value-colon">:</span>
              <span className="ViewReturnRequest-label-value">1960</span>
            </div>
            <div className="ViewReturnRequest-label-value-container">
              <label>Reference</label>
              <span className="ViewReturnRequest-label-value-colon">:</span>
              <span className="ViewReturnRequest-label-value">By Ajas</span>
            </div>
            <div className="ViewReturnRequest-label-value-container">
              <label>Sales Return For</label>
              <span className="ViewReturnRequest-label-value-colon">:</span>
              <span className="ViewReturnRequest-label-value">234</span>
            </div>
            <div className="ViewReturnRequest-label-value-container">
              <label>Your Remarks</label>
              <span className="ViewReturnRequest-label-value-colon">:</span>
              <span className="ViewReturnRequest-label-value">
                Urgent Requirement
              </span>
            </div>
          </div>

          <div className="ViewReturnRequest-right-container">
            <div className="ViewReturnRequest-label-value-container">
              <label>Date & Time</label>
              <span className="ViewReturnRequest-label-value-colon">:</span>
              <span className="ViewReturnRequest-label-value">
                11/05/2021 9:05:45
              </span>
            </div>
          </div>
        </div>
        <BackgroundImage />
      </div>

      <div className="ViewReturnRequest-table-container">
        <table className="ViewReturnRequest-table">
          <thead>
            <tr>
              <th>Sl.No.</th>
              <th>Part Number</th>
              <th>Description</th>
              <th>Invoice Qty</th>
              <th>Return Qty</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{1}</td>
              <td>{1632}</td>
              <td>{"HIGH SENSE ABS SENSORS"}</td>
              <td>{"20"}</td>
              <td>{"20"}</td>
            </tr>
            <tr>
              <td>{2}</td>
              <td>{"PQP0612552"}</td>
              <td>{"Ultra Break pad"}</td>
              <td>{"10"}</td>
              <td>{"10"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewReturnRequest;
