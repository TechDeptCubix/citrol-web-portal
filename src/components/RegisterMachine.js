import React, { useState, useEffect, useContext } from "react";
import "../css/Login.css";
import logo from "../img/citrol-logo-transparent.png";
import backgroundImageLogin from "../img/backgroundImageLogin.png";
import loginBgImage2 from "../img/login_bg_image-2.jpg";
import cubix_logo from "../img/cubix_logo.png";

import image_1_login from "../img/image_1_login.png";
import image_2_login from "../img/image_2_login.png";
import image_3_login from "../img/image_3_login.png";
import image_4_login from "../img/image_4_login.png";

import image_5_login from "../img/image_5_login.png";
import image_6_login from "../img/image_6_login.png";
import image_7_login from "../img/image_7_login.png";
import image_8_login from "../img/image_8_login.png";
import image_9_login from "../img/image_9_login.png";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

function RegisterMachine(props) {
  const { state, changeCompanyCodeStatus } = useContext(AppContext);
  useEffect(() => {
    console.log("Register Machine component >>>>>>> MOunted ");

    return function cleanup() {
      console.log("Register Machine component <<<<<<< unmounted ");
    };
  }, []);

  const { showLoginPageAfterRegistration } = props;
  const initialValues = {
    company_name: "",
    company_code: "",
    system_key: "",
    error: "",
  };

  const [values, setValues] = useState(initialValues);

  const [isSending, setIsSending] = useState(false);

  const validateInput = () => {
    if (values.company_name.length > 0 && values.company_code.length > 0) {
      setValues({
        ...values,
        error: "",
      });

      return true;
    } else {
      console.log("company_name company_code empty");

      setValues({
        ...values,
        error: "Please enter valid company_name and company_code",
      });

      return false;
    }
  };

  const sendRequest = () => {
    // disable button till success or failure result
    if (isSending) return;

    // update state of Button
    setIsSending(true);
    console.log("button clicked");

    // first validate input values
    validateInput();

    // after values are validated , sendRequest

    if (validateInput()) {
      const apiUrl = `http://185.140.249.224:26/api/RegisterMachine/${values.system_key}/${values.company_code}/${values.company_name}`;

      console.log(
        "validateInput success call api company_name company_code is ",
        values.company_name,
        values.company_code,
        values.system_key
      );

      console.log("API URL is ", apiUrl);

      setValues({
        ...values,
        error: "Registering Machine ....",
      });

      axios
        .get(apiUrl)
        .then((res) => {
          console.log("api response ", res);
          // is return data is as expected "QpwL5tke4Pnpja7X4" changeAdminLoginStatus(true);
          if (res.data.length) {
            console.log("API response array size is ", res.data.length);
            // set both context and localStorage to true ,
            // hence context will go to home asynchronously and will prevent from <ProtectedRoute going back
            // because localStorage may not be set to true because of latency
            // after localStorage value is set even if page refreshed no problem
            // because we have put or condition in protected route
            // any of localStorage or context set to true will prevent <ProtectedRoute from going back

            localStorage.setItem(
              "current_machineguid",
              JSON.stringify({ machineguid: res.data[0].machineguid })
            );

            localStorage.setItem(
              "current_company",
              JSON.stringify({
                company_code: values.company_code,
                company_name: values.company_name,
              })
            );

            // set company code in context because it may be required by every component

            changeCompanyCodeStatus(values.company_code);
            // enable button again
            setIsSending(false);

            // now show Login Compponent
            showLoginPageAfterRegistration();
          } else {
            setValues({
              ...values,
              error:
                "company name or company code or system key is not correct",
            });

            console.log(
              "API response company name or company code or system key is not correct"
            );

            // enable button again
            setIsSending(false);
          }
        })
        .catch((e) => {
          console.log("something went wrong ", e);
          setValues({
            ...values,
            error: "Something went wrong, Please try again ",
          });
          // enable button again
          setIsSending(false);
        });

      // axios
      //   .get(apiUrl)
      //   .then((res) => {
      //     console.log(" dummy api result ", res);
      //   })
      //   .catch((e) => {
      //     console.log("Error in api call ", e);
      //   });
    } else {
      console.log(" validateInput returned false");
      // enable button again
      setIsSending(false);
    }
  };

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  
  const handleEnterKey = (e) =>{
    if(e.keyCode == 13){
      console.log("nextsibling of  e ", e.target.nextSibling);
      e.target.nextSibling.focus();
    }
  }
  return (
    <div className="Login-page-height">
      <div className="Login-main-section">
        <div className="Login-main-section-content">
          <div className="Login-main-login-form-container">
            <Link>
              <img
                src={logo}
                className="Login-company-icon-center"
                alt="logo"
              />
            </Link>
            <h2>The Ultimate Lube</h2>
            <form className="Login-form">
              <input
                type="text"
                name="company_name"
                placeholder="Enter Company Name"
                value={values.company_name}
                onChange={handleInputChange}
                onKeyUp={handleEnterKey}
              />

              <input
                type="text"
                name="company_code"
                placeholder="Enter Company Code"
                value={values.userpassword}
                onChange={handleInputChange}
                onKeyUp={handleEnterKey}
              />

              <input
                type="text"
                name="system_key"
                placeholder="Enter System Key"
                value={values.system_key}
                onChange={handleInputChange}
                onKeyUp={handleEnterKey}
              />

              <input
                type="button"
                value="REGISTER"
                className="Login-submit"
                disabled={isSending}
                onClick={sendRequest}
              />
              <label className="Login-form-error-label">{values.error}</label>
            </form>
          </div>
          <div className="Login-pqp-items-carousel-vehicles">
            <ul>
              <li>
                <div>
                  <img
                    alt="placeholder"
                    src={image_1_login}
                    className="right_side_img_1"
                  />
                  <img
                    alt="placeholder"
                    src={image_2_login}
                    className="right_side_img_2"
                  />
                </div>
              </li>
              <li>
                <div>
                  <img
                    alt="placeholder"
                    src={image_3_login}
                    className="right_side_img_3"
                  />
                  <img
                    alt="placeholder"
                    src={image_4_login}
                    className="right_side_img_4"
                  />
                </div>
              </li>
            </ul>
          </div>

          <div className="Login-pqp-items-carousel">
            <ul>
              <li>
                <div>
                  <img
                    alt="placeholder"
                    src={image_5_login}
                    className="right_side_img_5"
                  />
                </div>
              </li>
              <li>
                <div>
                  <img
                    alt="placeholder"
                    src={image_6_login}
                    className="right_side_img_6"
                  />
                  <img
                    alt="placeholder"
                    src={image_7_login}
                    className="right_side_img_7"
                  />
                </div>
              </li>
              <li>
                <div>
                  <img
                    alt="placeholder"
                    src={image_8_login}
                    className="right_side_img_8"
                  />
                  <img
                    alt="placeholder"
                    src={image_9_login}
                    className="right_side_img_9"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterMachine;
