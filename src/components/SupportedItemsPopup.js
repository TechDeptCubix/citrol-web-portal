import React from "react";
import "../css/SupportedItemsPopup.css";
import ic_close from "../img/ic_close.png";

function SupportedItemsPopup(props) {
  const { showHideSupportedItemsPopup } = props;

  return (
    <div className="SupportedItemsPopup-main-background">
      <div className="SupportedItemsPopup-container-background">
        <h4>{1632} - Supported items</h4>
        <img
          src={ic_close}
          className="SupportedItemsPopup-close-popup-img"
          onClick={showHideSupportedItemsPopup}
          alt="placeholder"
        />
        <table className="SupportedItemsPopup-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Part Number</th>
              <th>Description</th>
              <th>Brand</th>
              <th>Quantity Required</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{1}</td>
              <td>{"part number"}</td>
              <td>{"description"}</td>
              <td>{"brand"}</td>
              <td>
                <input type="text" name="quantity" />
              </td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
          </tbody>
        </table>

        <button className="SupportedItemsPopup-button">Continue</button>
      </div>
    </div>
  );
}

export default SupportedItemsPopup;
