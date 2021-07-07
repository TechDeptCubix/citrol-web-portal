import React from "react";
import { Link } from "react-router-dom";
import ListOfEnquiryOrderReturn from "../components/ListOfEnquiryOrderReturn";
import { useState } from "react";

function ListOfReturn() {
  const [listName] = useState("Return");

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
              <td>{"Accepted"}</td>
              <td>
                <Link to="/viewReturnRequest">View Return Request</Link>
              </td>
            </tr>
            <tr>
              <td>{2}</td>
              <td>{667}</td>
              <td>{"Ajaz"}</td>
              <td>{"12 May 2021 13:05: 45"}</td>
              <td>{"Rejected"}</td>
              <td>
                <Link to="/viewReturnRequest">View Return Request</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListOfReturn;
