import React from "react";
import cubix_logo from "../img/cubix_logo.png";
import "../css/Footer.css";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <div>
      <div
        className={
          splitLocation[1] === ""
            ? "hideLoginContainer"
            : "Footer-bottom-strip-content"
        }
      >
        <span>powered by </span>
        <img src={cubix_logo} alt="company logo" />
      </div>
    </div>
  );
}

export default Footer;
