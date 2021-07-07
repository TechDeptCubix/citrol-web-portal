import React from "react";
import { Link } from "react-router-dom";
import ListOfEnquiryOrderReturn from "../components/ListOfEnquiryOrderReturn";
import { useState } from "react";

function ListOfEnquiry() {
  const [listName] = useState("Enquiry");

  return (
    <div>
      <ListOfEnquiryOrderReturn listName={listName} />

      <div className="ListOfEnquiryOrderReturn-table-container">
        <table className="ListOfEnquiryOrderReturn-table">
          <thead>
            <tr>
              <th>Ref.No.</th>
              <th>Enquiry No.</th>
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
                <Link to="/viewEnquiry">View Enquiry</Link>
              </td>
            </tr>
            <tr>
              <td>{2}</td>
              <td>{667}</td>
              <td>{"Ajaz"}</td>
              <td>{"12 May 2021 13:05: 45"}</td>
              <td>{"Quote Received"}</td>
              <td>
                <Link to="/orderPlacing">Place Order</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListOfEnquiry;
