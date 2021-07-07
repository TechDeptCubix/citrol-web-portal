import React, { useEffect, useState } from "react";
import "../css/ViewEnquiry.css";
import BackgroundImage from "./BackgroundImage";
import icDownloadToExcel from "../img/ic_download_to_excel.png";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ViewEnquiry() {
  const location = useLocation();
  const dataFromEnquiry = location.state;
  const [initialViewValues, setInitialViewValues] = useState({
    reference: "",
    remarks: "",
    dateTime: "",
    orderNo: "",
    table_row_values: [],
  });

  console.log("data from enquiry ", dataFromEnquiry);

  useEffect(() => {
    const apiUrl = `http://185.140.249.224:26/api/Enquiry/${dataFromEnquiry.enquiryNumber}/${dataFromEnquiry.companyCodeForView}`;
    axios
      .get(apiUrl)
      .then((res) => {
        console.log("ViewEnquiry API response success ", res.data);
        setInitialViewValues({
          ...initialViewValues,
          reference: res.data[0].ord_H_ref,
          remarks: res.data[0].ord_H_remarks,
          dateTime: res.data[0].ord_H_datetime,
          orderNo: res.data[0].ord_H_no,
          table_row_values: res.data,
        });
      })
      .catch((e) => {
        console.log("ViewEnquiry API response error ", e);
      });
  }, []);

  return (
    <div>
      <div className="ViewEnquiry-main-container">
        <h4>View Enquiry</h4>

        <hr className="ViewEnquiry-divider" />

        <div className="ViewEnquiry-inner-container">
          <div className="ViewEnquiry-left-container">
            <div className="ViewEnquiry-label-value-container">
              <label>Order No.</label>
              <span className="ViewEnquiry-label-value-colon">:</span>
              <span className="ViewEnquiry-label-value">
                {initialViewValues.orderNo}
              </span>
            </div>
            <div className="ViewEnquiry-label-value-container">
              <label>Reference</label>
              <span className="ViewEnquiry-label-value-colon">:</span>
              <span className="ViewEnquiry-label-value">
                {initialViewValues.reference}
              </span>
            </div>
            <div className="ViewEnquiry-label-value-container">
              <label>Your Remarks</label>
              <span className="ViewEnquiry-label-value-colon">:</span>
              <span className="ViewEnquiry-label-value">
                {initialViewValues.remarks}
              </span>
            </div>
          </div>

          <div className="ViewEnquiry-right-container">
            <div className="ViewEnquiry-label-value-container">
              <label>Date &amp; Time</label>
              <span className="ViewEnquiry-label-value-colon">:</span>
              <span className="ViewEnquiry-label-value">
                {initialViewValues.dateTime}
              </span>
            </div>
          </div>
        </div>

        <div className="ViewEnquiry-excel-button-container">
          <button className="ViewEnquiry-excel-button">
            <img src={icDownloadToExcel} alt="placeholder" />{" "}
            <span>Download To Excel</span>
          </button>
        </div>

        <table className="ViewEnquiry-table">
          <thead>
            <tr>
              <th>Sl.No.</th>
              <th>Part Number</th>
              <th>Description</th>
              <th>Qty Req</th>
            </tr>
          </thead>
          <tbody>
            {initialViewValues.table_row_values.map((item, index) => {
              return (
                <tr key={index}>
                  {console.log(" enquiry item ", item)}
                  <td>{index + 1}</td>
                  <td>{item.code}</td>
                  <td>{item.description}</td>
                  <td>{item.req_ty}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <BackgroundImage />
      </div>
    </div>
  );
}

export default ViewEnquiry;
