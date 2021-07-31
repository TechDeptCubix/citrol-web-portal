import React, { useEffect, useState } from "react";
import "../css/HomePage.css";
import ic_important_notifications from "../img/ic_important_notifications.png";
import ic_offers from "../img/ic_offers.png";
import ic_offer_1 from "../img/ic_no_image.png";
import EnquiryListTable from "./EnquiryListTable";
import axios from "axios";

const Homepage = () => {
  //get company
  let current_company = localStorage.getItem("current_company");
  let currentCompany;
  if (current_company) {
    currentCompany = JSON.parse(current_company);
  }

  const [importantNotifications, setImportantNotifications] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // get important notifcations
    const apiUrlImportantNotification = `http://185.140.249.224:26/api/feeds/messages/${currentCompany.company_code}`;
    axios
      .get(apiUrlImportantNotification)
      .then((res) => {
        if (res.data) {
          console.log("important notifications is", res.data);
          setImportantNotifications(res.data);
        }
      })
      .catch((e) => {
        //console.log("something went wrong");
      });

    // get offers
    const apiUrlOffers = `http://185.140.249.224:26/api/feeds/offers/${currentCompany.company_code}`;
    axios
      .get(apiUrlOffers)
      .then((res) => {
        console.log("offers is  ", res.data);
        setOffers(res.data);
      })
      .catch((e) => {
        //console.log("something went wrong");
      });
  }, []);

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
                {importantNotifications.length > 0 ? (
                  importantNotifications.map((item, index) => {
                    return <li key={index}>{item.message}</li>;
                  })
                ) : (
                  <li>No notifications.</li>
                )}
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
                {offers.length > 0 ? (
                  offers.map((item, index) => {
                    return (
                      <li key={index}>
                        <img src={ic_offer_1} alt="image of offer item" />
                        <div id="HomePage-ulContainer-bottom-shape"></div>
                        <div id="HomePage-ulContainer-upper-shape">
                          <span>{item.message}</span>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li className="no-offers-text">No offers available.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
