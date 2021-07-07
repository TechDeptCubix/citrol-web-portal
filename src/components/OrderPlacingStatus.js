import React from "react";
import "../css/OrderPlacingStatus.css";
import BackgroundImage from "./BackgroundImage";
import icDownloadToExcel from "../img/ic_download_to_excel.png";
import ic_success from "../img/ic_success.png";
import ic_download_to_pdf from "../img/ic_download_to_pdf.png";
import ic_printer from "../img/ic_printer.png";
import { Link } from "react-router-dom";

function OrderPlacingStatus() {
  return (
    <div>
      <div className="OrderPlacingStatus-main-container">
        <h4 className="OrderPlacingStatus-main-container-h4">Order Status</h4>

        <div className="OrderPlacingStatus-inner-container">
          <div className="OrderPlacingStatus-left-container">
            <div className="OrderPlacingStatus-left-container-order-success">
              <img alt="placeholder" src={ic_success} />
              <span>Order Created</span>
            </div>
          </div>

          <div className="OrderPlacingStatus-right-container">
            <div className="OrderPlacingStatus-label-value-container">
              <label>Order No.</label>
              <span className="OrderPlacingStatus-label-value-colon">:</span>
              <span className="OrderPlacingStatus-label-value">1960</span>
            </div>

            <div className="OrderPlacingStatus-label-value-container">
              <label>Date &amp; Time</label>
              <span className="OrderPlacingStatus-label-value-colon">:</span>
              <span className="OrderPlacingStatus-label-value">
                11/05/2021 9:05:45
              </span>
            </div>

            <div className="OrderPlacingStatus-label-value-container">
              <label>Reference</label>
              <span className="OrderPlacingStatus-label-value-colon">:</span>
              <span className="OrderPlacingStatus-label-value">By Ajas</span>
            </div>

            <div className="OrderPlacingStatus-label-value-container">
              <label>Remarks</label>
              <span className="OrderPlacingStatus-label-value-colon">:</span>
              <span className="OrderPlacingStatus-label-value">
                Urgent Requirement
              </span>
            </div>
          </div>
        </div>

        <table className="OrderPlacingStatus-table">
          <thead>
            <tr>
              <th>Order No.</th>
              <th>Order Status</th>
              <th>Credit Status</th>
              <th>Blocked Status</th>
              <th>Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{1445}</td>
              <td>{"Being Processed"}</td>
              <td>{"Approved"}</td>
              <td>{"Not Blocked"}</td>
              <td>{"Not Delivered"}</td>
            </tr>
          </tbody>
        </table>

        <div className="OrderPlacingStatus-excel-button-container">
          <button className="OrderPlacingStatus-excel-button">
            <img alt="placeholder" src={ic_printer} /> <span>Print</span>
          </button>
          <button className="OrderPlacingStatus-excel-button">
            <img alt="placeholder" src={icDownloadToExcel} />{" "}
            <span>Download To Excel</span>
          </button>
          <button className="OrderPlacingStatus-excel-button">
            <img alt="placeholder" src={ic_download_to_pdf} />{" "}
            <span>Download To PDF</span>
          </button>
        </div>

        <Link to="/home" className="OrderPlacingStatus-go-back-button">
          {" "}
          BACK TO HOME
        </Link>

        <BackgroundImage />
      </div>
    </div>
  );
}

export default OrderPlacingStatus;
