import React, { useEffect, useState } from "react";
import "../css/ViewEnquiry.css";
import BackgroundImage from "./BackgroundImage";
import icDownloadToExcel from "../img/ic_download_to_excel.png";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ViewDraft() {
  let xlsx = require("json-as-xlsx");
  const location = useLocation();
  const dataFromEnquiry = location.state;
  const [initialViewValues, setInitialViewValues] = useState({
    reference: "",
    remarks: "",
    dateTime: "",
    draftNo: "",
    table_row_values: [],
  });

  console.log("data from enquiry ", dataFromEnquiry);

  //get username
  let current_user = localStorage.getItem("currentStatusLogUser");
  let currentUser;
  if (current_user) {
    currentUser = JSON.parse(current_user);

    console.log("current_machineguid value is  ", currentUser);
  }

  //import the function you want to use
  const { format } = require("date-fns");
  //today's date
  const today = format(new Date(), "dd-MMM-yyyy");
  console.log(today);

  useEffect(() => {
    const apiUrl = `http://185.140.249.224:26/api/EnquiryDraft/${dataFromEnquiry.enquiryNumber}/${dataFromEnquiry.companyCodeForView}`;

    console.log("API View Draft ",apiUrl );
    
    axios
      .get(apiUrl)
      .then((res) => {
        console.log("ViewEnquiry API response success ", res.data);
        setInitialViewValues({
          ...initialViewValues,
          reference: res.data[0].ord_H_ref,
          remarks: res.data[0].ord_H_remarks,
          dateTime: res.data[0].ord_H_datetime,
          draftNo: res.data[0].ord_H_ID,
          table_row_values: res.data,
        });
      })
      .catch((e) => {
        console.log("ViewEnquiry API response error ", e);
      });
  }, []);

  const downloadToExcel = () => {
    let uniqueKeyForEnquiry =
      currentUser.user + "-" + format(new Date(), "dd-MMM-yyyy-HH-mm-ss");

    console.log(
      "before download to excel values in ViewDraft",
      initialViewValues.table_row_values
    );
    let referenceForEnquiry = initialViewValues.reference;
    let remarksForEnquiry = initialViewValues.remarks;
    let postArrayForDownloadToExcel = initialViewValues.table_row_values
      .filter((item) => !(item.code.trim() === "") && item.req_ty > 0)
      .map((item, index) => {
        return {
          sl_no: index + 1,
          ord_Id: dataFromEnquiry
            ? dataFromEnquiry.enquiry_number
            : uniqueKeyForEnquiry,
          ord_date: dataFromEnquiry
            ? dataFromEnquiry.date
            : format(new Date(), "dd-MMM-yyyy"),
          ord_ref: referenceForEnquiry,
          ord_rem: remarksForEnquiry,
          code: item.code,
          description: item.description,
          qty: item.req_ty, // qty: parseInt(item.qty, 10),  10: This is the base number used in mathematical systems. For our use, it should always be 10.
          unit_price: item.unit_Price,
          item_amount: item.req_ty * item.unit_Price,
          account: "",
          c1: currentUser.user,
          c2: "",
          c3: "",
          c4: dataFromEnquiry ? "MODIFY" : "NEW",
          n1: 0,
          n2: 0,
          n3: 0,
          d1: "",
          d2: "",
        };
      });

    console.log(
      "before download to excel values postArrayForDownloadToExcel in ViewDraft",
      postArrayForDownloadToExcel
    );

    if (!postArrayForDownloadToExcel.length > 0) {
      postArrayForDownloadToExcel = [
        {
          sl_no: 1,
          ord_Id: "",
          ord_date: "",
          ord_ref: "",
          ord_rem: "",
          code: "",
          description: "",
          qty: 0, // qty: parseInt(item.qty, 10),  10: This is the base number used in mathematical systems. For our use, it should always be 10.
          unit_price: 0,
          item_amount: 0,
        },
      ];
    }

    let data = [
      {
        sheet: "View Draft",
        columns: [
          // eg "user" in column should be same as user in content else that column will be blank
          { label: "Sl. No.", value: "sl_no" }, // Top level data // value : "user" should be same as content key double quotes required
          { label: "Part Number", value: "code" }, // Run functions
          { label: "Description", value: "description" },
          { label: "Quantity", value: "qty" },
          { label: "Unit Price", value: "unit_price" },
          { label: "Amount", value: "item_amount" },
        ],
        content: postArrayForDownloadToExcel,
      },
    ];

    let settings = {
      fileName: uniqueKeyForEnquiry, // Name of the spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
    };

    xlsx(data, settings); // Will download the excel file
  };

  return (
    <div>
      <div className="ViewEnquiry-main-container">
        <h4>View Enquiry</h4>

        <hr className="ViewEnquiry-divider" />

        <div className="ViewEnquiry-inner-container">
          <div className="ViewEnquiry-left-container">
            <div className="ViewEnquiry-label-value-container">
              <label>Draft No.</label>
              <span className="ViewEnquiry-label-value-colon">:</span>
              <span className="ViewEnquiry-label-value">
                {initialViewValues.draftNo}
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
          <button
            className="ViewEnquiry-excel-button"
            onClick={downloadToExcel}
          >
            <img src={icDownloadToExcel} alt="placeholder" />{" "}
            <span>Download To Excel</span>
          </button>
        </div>

        <table className="ViewEnquiry-table">
          <thead>
            <tr>
              <th>Sl.No.</th>
              <th>Part Number</th>
              <th>Package</th>
              <th>Description</th>
              <th>Qty Req</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {initialViewValues.table_row_values.map((item, index) => {
              return (
                <tr key={index}>
                  {console.log(" enquiry item ", item)}
                  <td>{index + 1}</td>
                  <td>{item.code}</td>
                  <td>{item.group}</td>
                  <td>{item.description}</td>
                  <td>{item.req_ty}</td>
                  <td>{item.unit_Price}</td>
                  <td>{(item.unit_Price * item.req_ty).toFixed(2)}</td>
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

export default ViewDraft;
