import React, { useState, useContext, useEffect } from "react";
import "../css/Login.css";
import logo from "../img/citrol-logo-transparent.png";
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
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { Link } from "react-router-dom";

function Login(props) {
  const { showRegistrationPage } = props;
  const initialValues = {
    username: "",
    userpassword: "",
    error: "",
  };

  const [values, setValues] = useState(initialValues);

  const history = useHistory();

  const { state, changeAdminLoginStatus, changeUserNameStatus } =
    useContext(AppContext);

  const [isSending, setIsSending] = useState(false);

  const [isMachineValid, setIsMachineValid] = useState(false);

  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    console.log("Login component >>>>>>> MOunted ");
    // disable button till the machine is validated
    setIsSending(true);

    const validateMachine = () => {
      let current_machineguid = JSON.parse(
        localStorage.getItem("current_machineguid")
      );

      if (JSON.parse(localStorage.getItem("current_company"))) {
        let company_name = JSON.parse(
          localStorage.getItem("current_company")
        ).company_name;
        setCompanyName(company_name);
      }

      let apiUrl;

      if (current_machineguid) {
        apiUrl = `http://185.140.249.224:26/api/ValidMachine/${current_machineguid.machineguid}`;
      }

      console.log("inside validate Machine apiUrl ", apiUrl);
      axios
        .get(apiUrl)
        .then((res) => {
          if (res.data.length > 0) {
            console.log("Yess valid Machine");
            // if success, enable Login Button
            setIsSending(false);
            setIsMachineValid(true);
          } else {
            console.log("machine not validated, Register machine");
            setIsMachineValid(false);
            showRegistrationPage();
          }
        })
        .catch((e) => {
          console.log("Eror while validating machine ", e);
          //if any technical error  refresh the page
        });
    };

    validateMachine();
    return function cleanup() {
      console.log("Login component unmounted ");
    };
  }, [showRegistrationPage]);

  if (isMachineValid) {
    console.log("inside  if (isMachineValid) ");

    if (state.isAdminLoggedIn) {
      console.log("inside  if (state.isAdminLoggedIn)");
      history.push("/home");
    }
  }

  const validateInput = () => {
    if (values.username.length > 0 && values.userpassword.length > 0) {
      setValues({
        ...values,
        error: "",
      });

      return true;
    } else {
      console.log("username password empty");

      setValues({
        ...values,
        error: "Please enter valid username and password",
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
      //get company code from local storage
      let current_company = localStorage.getItem("current_company");
      let currentCompany;
      if (current_company) {
        currentCompany = JSON.parse(localStorage.getItem("current_company"));

        console.log("current_machineguid value is  ", currentCompany);
      }

      console.log(
        "validateInput success call api uname pwd is ",
        values.username,
        values.userpassword
      );
      const apiUrl = `http://185.140.249.224:26/api/validuser/${currentCompany.company_code}/${values.username}/${values.userpassword}`;

      setValues({
        ...values,
        error: "Checking user ....",
      });

      axios
        .get(apiUrl)
        .then((res) => {
          console.log("api response ", res);

          if (res.data.length > 0) {
            // set both context and localStorage to true ,
            // hence context will go to home asynchronously and will prevent from <ProtectedRoute going back
            // because localStorage may not be set to true because of latency
            // after localStorage value is set even if page refreshed no problem
            // because we have put or condition in protected route
            // any of localStorage or context set to true will prevent <ProtectedRoute from going back

            localStorage.setItem(
              "currentStatusLog",
              JSON.stringify({ isAdminLoggedIn: true })
            );

            localStorage.setItem(
              "currentStatusLogUser",
              JSON.stringify({ user: values.username })
            );
            // enable button again
            setIsSending(false);

            changeAdminLoginStatus(true);
            changeUserNameStatus(values.username);
          } else {
            setValues({
              ...values,
              error: "Username or password is not correct",
            });

            console.log("API response username password not correct");

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

  return (
    <div className="Login-page-height">
      <div className="Login-main-section">
        <div className="Login-main-section-content">
          <div className="Login-main-login-form-container">
            
              <img
                src={logo}
                className="Login-company-icon-center"
                alt="logo"
              />
            <h2>The Ultimate Lube</h2>

            <form className="Login-form">
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={values.username}
                onChange={handleInputChange}
              />

              <input
                type="password"
                name="userpassword"
                placeholder="Enter password"
                value={values.userpassword}
                onChange={handleInputChange}
              />
              <input
                type="button"
                value="LOGIN"
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

          <div className="Login-bottom-bar">
            <div className="Login-bottom-strip-content">
              {" "}
              <span>powered by </span>
              <img alt="placeholder" src={cubix_logo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
