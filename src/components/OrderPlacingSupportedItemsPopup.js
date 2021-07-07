import React from "react";
import "../css/OrderPlacingSupportedItemsPopup.css";
import ic_close from "../img/ic_close.png";

function OrderPlacingSupportedItemsPopup(props) {
  const { showHideSupportedItemPopup } = props;

  return (
    <div className="OrderPlacingSupportedItemsPopup-main-background">
      <div className="OrderPlacingSupportedItemsPopup-container-background">
        <h4>{1632} - Supported items</h4>
        <img
          src={ic_close}
          className="OrderPlacingSupportedItemsPopup-close-popup-img"
          onClick={showHideSupportedItemPopup}
          alt="placeholder"
        />
        <table className="OrderPlacing-table">
          <thead>
            <tr>
              <th rowspan="2">Sl.No.</th>
              <th rowspan="2">Part Number</th>
              <th rowspan="2">Description</th>
              <th rowspan="2">Brand</th>
              <th rowspan="2">Qty Req</th>
              <th colspan="2" className="OrderPlacing-Qty-Avl-Col">
                Qty Avl
              </th>

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
              <td>{1632}</td>
              <td>{"HIGH SENSE ABS SENSORS"}</td>
              <td>{"PQP"}</td>
              <td>{"22"}</td>
              <td className="ViewOrder-Qty-Avl-Col">{"5"}</td>
              <td className="ViewOrder-Qty-Avl-Col">{"15"}</td>

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
              <td>{"PQP"}</td>
              <td>{"223"}</td>
              <td className="ViewOrder-Qty-Avl-Col">{"3"}</td>
              <td className="ViewOrder-Qty-Avl-Col">{"2"}</td>

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

        <button
          className="OrderPlacingSupportedItemsPopup-button"
          onClick={showHideSupportedItemPopup}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default OrderPlacingSupportedItemsPopup;
