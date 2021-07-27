import React, { useEffect, useState } from "react";
import RegisterMachine from "./RegisterMachine";
import Login from "./Login";

function StartingPage() {
  // first check , is there a key named machineguid is present in local storage
  // automatic event on page load so use --> useEffect

  const [showRegisterMachine, setShowRegisterMachine] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  // component did mount
  useEffect(() => {
    let currentLocalValues = localStorage.getItem("current_machineguid");
    if (currentLocalValues) {
      let machineguid = JSON.parse(localStorage.getItem("current_machineguid"));

      //console.log("current_machineguid value is  ", machineguid);

      setShowLogin(true);
    } else {
      //console.log("currentLocalValues null ");
      setShowRegisterMachine(true);
    }
  }, []);

  // if machineguid present

  // call API - Validate Machine

  // if we receive company name , company code
  // then set those to local storage
  // then show Login Component

  // else
  // call API - Register Machine

  // else

  // show Register Machine Component ,,on Register  call API - Register Machine

  // if we get a response with a key named machineguid, save it to local storage
  // then show Login Component

  // else if an empty array comes, that means Registration is not success

  const showLoginPageAfterRegistration = () => {
    //console.log("showLoginPageAfterRegistration called ");
    setShowRegisterMachine(false);
    setShowLogin(true);
  };

  const showRegistrationPage = () => {
    //console.log("showRegistrationPage called ");
    setShowLogin(false);
    setShowRegisterMachine(true);
  };
  return (
    <div>
      {showRegisterMachine && (
        <RegisterMachine
          showLoginPageAfterRegistration={showLoginPageAfterRegistration}
        />
      )}
      {showLogin && <Login showRegistrationPage={showRegistrationPage} />}
    </div>
  );
}

export default StartingPage;
