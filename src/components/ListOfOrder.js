import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ListOfEnquiryOrderReturn from "../components/ListOfEnquiryOrderReturn";
import "react-datepicker/dist/react-datepicker.css";

function ListOfOrder() {
  const [listName] = useState("Order");

  return (
    <div>
      <ListOfEnquiryOrderReturn listName={listName} />
      <div className="ListOfEnquiryOrderReturn-table-container">
        <table className="ListOfEnquiryOrderReturn-table">
          <thead>
            <tr>
              <th>Ref.No.</th>
              <th>Order No.</th>
              <th>Created by</th>
              <th>Created On</th>
              <th>Order Status</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{1}</td>
              <td>{1960}</td>
              <td>{"hameed"}</td>
              <td>{"11 May 2021 13:05: 45"}</td>
              <td>{"Being processed"}</td>
              <td>
                <Link to="/viewOrder">View Order</Link>
              </td>
            </tr>
            <tr>
              <td>{2}</td>
              <td>{667}</td>
              <td>{"Ajaz"}</td>
              <td>{"12 May 2021 13:05: 45"}</td>
              <td>{"Delivered"}</td>
              <td>
                <Link to="/returnRequest">Return Request</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListOfOrder;
