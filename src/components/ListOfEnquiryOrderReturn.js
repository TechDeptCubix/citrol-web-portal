import React, { useRef } from "react";
import "../css/ListOfEnquiryOrderReturn.css";
import BackgroundImage from "./BackgroundImage";
import ic_calendar from "../img/ic_calendar.png";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ListOfEnquiryOrderReturn(props) {
  const { listName } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const calenderRef = useRef(null);
  const calenderTwoRef = useRef(null);

  return (
    <div>
      <div className="ListOfEnquiryOrderReturn-main-container">
        <h4>List Of {listName}</h4>

        <hr className="ListOfEnquiryOrderReturn-divider" />

        <div className="ListOfEnquiryOrderReturn-inner-container">
          <h4>Search Options</h4>

          <div className="ListOfEnquiryOrderReturn-radio-container">
            <input
              type="radio"
              name="search-option-method"
              value="reference"
              id="reference-radio-btn"
            />
            <label htmlFor="reference-radio-btn">
              Search By Your Reference
            </label>
            <input name="reference-input" type="text" />
          </div>
          <div className="ListOfEnquiryOrderReturn-radio-container">
            <input
              type="radio"
              name="search-option-method"
              value="order-number"
              id="order-number-radio-btn"
              disabled={listName === "Enquiry" ? "disabled" : ""}
            />
            <label
              htmlFor="order-number-radio-btn"
              className={
                listName === "Enquiry"
                  ? "ListOfEnquiryOrderReturn-label-disabled"
                  : ""
              }
            >
              Search By Order Number
            </label>
            <input
              name="order-number-input"
              type="text"
              disabled={listName === "Enquiry" ? "disabled" : ""}
            />
          </div>
          <div className="ListOfEnquiryOrderReturn-radio-container">
            <input
              type="radio"
              name="search-option-method"
              value="enquiry-number"
              id="enquiry-number-radio-btn"
            />
            <label htmlFor="enquiry-number-radio-btn">
              Search By Enquiry Number
            </label>
            <input name="enquiry-number-input" type="text" />
          </div>
          <div className="ListOfEnquiryOrderReturn-radio-container ">
            {/* start of row  */}
            <div className="datePickerRow">
              <input
                type="radio"
                name="search-option-method"
                value="date-range"
                id="date-range-radio-btn"
              />
              <label htmlFor="date-range-radio-btn">
                Search By Date Range / Status
              </label>

              <label className="ListOfEnquiryOrderReturn-from-label">
                From
              </label>

              <DatePicker
                placeholderText="mm/dd/yyyy"
                className="datePickerInputLibrary"
                ref={calenderRef}
                selected={startDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                onChange={(date) => setStartDate(date)}
              />

              <img
                src={ic_calendar}
                className="ListOfEnquiryOrderReturn-dateInput-img"
                onClick={() => {
                  calenderRef.current.setOpen(true);
                }}
                alt="start date"
              />

              <label className="ListOfEnquiryOrderReturn-from-label">To</label>

              <DatePicker
                placeholderText="mm/dd/yyyy"
                className="datePickerInputLibrary"
                ref={calenderTwoRef}
                selected={endDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                onChange={(date) => setEndDate(date)}
              />

              <img
                src={ic_calendar}
                className="ListOfEnquiryOrderReturn-dateInput-img"
                onClick={() => {
                  calenderTwoRef.current.setOpen(true);
                }}
                alt="end date"
              />
            </div>
            {/* end of row  */}
          </div>
          <div className="ListOfEnquiryOrderReturn-select-container">
            <label>Status</label>
            <select name="status-selection">
              <option value="0">Select Status</option>
              <option value="1">All</option>
              <option value="2">Being Processed</option>
              <option value="3">Quote Received</option>
            </select>
          </div>

          <div className="ListOfEnquiryOrderReturn-my-order-container">
            <input
              type="checkbox"
              name="my-orders-only"
              id="my-orders-only-id"
            />
            <label htmlFor="my-orders-only-id">My Orders Only</label>
          </div>

          <button className="ListOfEnquiryOrderReturn-search-button">
            Search Orders
          </button>
        </div>

        <BackgroundImage />
      </div>
    </div>
  );
}

export default ListOfEnquiryOrderReturn;
