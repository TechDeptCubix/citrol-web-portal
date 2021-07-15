import React from "react";
import logo from "../img/citrol-logo-transparent.png";
import "../css/Header.css";
import { useLocation, Link } from "react-router-dom";
import ic_dropdown_arrow from "../img/ic_dropdown_arrow.png";
import { useState, useEffect } from "react";
import LogoutPopup from "../components/LogoutPopup";
import axios from "axios";

function Header() {
  //get username
  let current_company = localStorage.getItem("current_company");
  let currentCompany;
  if (current_company) {
    currentCompany = JSON.parse(current_company);

    console.log("current_machineguid value is  ", currentCompany);
  }
  const initialCreditAndBalance = [
    {
      credit_limit: 5,
      balance: 5,
    },
  ];
  const [creditAndBalance, setCreditAndBalance] = useState(
    initialCreditAndBalance
  );
  const [visibilityOfOrderDropDown, setVisibilityOfOrderDropDown] =
    useState("none");

  const location = useLocation();

  const { pathname } = location;

  const splitLocation = pathname.split("/");

  const [logoutPopupStatus, setlogoutPopupStatus] = useState(false);

  const closeDropDown = (e) => {
    if (e.target.tagName === "A") {
      console.log("Link clicked");
      setVisibilityOfOrderDropDown("none");
    }
  };

  const showLogoutPopup = () => {
    console.log("clicked somthing");
    setlogoutPopupStatus(!logoutPopupStatus);
  };

  useEffect(() => {
    // get company code from local storage , then call API using that code

    let current_company_local = localStorage.getItem("current_company");
    let currentCompany;
    if (current_company_local) {
      currentCompany = JSON.parse(current_company_local);

      console.log("Home page company value is  ", currentCompany);

      const apiUrl = `http://185.140.249.224:26/api/CustomerInform/${currentCompany.company_code}`;
      axios
        .get(apiUrl)
        .then((res) => {
          console.log("balance and credit is  ", res.data);
          setCreditAndBalance(res.data);
        })
        .catch((e) => {
          console.log("something went wrong");
        });
    }
  }, []);

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
                Pending <span>{45}</span>
              </div>{" "}
              <div className="Header-statistics-container-child-div-1">
                Accepted <span>{22}</span>
              </div>{" "}
              <div>
                Processing <span>{56}</span>
              </div>
            </div>
            <div className="Header-statistics-container-second-child">
              <div className="Header-statistics-container-child-div-1">
                {" "}
                Under Production <span>{45}</span>{" "}
              </div>

              <div>
                Delivered <span>{22}</span>{" "}
              </div>
            </div>
          </div>

          <div className="Header-credit-balance-container">
            <label>{currentCompany ? currentCompany.company_name : ""}</label>
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
