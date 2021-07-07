import React from "react";
import "../css/ViewOrder.css";
import BackgroundImage from "./BackgroundImage";
import icDownloadToExcel from "../img/ic_download_to_excel.png";

function ViewOrder() {
  return (
    <div>
      <div className="ViewOrder-main-container">
        <h4>View Order</h4>

        <hr className="ViewOrder-divider" />

        <div className="ViewOrder-inner-container">
          <div className="ViewOrder-left-container">
            <div className="ViewOrder-label-value-container">
              <label>Order No.</label>
              <span className="ViewOrder-label-value-colon">:</span>
              <span className="ViewOrder-label-value">1960</span>
            </div>
            <div className="ViewOrder-label-value-container">
              <label>Reference</label>
              <span className="ViewOrder-label-value-colon">:</span>
              <span className="ViewOrder-label-value">By Ajas</span>
            </div>
            <div className="ViewOrder-label-value-container">
              <label>Your Remarks</label>
              <span className="ViewOrder-label-value-colon">:</span>
              <span className="ViewOrder-label-value">Urgent Requirement</span>
            </div>
          </div>

          <div className="ViewOrder-right-container">
            <div className="ViewOrder-label-value-container">
              <label>Date &amp; Time</label>
              <span className="ViewOrder-label-value-colon">:</span>
              <span className="ViewOrder-label-value">11/05/2021 9:05:45</span>
            </div>
          </div>
        </div>

        <div className="ViewOrder-excel-button-container">
          <button className="ViewOrder-excel-button">
            <img src={icDownloadToExcel} alt="placeholder" />{" "}
            <span>Download To Excel</span>
          </button>
        </div>

        <table className="ViewOrder-table">
          <thead>
            <tr>
              <th rowspan="2">Sl.No.</th>
              <th rowspan="2">Part Number</th>
              <th rowspan="2">Description</th>
              <th rowspan="2">Qty Req</th>
              <th colspan="2" className="ViewOrder-Qty-Avl-Col">
                Qty Avl
              </th>
              <th rowspan="2">Order Qty</th>
              <th rowspan="2">Unit Amount</th>
              <th rowspan="2">Amount</th>
              <th rowspan="2">VAT</th>
              <th rowspan="2">Net Amount</th>
            </tr>
            <tr className="ViewOrder-Qty-Avl-Row">
              <th className="ViewOrder-Qty-Avl-Col-Head-First ">
                <span>WH</span>
              </th>
              <th className="ViewOrder-Qty-Avl-Col-Head">
                <span>Branch</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{1}</td>
              <td>{1632}</td>
              <td>{"HIGH SENSE ABS SENSORS"}</td>
              <td>{"20"}</td>
              <td className="ViewOrder-Qty-Avl-Col">{"5"}</td>
              <td className="ViewOrder-Qty-Avl-Col">{"15"}</td>
              <td>{"2"}</td>
              <td>{"140"}</td>
              <td>{"280"}</td>
              <td>{"14"}</td>
              <td>{"294"}</td>
            </tr>
            <tr>
              <td>{2}</td>
              <td>{"PQP0612552"}</td>
              <td>{"Ultra Break pad"}</td>
              <td>{"10"}</td>
              <td className="ViewOrder-Qty-Avl-Col">{"3"}</td>
              <td className="ViewOrder-Qty-Avl-Col">{"2"}</td>
              <td>{"3"}</td>
              <td>{"12"}</td>
              <td>{"120"}</td>
              <td>{"6"}</td>
              <td>{"126"}</td>
            </tr>
            <tr>
              <td>{3}</td>
              <td>{1632}</td>
              <td>{"HIGH SENSE ABS SENSORS"}</td>
              <td>{"20"}</td>
              <td className="ViewOrder-Qty-Avl-Col">{"5"}</td>
              <td className="ViewOrder-Qty-Avl-Col">{"15"}</td>
              <td>{"2"}</td>
              <td>{"140"}</td>
              <td>{"280"}</td>
              <td>{"14"}</td>
              <td>{"294"}</td>
            </tr>
            <tr>
              <td>{4}</td>
              <td>{"PQP0612552"}</td>
              <td>{"Ultra Break pad"}</td>
              <td>{"10"}</td>
              <td className="ViewOrder-Qty-Avl-Col">{"3"}</td>
              <td className="ViewOrder-Qty-Avl-Col">{"2"}</td>
              <td>{"3"}</td>
              <td>{"12"}</td>
              <td>{"120"}</td>
              <td>{"6"}</td>
              <td>{"126"}</td>
            </tr>{" "}
          </tbody>
        </table>

        <BackgroundImage />
      </div>
    </div>
  );
}

export default ViewOrder;
