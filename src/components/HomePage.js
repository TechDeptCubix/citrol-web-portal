import React, { useEffect, useState } from "react";
import "../css/HomePage.css";
import ic_important_notifications from "../img/ic_important_notifications.png";
import ic_offers from "../img/ic_offers.png";
import ic_offer_1 from "../img/ic_offer_1.png";
import ic_offer_2 from "../img/ic_offer_2.png";
import EnquiryListTable from "./EnquiryListTable";

const Homepage = () => {
  return (
    <div>
      <div className="Homepage-main-container">
        <div className="HomePage-left-container">
          <div className="HomePage-left-container-content">
            <h4>Previous Requests</h4>

            <EnquiryListTable />
          </div>
        </div>

        <div className="HomePage-right-container">
          <div className="HomePage-important-notifications-container">
            <div className="Homepage-important-notifications-container-header">
              <img
                src={ic_important_notifications}
                alt="important notifications"
              />{" "}
              Important Notifications
            </div>
            <div className="HomePage-ulContainer">
              <ul>
                <li>
                  Delivery for item “DK-12 ABS SENSORS” will be delayed by 1 day
                </li>
                <li>Requested items J2 SUSPENSION back in stock</li>
                <li>Requested items K5 SUSPENSION back in stock</li>
              </ul>
            </div>
          </div>

          <div className="HomePage-offers-container">
            <div className="Homepage-important-notifications-container-header">
              <img src={ic_offers} alt="offers" />
              Offers For You
            </div>
            <div className="HomePage-ulContainer">
              <ul>
                <li>
                  <img src={ic_offer_1} alt="offer 1" />
                  <div id="HomePage-ulContainer-bottom-shape"></div>
                  <div id="HomePage-ulContainer-upper-shape">
                    <span>
                      20% off on compressors dfgsh dr dty dy dt y bdbb bfb
                    </span>
                  </div>
                </li>
                <li>
                  <img src={ic_offer_2} alt="offer 2" />
                  <div id="HomePage-ulContainer-bottom-shape"></div>
                  <div id="HomePage-ulContainer-upper-shape">
                    <span>Get disk brakes at unbelievable prices</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
