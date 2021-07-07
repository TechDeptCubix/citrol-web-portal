import React from "react";
import BackgroundImage from "./BackgroundImage";
import "../css/OrderPlacing.css";

import icDelete from "../img/ic_delete_selected.png";
import icUploadFromExcel from "../img/ic_upload_from_excel.png";
import icDeleteUnavailable from "../img/ic_delete_unavailable.png";
import OrderPlacingSupportedItemsPopup from "./OrderPlacingSupportedItemsPopup";
import ic_info_part_number from "../img/ic_info_part_number.png";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import SuccessPopup from "./SuccessPopup";

function OrderPlacing() {
  const [statusSupportedItemsPopup, setStatusSupportedItemsPopup] =
    useState(false);

  const [showSuccessComponent, setShowSuccessComponent] = useState(false);

  const [popupTextState, setPopupTextState] = useState("");

  const history = useHistory();

  const showHideSupportedItemPopup = () => {
    setStatusSupportedItemsPopup(!statusSupportedItemsPopup);
  };

  const showHideSuccessPopup = (textPopup) => {
    setPopupTextState(textPopup);
    setShowSuccessComponent(!showSuccessComponent);
  };

  const executeOrder = () => {
    history.push("/orderPlacingStatus");
  };

  const infoIconClick = (e) => {
    e.preventDefault();
    e.currentTarget.setAttribute(
      "data-active",
      e.currentTarget.getAttribute("data-active") !== "true"
    );
  };

  return (
    <div>
      <div className="OrderPlacing-main-container">
        <h4>Order Placing</h4>

        <hr className="OrderPlacing-divider" />

        <div className="OrderPlacing-inner-container">
          <div className="OrderPlacing-label-value-container">
            <label>Your reference</label>
            <span className="OrderPlacing-label-value-colon">:</span>
            <span className="OrderPlacing-label-value">1960</span>
          </div>

          <div className="OrderPlacing-label-value-container">
            <label>Enter your Remarks</label>
            <span className="OrderPlacing-label-value-colon">:</span>
            <input name="remarks" type="text" />
          </div>

          <div className="OrderPlacing-label-value-container">
            <label>Date &amp; Time</label>
            <span className="OrderPlacing-label-value-colon">:</span>
            <span className="OrderPlacing-label-value">11/05/2021 9:05:45</span>
          </div>
        </div>

        <div className="OrderPlacing-excel-button-container">
          <button>
            <img alt="placeholder" src={icUploadFromExcel} />{" "}
            <span>Upload From Excel</span>
          </button>
          <button>
            <img alt="placeholder" src={icDeleteUnavailable} />{" "}
            <span>Delete Unavailable</span>
          </button>
          <button>
            <img alt="placeholder" src={icDelete} />{" "}
            <span>Delete Selected</span>
          </button>
        </div>

        <div className="OrderPlacing-table-container">
          <table className="OrderPlacing-table">
            <thead>
              <tr>
                <th rowspan="2">Sl.No.</th>
                <th rowspan="2">Part Number</th>
                <th rowspan="2">Description</th>
                <th rowspan="2">Qty Req</th>
                <th colspan="2" className="OrderPlacing-Qty-Avl-Col">
                  Qty Avl
                </th>
                <th rowspan="2">Supported Items</th>
                <th rowspan="2">Supported Items From</th>
                <th rowspan="2">Order Qty</th>
                <th rowspan="2">Unit Amount</th>
                <th rowspan="2">Amount</th>
                <th rowspan="2">VAT</th>
                <th rowspan="2">Net Amount</th>
                <th rowspan="2">Select</th>
              </tr>
              <tr className="OrderPlacing-Qty-Avl-Row">
                <th className="OrderPlacing-Qty-Avl-Col-Head-First ">
                  <span>WH</span>
                </th>
                <th className="OrderPlacing-Qty-Avl-Col-Head">
                  <span>Branch</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{1}</td>
                <td>
                  <div className="OrderPlacing-part-number-container">
                    <span
                      className="OrderPlacing-part-number-icon-span"
                      onClick={infoIconClick}
                    >
                      {" "}
                      {1632744484}{" "}
                      <img
                        alt="placeholder"
                        src={ic_info_part_number}
                        className="OrderPlacing-part-number-info-icon"
                      />
                      <div class="OrderPlacing-part-number-tooltip">
                        Supported Items Available at best prices Supported Items
                        Available at best prices Supported Items Available at
                        best prices Supported Items Available at best prices
                        Supported Items Available at best prices Supported Items
                        Available at best prices Supported Items Available at
                        best prices Supported Items Available at best prices
                        Supported Items Available at best prices Supported Items
                        Available at best prices Supported Items Available at
                        best prices Supported Items Available at best prices
                        Supported Items Available at best prices Supported Items
                        Available at best prices Supported Items Available at
                        best prices Supported Items Available at best prices
                        Supported Items Available at best prices Supported Items
                        Available at best prices Supported Items Available at
                        best prices Supported Items Available at best prices
                        Supported Items Available at best prices
                      </div>
                    </span>
                  </div>
                </td>
                <td>{"HIGH SENSE ABS SENSORS"}</td>
                <td>{"20"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"5"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"15"}</td>
                <td>
                  {" "}
                  <button
                    className="OrderPlacing-supersed-check-button"
                    onClick={showHideSupportedItemPopup}
                  >
                    Check
                  </button>{" "}
                </td>
                <td></td>
                <td>
                  {" "}
                  <input type="text" name="quantity" />
                </td>
                <td>{"140"}</td>
                <td>{"280"}</td>
                <td>{"14"}</td>
                <td>{"294"}</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>{2}</td>
                <td>{"PQP0612552"}</td>
                <td>{"Ultra Break pad"}</td>
                <td>{"10"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"3"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"2"}</td>
                <td></td>
                <td>{"1010"}</td>
                <td>
                  {" "}
                  <input type="text" name="quantity" />
                </td>
                <td>{"12"}</td>
                <td>{"120"}</td>
                <td>{"6"}</td>
                <td>{"126"}</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>{3}</td>
                <td>{"PQP0612552"}</td>
                <td>{"Ultra Break pad"}</td>
                <td>{"10"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"3"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"2"}</td>
                <td></td>
                <td>{"1010"}</td>
                <td>
                  {" "}
                  <input type="text" name="quantity" />
                </td>
                <td>{"12"}</td>
                <td>{"120"}</td>
                <td>{"6"}</td>
                <td>{"126"}</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>{4}</td>
                <td>{"PQP0612552"}</td>
                <td>{"Ultra Break pad"}</td>
                <td>{"10"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"3"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"2"}</td>
                <td></td>
                <td>{"1010"}</td>
                <td>
                  {" "}
                  <input type="text" name="quantity" />
                </td>
                <td>{"12"}</td>
                <td>{"120"}</td>
                <td>{"6"}</td>
                <td>{"126"}</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>{5}</td>
                <td>{"PQP0612552"}</td>
                <td>{"Ultra Break pad"}</td>
                <td>{"10"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"3"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"2"}</td>
                <td></td>
                <td>{"1010"}</td>
                <td>
                  {" "}
                  <input type="text" name="quantity" />
                </td>
                <td>{"12"}</td>
                <td>{"120"}</td>
                <td>{"6"}</td>
                <td>{"126"}</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>{6}</td>
                <td>{"PQP0612552"}</td>
                <td>{"Ultra Break pad"}</td>
                <td>{"10"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"3"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"2"}</td>
                <td></td>
                <td>{"1010"}</td>
                <td>
                  {" "}
                  <input type="text" name="quantity" />
                </td>
                <td>{"12"}</td>
                <td>{"120"}</td>
                <td>{"6"}</td>
                <td>{"126"}</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>{7}</td>
                <td>{"PQP0612552"}</td>
                <td>{"Ultra Break pad"}</td>
                <td>{"10"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"3"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"2"}</td>
                <td></td>
                <td>{"1010"}</td>
                <td>
                  {" "}
                  <input type="text" name="quantity" />
                </td>
                <td>{"12"}</td>
                <td>{"120"}</td>
                <td>{"6"}</td>
                <td>{"126"}</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>{8}</td>
                <td>{"PQP0612552"}</td>
                <td>{"Ultra Break pad"}</td>
                <td>{"10"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"3"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"2"}</td>
                <td></td>
                <td>{"1010"}</td>
                <td>
                  {" "}
                  <input type="text" name="quantity" />
                </td>
                <td>{"12"}</td>
                <td>{"120"}</td>
                <td>{"6"}</td>
                <td>{"126"}</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>{9}</td>
                <td>{"PQP0612552"}</td>
                <td>{"Ultra Break pad"}</td>
                <td>{"10"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"3"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"2"}</td>
                <td></td>
                <td>{"1010"}</td>
                <td>
                  {" "}
                  <input type="text" name="quantity" />
                </td>
                <td>{"12"}</td>
                <td>{"120"}</td>
                <td>{"6"}</td>
                <td>{"126"}</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>{10}</td>
                <td>{"PQP0612552"}</td>
                <td>{"Ultra Break pad"}</td>
                <td>{"10"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"3"}</td>
                <td className="ViewOrder-Qty-Avl-Col">{"2"}</td>
                <td></td>
                <td>{"1010"}</td>
                <td>
                  {" "}
                  <input type="text" name="quantity" />
                </td>
                <td>{"12"}</td>
                <td>{"120"}</td>
                <td>{"6"}</td>
                <td>{"126"}</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <BackgroundImage />
      </div>

      <div className="OrderPlacing-button-container">
        <button
          className="OrderPlacing-button"
          onClick={() => showHideSuccessPopup("Drafted order")}
        >
          Draft Order{" "}
        </button>{" "}
        <span>Or </span>
        <button className="OrderPlacing-button" onClick={executeOrder}>
          Execute Order
        </button>
      </div>

      {showSuccessComponent && (
        <SuccessPopup
          showHideSuccessPopup={showHideSuccessPopup}
          popupDetail={popupTextState}
        />
      )}
      {statusSupportedItemsPopup && (
        <OrderPlacingSupportedItemsPopup
          showHideSupportedItemPopup={showHideSupportedItemPopup}
        />
      )}
    </div>
  );
}

export default OrderPlacing;
