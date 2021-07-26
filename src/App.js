import React, {useContext} from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import CreateEnquiry from "./components/CreateEnquiry";
import ListOfEnquiry from "./components/ListOfEnquiry";
import ListOfOrder from "./components/ListOfOrder";
import ListOfReturn from "./components/ListOfReturn";
import ViewReturnRequest from "./components/ViewReturnRequest";
import ViewOrder from "./components/ViewOrder";
import ViewDraft from "./components/ViewDraft";
import ViewEnquiry from "./components/ViewEnquiry";
import ReturnRequest from "./components/ReturnRequest";
import OrderPlacing from "./components/OrderPlacing";
import OrderPlacingStatus from "./components/OrderPlacingStatus";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ViewOrderStatistics from "./components/ViewOrderStatistics";
import Contact from "./components/Contact";
import Help from "./components/Help";
import AppContextProvider from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";
import StartingPage from "./components/StartingPage";

function App() {


  return (
    // changed <Router /> to <Router basename={process.env.PUBLIC_URL}>
    // because when hosted on gh-pages links like this working only in https://techdeptcubix.github.io/viewOrderStatistics
    // not on  https://techdeptcubix.github.io/premier-web-portal/viewOrderStatistics

    <Router basename={process.env.PUBLIC_URL}>
      <AppContextProvider >

      {console.log("App.js loaded")}
      <Header />
        
        <Route path="/" exact component={StartingPage} />

        <ProtectedRoute path="/home" exact component={HomePage} />

        <ProtectedRoute path="/createEnquiry" component={CreateEnquiry} />
        <ProtectedRoute path="/listOfEnquiry" component={ListOfEnquiry} />
        <ProtectedRoute path="/listOfOrder" component={ListOfOrder} />
        <ProtectedRoute path="/listOfReturn" component={ListOfReturn} />
        <ProtectedRoute
          path="/viewReturnRequest"
          component={ViewReturnRequest}
        />
        <ProtectedRoute path="/viewOrder" component={ViewOrder} />
        <ProtectedRoute path="/viewDraft" component={ViewDraft} />
        <ProtectedRoute path="/viewEnquiry" component={ViewEnquiry} />
        <ProtectedRoute path="/returnRequest" component={ReturnRequest} />
        <ProtectedRoute path="/orderPlacing" component={OrderPlacing} />
        <ProtectedRoute
          path="/orderPlacingStatus"
          component={OrderPlacingStatus}
        />
        <ProtectedRoute
          path="/viewOrderStatistics"
          component={ViewOrderStatistics}
        />
        <ProtectedRoute path="/help" component={Help} />
        <ProtectedRoute path="/contact" component={Contact} />

        <Footer />
      </AppContextProvider>
    </Router>
  );
}

export default App;
