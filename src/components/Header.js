import React, { useContext, useRef } from "react";
import logo from "../img/citrol-logo-transparent.png";
import "../css/Header.css";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LogoutPopup from "../components/LogoutPopup";
import axios from "axios";
import { AppContext } from "../context/AppContext";

function Header() {
  let current_company = localStorage.getItem("current_company");
  let currentCompany;

  const [companyName, setCompanyName] = useState("");

  // call apis in header only after we get login state as true
  // because header is already loaded as it is not a protected route
  // so api gets called even before registation so no company code is received from local storage

  let isUserLoggedInFlag = false;
  const { state } = useContext(AppContext);
  if (state.isAdminLoggedIn) {
    console.log("Context user logged in ");
    isUserLoggedInFlag = true;
  }

  const getHeaderData = () => {
    if (current_company) {
      currentCompany = JSON.parse(current_company);
      setCompanyName(currentCompany.company_name);
      //console.log("Home page company value is  ", currentCompany);

      // get balance and credit
      const apiUrl = `http://185.140.249.224:26/api/CustomerInform/${currentCompany.company_code}`;
      axios
        .get(apiUrl)
        .then((res) => {
          console.log("balance and credit is  ", res.data);
          setCreditAndBalance(res.data);
        })
        .catch((e) => {
          //console.log("something went wrong");
        });

      // get order status count
      const apiUrlOrderStatusCount = `http://185.140.249.224:26/api/orderstatuscount/${currentCompany.company_code}`;
      axios
        .get(apiUrlOrderStatusCount)
        .then((res) => {
          console.log("order and status count is  ", res.data);
          setOrderStatusCount(res.data);
        })
        .catch((e) => {
          //console.log("something went wrong");
        });
    }
  };

  const initialCreditAndBalance = [
    {
      credit_limit: 0,
      balance: 0,
    },
  ];
  const [creditAndBalance, setCreditAndBalance] = useState(
    initialCreditAndBalance
  );

  const [orderStatusCount, setOrderStatusCount] = useState([]);

  const [orderStatusCountObject, setOrderStatusCountObject] = useState({
    delivered: 0,
    draft: 0,
    order_accepted: 0,
    processing: 0,
    under_production: 0,
  });

  const [visibilityOfOrderDropDown, setVisibilityOfOrderDropDown] =
    useState("none");

  const location = useLocation();

  const { pathname } = location;

  const splitLocation = pathname.split("/");

  const [logoutPopupStatus, setlogoutPopupStatus] = useState(false);

  const closeDropDown = (e) => {
    if (e.target.tagName === "A") {
      //console.log("Link clicked");
      setVisibilityOfOrderDropDown("none");
    }
  };

  const showLogoutPopup = () => {
    //console.log("clicked somthing");
    setlogoutPopupStatus(!logoutPopupStatus);
  };

  useEffect(() => {
    console.log("Order status count array change useEffect ", orderStatusCount);

    if (orderStatusCount.length > 0) {
      orderStatusCount.map((item) => {
        if (item.status == "DELIVERED") {
          //console.log("Order status count inside Delivered ", item);

          setOrderStatusCountObject((prev) => ({
            ...prev,
            delivered: item.nos,
          }));
        } else if (item.status == "DRAFT") {
          setOrderStatusCountObject((prev) => ({
            ...prev,
            draft: item.nos,
          }));
        }
        if (item.status == "ORDER ACCEPTED") {
          setOrderStatusCountObject((prev) => ({
            ...prev,
            order_accepted: item.nos,
          }));
        }
        if (item.status == "UNDER PRODUCTION") {
          setOrderStatusCountObject((prev) => ({
            ...prev,
            under_production: item.nos,
          }));
        }
        if (item.status == "PROCESSING") {
          setOrderStatusCountObject((prev) => ({
            ...prev,
            processing: item.nos,
          }));
        }
      });
    } else {
      console.log("Header stat count length else ");
    }
  }, [orderStatusCount]);

  useEffect(() => {
    if (isUserLoggedInFlag) {
      console.log("useEffect user logged in Header.js ");
      getHeaderData();
    }
  }, [isUserLoggedInFlag]);

  return (
    <div className={splitLocation[1] === "" ? "hideLoginContainer" : ""}>
      <div className="Header-logo-container">
        <Link to="/home">
          <img src={logo} className="Header-logo" alt="logo" />
        </Link>
        <div className="Header-balance-statistics-container">
          <div className="Header-statistics-container">
            <div className="Header-statistics-container-child">
              <div className="Header-statistics-container-child-div-1">
                Pending <span>{orderStatusCountObject.draft}</span>
              </div>{" "}
              <div className="Header-statistics-container-child-div-1">
                Accepted <span>{orderStatusCountObject.order_accepted}</span>
              </div>{" "}
              <div>
                Processing <span>{orderStatusCountObject.processing}</span>
              </div>
            </div>
            <div className="Header-statistics-container-second-child">
              <div className="Header-statistics-container-child-div-1">
                {" "}
                Under Production{" "}
                <span>{orderStatusCountObject.under_production}</span>{" "}
              </div>

              <div>
                Delivered <span> {orderStatusCountObject.delivered} </span>{" "}
              </div>
            </div>
          </div>

          <div className="Header-credit-balance-container">
            <label>{companyName}</label>
            <div>
              <span className="Header-balance-label">Credit Limit </span> :{" "}
              <span className="Header-balance-value">
                {creditAndBalance[0] ? creditAndBalance[0].credit_limit : ""}
              </span>{" "}
            </div>
            <div>
              <span className="Header-balance-label">Balance</span> :{" "}
              <span className="Header-balance-value">
                {" "}
                {creditAndBalance[0] ? creditAndBalance[0].balance : ""}
              </span>{" "}
            </div>
          </div>
        </div>
      </div>

      <nav className="Header-nav">
        <ul>
          <li>
            <Link
              to="/home"
              className={splitLocation[1] === "home" ? "active" : ""}
            >
              Home
            </Link>
          </li>
          <li
            onClick={closeDropDown}
            onMouseOver={() => setVisibilityOfOrderDropDown("block")}
            onMouseLeave={() => setVisibilityOfOrderDropDown("none")}
          >
            <Link
              to="/createEnquiry"
              className={
                splitLocation[1] === "createEnquiry"
                  ? "Header-navLink-main-menu active"
                  : "Header-navLink-main-menu"
              }
            >
              Create Enquiry{" "}
            </Link>
          </li>

          <li className="Header-nav-logout" onClick={showLogoutPopup}>
            Logout
          </li>
        </ul>
      </nav>

      {logoutPopupStatus && <LogoutPopup showLogoutPopup={showLogoutPopup} />}
    </div>
  );
}

export default Header;
