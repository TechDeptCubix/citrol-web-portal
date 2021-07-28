import React, { useEffect } from "react";
import icDelete from "../img/ic_delete_selected.png";
import icDownloadToEcel from "../img/ic_download_to_excel.png";
import icAddFromFavourites from "../img/ic_add_from_favourite.png";
import "../css/CreateEnquiry.css";
import SupportedItemsPopup from "./SupportedItemsPopup";
import SuccessPopup from "./SuccessPopup";
import BackgroundImage from "./BackgroundImage";
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import CreateEnquiryTableRow from "./CreateEnquiryTableRow";
import axios from "axios";
import ConfirmationPopup from "./ConfirmationPopup";
import ExcelReader from "./ExcelReader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateEnquiry() {
  let xlsx = require("json-as-xlsx");
  const tbodyRef = useRef();
  const addItemRef = useRef();
  const sentEnquiryRef = useRef();
  const draftEnquiryRef = useRef();
  const totalAmountRef = useRef();
  const inputRef = useRef();
  const [numberORowsInTable, setNumberORowsInTable] = useState(1);
  const [joinTwoArrays, setJoinTwoArrays] = useState(0);
  const isItemCodeValidRef = useRef(false);
  const [isValidCodeState, setIsValidCodeState] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [favouriteItemList, setFavouriteItemList] = useState([]);

  let liRefArray = useRef([]);

  // get company code
  let current_company = localStorage.getItem("current_company");
  let currentCompany;
  if (current_company) {
    currentCompany = JSON.parse(current_company);

    //console.log("current_machineguid value is  ", currentCompany);
  }

  //get username

  const getCookie = (n) => {
    let a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
    return a ? a[1] : "";
  };

  let currentUser;

  if (document.cookie.length != 0) {
    currentUser = JSON.parse(getCookie("citrolLoggedInUser"));
    //console.log("user name from cookie ", currentUser.user);
  } else {
    //console.log("Cookie not available");
  }

  //import the function you want to use
  const { format } = require("date-fns");
  //today's date
  const today = format(new Date(), "dd-MMM-yyyy");
  //console.log("date format today date fns", today);

  //time
  const timeWhenEntryIsMade = format(new Date(), "dd-MMM-yyyy-HH-mm-ss");
  //console.log(timeWhenEntryIsMade);

  // set empty value to all inputs and table row

  let table_row_object_template = {};

  const [isUserSearching, setIsUserSearching] = useState(false);
  const [userSearchText, setUserSearchText] = useState("");
  const [currentCodeInputBox, setCurrentCodeInputBox] = useState("");

  const [pageValues, setPageValues] = useState({
    reference: "",
    remarks: "",
    customer_name: "",
    carrier_type: "",
    cargo_name: "",
    contact_number: "",
    shipping_mark: "",
    table_row_values: [],
  });

  //first time setting an empty row in table, for that we need an empty object, like table_row_object_template
  // then when initial empty state is set using useState , listen to it then use that pageValues.table_row_values.length to set the
  //id of the table template object
  //console.log("about to create table_row_object_template");
  table_row_object_template = {
    id: pageValues.table_row_values.length + 1,
    cmpcode: "",
    ord_Id: "",
    ord_date: "",
    ord_ref: "",
    ord_rem: "",
    code: "",
    description: "",
    qty: "",
    unit_price: "",
    item_amount: 0,
    total_amount: 555,
    account: "",
    c1: "",
    c2: "",
    c3: "",
    c4: "",
    n1: 0,
    n2: 0,
    n3: 0,
    d1: "",
    d2: "",
    supported_items: false,
    supported_items_from: "",
    select_check_box: false,
    is_valid_item: false,
    group: "",
  };

  //console.log(
  // "table_row_object_template is following ",
  //  JSON.stringify(table_row_object_template)
  //);

  //console.log(" pageValues is ", pageValues);

  //check for previous data, if yes fill the empty inputs and table row,
  // after that enable all buttons to enter values to the table
  // else user entered value will also try to set state at the same time so issues may occur

  const location = useLocation();
  const dataFromEnquiry = location.state;

  //console.log("data from enquiry ", dataFromEnquiry);
  // Here's how we'll keep track of our component's mounted state

  const addTableRow = () => {
    setPageValues({
      ...pageValues,
      table_row_values: [
        ...pageValues.table_row_values,
        table_row_object_template,
      ],
    });

    setNumberORowsInTable((prev) => prev + 1); // this for re rendering ui and , execute code inside useEffect , which depends on numberOfRowsInTable
    // so that we could get reference of last created row thereby access child input in it
    // no need to set numberOfRowsInTable state's count as we delete row ,
  };

  useEffect(() => {
    if (tbodyRef.current.lastElementChild) {
      tbodyRef.current.lastElementChild.firstChild.nextSibling.firstChild.firstChild.focus();
    } else {
      //console.log(" no last row child ");
    }
  }, [numberORowsInTable]);

  useEffect(() => {
    if (dataFromEnquiry) {
      //console.log("We are from EnquiryListTable");
      getPreviousDraftItems();
    } else {
      //console.log("data from Create Enquiry null, fresh entry");
      addTableRow();
    }

    //console.log("input ref is ", inputRef);

    return () => "Create Enquiry Unmounted";
  }, []);

  useEffect(() => {
    const keyPressHandler = (e) => {
      if (e.altKey == true && e.keyCode === 65) {
        //console.log("alt + A key pressed emulate add item button ");
        addItemRef.current.click();
      }
      if (e.altKey == true && e.keyCode === 83) {
        //console.log("alt + S key pressed emulate sent enquiry button ");

        sentEnquiryRef.current.click();
      }
      if (e.altKey == true && e.keyCode === 68) {
        //console.log("alt + D key pressed emulate draft button ");

        draftEnquiryRef.current.click();
      }
    };

    document.addEventListener("keydown", keyPressHandler);
    return () => {
      document.removeEventListener("keydown", keyPressHandler);
    };
  }, []);

  const getPreviousDraftItems = () => {
    const getPreviousDraftApiUrL = `http://185.140.249.224:26/api/EnquiryDraft/${dataFromEnquiry.enquiry_number}/${currentCompany.company_code}`; // todo remove hard coded values, in unique id , i have to get it from home page list

    //console.log(
    // "Cubix get previous draft list API URL ",
    //  getPreviousDraftApiUrL
    //);
    axios
      .get(getPreviousDraftApiUrL)
      .then((res) => {
        //console.log(" Cubix Get revious Draft Response Success ", res.data);
        let updatedTableRows = res.data.map((item, index) => {
          let newItemObject = {
            id: index + 1,
            cmpcode: "",
            ord_Id: "",
            ord_date: "",
            ord_ref: "",
            ord_rem: "",
            code: item.code,
            group: item.group,
            description: item.description,
            qty: item.req_ty,
            unit_price: item.unit_Price,
            item_amount: parseFloat((item.req_ty * item.unit_Price).toFixed(2)),
            total_amount: 77,
            account: "",
            c1: "",
            c2: "",
            c3: "",
            c4: "",
            is_valid_item: true,
            n1: 0,
            n2: 0,
            n3: 0,
            d1: "",
            d2: "",
            supported_items: item.supporteditem,
            supported_items_from: "",
            select_check_box: false,
          };

          return newItemObject;
        });

        //console.log(
        // "updatedTableRows after taking value from previous draft ",
        //  updatedTableRows
        // );
        setPageValues({
          ...pageValues,
          reference: dataFromEnquiry.reference,
          remarks: res.data[0].ord_H_remarks,
          table_row_values: updatedTableRows,
        });
        setJoinTwoArrays((prev) => prev + 1);
      })
      .catch((e) => {
        //console.log(" Cubix Get revious Draft Response Failure" + e);
      });
  };

  const [showSupporteditemsComponent, setshowSupporteditemsComponent] =
    useState(false);

  const [popupTextState, setPopupTextState] = useState("");

  const [showSuccessComponent, setshowSuccessComponent] = useState(false);
  const [showConfirmationComponent, setshowConfirmationComponent] =
    useState(false);

  const showHideSupportedItemsPopup = () => {
    setshowSupporteditemsComponent(!showSupporteditemsComponent);
  };

  const showHideSuccessPopup = (textForPopup) => {
    setPopupTextState(textForPopup);
    setshowSuccessComponent(!showSuccessComponent);
  };

  const showHideConfirmationPopup = (textForPopup) => {
    setPopupTextState(textForPopup);
    setshowConfirmationComponent(!showConfirmationComponent);
  };

  const confirmedSentEnquiry = () => {
    setshowConfirmationComponent(!showConfirmationComponent);
    sentEnquiry();
  };
  // these handlers are for remarks and reference input
  const handleInput = (e) => {
    //console.log("value changed in input so rerendering ", e);
    if (e.target.name == "carrier_type" && e.target.value == "container") {
      // if the carrier_type is container then we have to clear out values of cargo_name and contact number
      setPageValues({
        ...pageValues,
        [e.target.name]: e.target.value,
        cargo_name: "",
        contact_number: "",
      });
    } else {
      setPageValues({ ...pageValues, [e.target.name]: e.target.value });
    }
  };

  //these handlers are for inputs from Table row
  const handleInputFromRow = (e) => {
    //console.log("inside handleInputFromRow ", e.target.name, e.target.value);

    isItemCodeValidRef.current = false;
    // get typed characters
    // send to API
    // receive response
    // take item code description from it
    // set to below array

    if (e.target.name == "code") {
      setCurrentCodeInputBox(e.target.id);
      setUserSearchText(e.target.value);

      if (e.target.value == "") {
        setIsUserSearching(false);
      } else {
        setIsUserSearching(true);
      }
    } else {
      setIsUserSearching(false);
    }

    let updatedTableRows = pageValues.table_row_values.map((item) => {
      if (item.id == e.target.id) {
        //console.log(" inside item.id == e.target.id");

        if (e.target.name == "qty") {
          let qtyValue = 0;

          if (isNaN(parseInt(e.target.value, 10))) {
            //console.log("entered thing isNaN");
            qtyValue = "";
          } else {
            //console.log("entered thing not isNaN");
            qtyValue = parseInt(e.target.value, 10);
          }

          //we directly multiplied unitPricevalue because from API we get it without double quotes, so not a string
          return {
            ...item,
            [e.target.name]: qtyValue,
            item_amount: parseFloat((qtyValue * item.unit_price).toFixed(2)),
          };
        } else {
          isItemCodeValidRef.current = false;
          // if code is changed then no need to change amount
          return {
            ...item,
            [e.target.name]: e.target.value,
            is_valid_item: false,
          };
        }
      } else {
        //console.log(" item not matching , e.target.id is", e.target.id);
        return item;
      }
    });

    //console.log(
    // "after total amount value updated json ",
    //  JSON.stringify(updatedTableRows)
    //);

    // after every row is changed ( ie qty is changed so item amount will change) then we will find sum of amounts to get
    // total_amount and set that total_amount to innerHTML of total_amount_value span element
    // then at the time of sentEnquiry method take innerHTML value of total_amount_value span and set to total_amount key of every row
    // in the case of draft we sent 0 for total_amount

    let total_amount_after_changing_quantity = updatedTableRows.reduce(
      (accumulator, currentValue) => {
        if (currentValue.item_amount != null) {
          //console.log(
          //  "current value reducer not null accumulator and current value  ",
          // accumulator,
          // currentValue
          //);
          return accumulator + currentValue.item_amount;
        } else {
          //console.log("current value reducer null ", currentValue);
          return accumulator + 0;
        }
      },
      0
    );

    //console.log("current value reducer ", total_amount_after_changing_quantity);
    totalAmountRef.current.innerHTML =
      total_amount_after_changing_quantity.toFixed(2);

    setPageValues({
      ...pageValues,
      table_row_values: updatedTableRows,
    });
  };

  // handle select ie checkbox  click handler, from table row items

  const handleCheckbox = (e) => {
    let updatedTableRows = pageValues.table_row_values.map((item) => {
      if (item.id == e.target.id) {
        return { ...item, select_check_box: !item.select_check_box };
      } else {
        return item;
      }
    });

    //console.log(
    //  "json stringify after checkbox",
    // JSON.stringify(updatedTableRows)
    // );
    setPageValues({ ...pageValues, table_row_values: updatedTableRows });
  };

  const deleteSelectedTableRows = () => {
    let updatedTableRowsAfterDeletion = pageValues.table_row_values
      .filter((item) => {
        if (!item.select_check_box) {
          return item;
        }
      })
      .map((item, index) => {
        return { ...item, id: index + 1 };
      });

    //console.log(
    //  "json stringify after deleting all selected checkbox",
    // JSON.stringify(updatedTableRowsAfterDeletion)
    // );

    setPageValues({
      ...pageValues,
      table_row_values: updatedTableRowsAfterDeletion,
    });
    setJoinTwoArrays((prev) => prev + 1);
  };

  const draftEnquiry = () => {
    let uniqueKeyForEnquiry =
      currentUser.user + "-" + format(new Date(), "dd-MMM-yyyy-HH-mm-ss");
    let companyCodeForEnquiry = currentCompany.company_code;
    let referenceForEnquiry = pageValues.reference;
    let remarksForEnquiry = pageValues.remarks;

    let carrierTypeDraft = pageValues.carrier_type;
    let cargoNameDraft = pageValues.cargo_name;
    let contactNumberDraft = pageValues.contact_number;
    let shippingmarkDraft = pageValues.shipping_mark;
    let customerName = pageValues.customer_name;

    //console.log("our data before drafting ", pageValues.table_row_values);

    // 2021-08-15T09:11:00.000Z
    // d1 key startDate, we send in year month day format, because backend table column DateTime supports only that format
    // T09:11:00.000Z means Time and Zone

    const postArrayForEnquiryDraft = pageValues.table_row_values
      .filter((item) => item.is_valid_item)
      .map((item) => {
        return {
          cmpcode: companyCodeForEnquiry,
          ord_Id: dataFromEnquiry
            ? dataFromEnquiry.enquiry_number
            : uniqueKeyForEnquiry,
          ord_date: dataFromEnquiry ? dataFromEnquiry.date : today,
          ord_ref: referenceForEnquiry,
          ord_rem: remarksForEnquiry,
          code: item.code,
          description: item.description,
          qty: parseInt(item.qty, 10), // qty: parseInt(item.qty, 10),  10: This is the base number used in mathematical systems. For our use, it should always be 10.
          unit_price: parseInt(item.unit_price, 10),
          account: "",
          c1: currentUser.user,
          c2: carrierTypeDraft,
          c3: cargoNameDraft,
          c4: dataFromEnquiry ? "MODIFY" : "NEW",
          c5: contactNumberDraft,
          c6: shippingmarkDraft,
          c7: customerName,
          n1: 0,
          n2: 0,
          n3: 0,
          d1: startDate,
          d2: "",
        };
      })
      .filter((item) => !(item.code.trim() === "") && item.qty > 0);

    const apiUrL = "http://185.140.249.224:26/api/EnquiryDraft";

    console.log(
      "Jsonified original json",
      JSON.stringify(postArrayForEnquiryDraft)
    );

    axios
      .post(apiUrL, postArrayForEnquiryDraft)
      .then((res) => {
        //console.log(" Cubix Drafting API Response Success ", res.data);
        if ((res.data.result = "Saved")) {
          //console.log("inside res.data.result is Saved");

          showHideSuccessPopup("Drafted enquiry");
        }
      })
      .catch((e) => {
        //console.log("Cubix Drafting API Response Failure" + e);
      });
  };

  const sentEnquiry = () => {
    let uniqueKeyForEnquiry =
      currentUser.user + "-" + format(new Date(), "dd-MMM-yyyy-HH-mm-ss");
    let companyCodeForEnquiry = currentCompany.company_code;
    let referenceForEnquiry = pageValues.reference;
    let remarksForEnquiry = pageValues.remarks;

    let carrierTypeDraft = pageValues.carrier_type;
    let cargoNameDraft = pageValues.cargo_name;
    let contactNumberDraft = pageValues.contact_number;
    let shippingmarkDraft = pageValues.shipping_mark;
    let customerName = pageValues.customer_name;

    const postArrayForEnquiryDraft = pageValues.table_row_values
      .filter((item) => item.is_valid_item)
      .map((item) => {
        return {
          cmpcode: companyCodeForEnquiry,
          ord_Id: dataFromEnquiry ? dataFromEnquiry.enquiry_number : "-99",
          ord_date: dataFromEnquiry ? dataFromEnquiry.date : today,
          ord_ref: referenceForEnquiry,
          ord_rem: remarksForEnquiry,
          code: item.code,
          description: item.description,
          qty: parseInt(item.qty, 10), // qty: parseInt(item.qty, 10),  10: This is the base number used in mathematical systems. For our use, it should always be 10.
          unit_price: item.unit_price,
          account: "",
          c1: currentUser.user,
          c2: carrierTypeDraft,
          c3: cargoNameDraft,
          c4: "NEW",
          c5: contactNumberDraft,
          c6: shippingmarkDraft,
          c7: customerName,
          n1: 0,
          n2: 0,
          n3: 0,
          d1: startDate,
          d2: "",
        };
      })
      .filter((item) => !(item.code.trim() === "") && item.qty > 0);

    const apiUrL = "http://185.140.249.224:26/api/Enquiry";

    //console.log(
    // "Jsonified original json sent enquiry ",
    // JSON.stringify(postArrayForEnquiryDraft)
    //);

    axios
      .post(apiUrL, postArrayForEnquiryDraft)
      .then((res) => {
        //console.log(" Cubix Sent Enquiry API Response Success ", res.data);
        if ((res.data.result = "Saved")) {
          //console.log("inside res.data.result is Saved");
          showHideSuccessPopup("Enquiry Send");
        }
      })
      .catch((e) => {
        //console.log("Cubix Drafting API Response Failure" + e);
      });
  };

  const handleListItemClick = (e) => {
    //console.log(
    //  "selected item from list and current event and event dataset code ",
    //  e.currentTarget,
    //  e.target,
    //  e.target.dataset.code,
    //  currentCodeInputBox
    //);
    setIsUserSearching(false);

    let updatedTableRows = pageValues.table_row_values.map((item) => {
      if (item.id == currentCodeInputBox) {
        //console.log(" Searchlist select inside item.id == e.target.id");

        isItemCodeValidRef.current = true;
        // here we will place value of item code from API instead of e.target.value
        return {
          ...item,
          code: e.currentTarget.dataset.code,
          group: e.currentTarget.dataset.group,
          description: e.currentTarget.dataset.description,
          unit_price: e.currentTarget.dataset.price,
          is_valid_item: true,
        };
      } else {
        //console.log(
        //  " item not matching Searchlist select, e.target.id is",
        //  e.target.id
        // );
        return item;
      }
    });

    //console.log(
    //"selected item from list jsonified",
    // JSON.stringify(updatedTableRows)
    // );

    setPageValues({
      ...pageValues,
      table_row_values: updatedTableRows,
    });
  };

  const handleWholePageClick = () => {
    setIsUserSearching(false);
  };

  let currentSelectedListitemFromSearch = 0;
  const handleKeyboardArrowDown = (e) => {
    if (liRefArray.length > 0) {
      //console.log(
      //  " on down arrow click get reference of next item ",
      // e.keyCode
      // );

      if (e.keyCode == 40) {
        // start downward travel
        if (!(currentSelectedListitemFromSearch < liRefArray.length - 1)) {
          currentSelectedListitemFromSearch = -1;
        }
        currentSelectedListitemFromSearch++;

        for (let i = 0; i < liRefArray.length; i++) {
          liRefArray[i].classList.remove("selectedListItem");
        }
        liRefArray[currentSelectedListitemFromSearch].classList.add(
          "selectedListItem"
        );

        //console.log(
        //  "current currentSelectedListitemFromSearch is ",
        // currentSelectedListitemFromSearch
        //);

        liRefArray[currentSelectedListitemFromSearch].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (e.keyCode == 38) {
        // start upward travel
        //console.log("up arrow key pressed ");
        currentSelectedListitemFromSearch--;
        if (currentSelectedListitemFromSearch < 0) {
          currentSelectedListitemFromSearch = liRefArray.length - 1;
        }

        for (let i = 0; i < liRefArray.length; i++) {
          liRefArray[i].classList.remove("selectedListItem");
        }
        liRefArray[currentSelectedListitemFromSearch].classList.add(
          "selectedListItem"
        );

        //console.log(
        //  "current currentSelectedListitemFromSearch is ",
        //  currentSelectedListitemFromSearch
        // );
        liRefArray[currentSelectedListitemFromSearch].scrollIntoView({
          block: "start",
        });
      } else if (e.keyCode == 13) {
        liRefArray[currentSelectedListitemFromSearch].click();
        // focusing next input of quantiy
        liRefArray[
          currentSelectedListitemFromSearch
        ].parentElement.parentElement.parentElement.parentElement.nextSibling.nextSibling.nextSibling.firstChild.focus();

        // set a state and pass e to that so after we render and come to useEffect is_valid_code will be true
        // if we try to access is_validcode it will show false because of latency
        checkWhetherValidCode(e);
      }
    }
  };

  const handleQtykeyDown = (e) => {
    if (e.keyCode == 13) {
      addItemRef.current.click();

      //console.log(
      // " enter key clickeck inside qty ",
      // e.target.parentElement.parentElement.parentElement.parentElement
      //   .lastElementChild.lastElementChild
      //);
    }
  };

  const saveSearchListRef = (arrayOfRefs) => {
    if (arrayOfRefs) {
      if (arrayOfRefs.length > 0) {
        currentSelectedListitemFromSearch = 0;
        liRefArray = arrayOfRefs;

        // remove selectedListItem class of previously shown list li item
        for (let i = 0; i < liRefArray.length; i++) {
          liRefArray[i].classList.remove("selectedListItem");
        }

        liRefArray[currentSelectedListitemFromSearch].classList.add(
          "selectedListItem"
        );
        //console.log("array of li reference in CreateEnquiry.js ", liRefArray);
      } else {
        //console.log("array from child is empty ");
      }
    } else {
      //console.log("li ref array from child is null");
    }
  };

  const downloadToExcel = () => {
    let uniqueKeyForEnquiry =
      currentUser.user + "-" + format(new Date(), "dd-MMM-yyyy-HH-mm-ss");

    //console.log("before download to excel values", pageValues.table_row_values);
    let referenceForEnquiry = pageValues.reference;
    let remarksForEnquiry = pageValues.remarks;
    let postArrayForDownloadToExcel = pageValues.table_row_values
      .filter((item) => !(item.code.trim() === "") && item.qty > 0)
      .map((item, index) => {
        return {
          sl_no: index + 1,
          ord_Id: dataFromEnquiry
            ? dataFromEnquiry.enquiry_number
            : uniqueKeyForEnquiry,
          ord_date: dataFromEnquiry ? dataFromEnquiry.date : today,
          ord_ref: referenceForEnquiry,
          ord_rem: remarksForEnquiry,
          code: item.code,
          group: item.group,
          description: item.description,
          qty: parseInt(item.qty, 10), // qty: parseInt(item.qty, 10),  10: This is the base number used in mathematical systems. For our use, it should always be 10.
          unit_price: item.unit_price,
          item_amount: item.item_amount,
          account: "",
          c1: currentUser.user,
          c2: "",
          c3: "",
          c4: dataFromEnquiry ? "MODIFY" : "NEW",
          n1: 0,
          n2: 0,
          n3: 0,
          d1: "",
          d2: "",
        };
      });

    if (!postArrayForDownloadToExcel.length > 0) {
      postArrayForDownloadToExcel = [
        {
          sl_no: 1,
          ord_Id: "",
          ord_date: "",
          ord_ref: "",
          ord_rem: "",
          code: "",
          package: "",
          description: "",
          qty: 0, // qty: parseInt(item.qty, 10),  10: This is the base number used in mathematical systems. For our use, it should always be 10.
          unit_price: 0,
          item_amount: 0,
        },
      ];
    }

    let data = [
      {
        sheet: "Create Enquiry",
        columns: [
          // eg "user" in column should be same as user in content else that column will be blank
          { label: "Sl. No.", value: "sl_no" }, // Top level data // value : "user" should be same as content key double quotes required
          { label: "Part Number", value: "code" }, // Run functions
          { label: "Package", value: "group" },
          { label: "Description", value: "description" },
          { label: "Quantity", value: "qty" },
          { label: "Unit Price", value: "unit_price" },
          { label: "Amount", value: "item_amount" }, // Deep props
        ],
        content: postArrayForDownloadToExcel,
      },
    ];

    let settings = {
      fileName: uniqueKeyForEnquiry, // Name of the spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
    };

    xlsx(data, settings); // Will download the excel file
  };

  const getJsonDataFromExcel = (jsonFromExcel) => {
    //console.log("json from excel ", jsonFromExcel);

    let filteredOutEmptyTableRows = pageValues.table_row_values.filter(
      (item) => !(item.code.trim() === "") && item.qty > 0
    );
    let updatedTableRows = jsonFromExcel.map((item, index) => {
      let newItemObject = {
        id: filteredOutEmptyTableRows.length + index + 1,
        cmpcode: "",
        ord_Id: "",
        ord_date: "",
        ord_ref: "",
        ord_rem: "",
        code: item["Part Number"],
        group: item.Package,
        description: item.Description,
        qty: item.Quantity,
        unit_price: item["Unit Price"],
        item_amount: item.Amount,
        account: "",
        c1: "",
        c2: "",
        c3: "",
        c4: "",
        is_valid_item: true,
        n1: 0,
        n2: 0,
        n3: 0,
        d1: "",
        d2: "",
        supported_items: item.supporteditem,
        supported_items_from: "",
        select_check_box: false,
      };

      return newItemObject;
    });
    //console.log("hello updatedTableRows  ", updatedTableRows);

    setPageValues({
      ...pageValues,
      table_row_values: [...filteredOutEmptyTableRows, ...updatedTableRows],
    });

    setJoinTwoArrays((prev) => prev + 1);
  };

  useEffect(() => {
    //console.log("after joining 2 arrays", pageValues.table_row_values);
    // find total and show in html total span
    let total_amount_after_changing_quantity =
      pageValues.table_row_values.reduce((accumulator, currentValue) => {
        if (currentValue.item_amount != null) {
          //console.log("current value reducer not null ", currentValue);
          return accumulator + currentValue.item_amount;
        } else {
          //console.log("current value reducer null ", currentValue);
          return accumulator + 0;
        }
      }, 0);
    //console.log(
    // "current value reducer total [joinTwoArrays]",
    //  total_amount_after_changing_quantity
    // );
    totalAmountRef.current.innerHTML =
      total_amount_after_changing_quantity.toFixed(2);
  }, [joinTwoArrays]);

  const checkWhetherValidCode = (e) => {
    pageValues.table_row_values.map((item) => {
      //console.log("onblur item details", item);
      if (e.target.id == item.id) {
        if (isItemCodeValidRef.current) {
          setIsValidCodeState(true);
        } else {
          setIsValidCodeState(false);
          //console.log("onblur gone out of input now bring focus back to him");
          //e.target.focus();
        }
      }
    });
  };

  const addFromFavourites = () => {
    const apiUrl = `http://185.140.249.224:26/api/cubixitems/favourite/${currentCompany.company_code}/${currentUser.user}`;

    //console.log("api for getting favourites list", apiUrl);

    axios
      .get(apiUrl)
      .then((res) => {
        //console.log("api for getting favourites list DATA SUCCESS ", res.data);
        setFavouriteItemList(res.data);
      })
      .catch(() => {
        //console.log("api for getting favourites list DATA FAILURE ");
      });
  };

  useEffect(() => {
    //console.log(
    // "favouriteItemList state changed length is ",
    //  favouriteItemList.length
    //);
    if (favouriteItemList.length > 0) {
      let filteredOutEmptyTableRows = pageValues.table_row_values.filter(
        (item) => !(item.code.trim() === "")
      );
      let updatedTableRows = favouriteItemList.map((item, index) => {
        let newItemObject = {
          id: filteredOutEmptyTableRows.length + index + 1,
          cmpcode: "",
          ord_Id: "",
          ord_date: "",
          ord_ref: "",
          ord_rem: "",
          code: item.code,
          group: item.group,
          description: item.description,
          qty: 0,
          unit_price: item.price,
          item_amount: 0,
          account: "",
          c1: "",
          c2: "",
          c3: "",
          c4: "",
          is_valid_item: true,
          n1: 0,
          n2: 0,
          n3: 0,
          d1: "",
          d2: "",
          supported_items: "",
          supported_items_from: "",
          select_check_box: false,
        };

        return newItemObject;
      });
      //console.log("hello updatedTableRows  ", updatedTableRows);

      setPageValues({
        ...pageValues,
        table_row_values: [...filteredOutEmptyTableRows, ...updatedTableRows],
      });

      setJoinTwoArrays((prev) => prev + 1);
    }
  }, [favouriteItemList]);

  return (
    <div onClick={handleWholePageClick}>
      <div className="CreateEnquiry-main-container">
        <h4>Create Enquiry</h4>
        <hr className="CreateEnquiry-divider" />

        <div className="CreateEnquiry-input-fields-container">
          <label>Your Reference</label>
          <input
            name="reference"
            type="text"
            value={pageValues.reference}
            onChange={handleInput}
            ref={inputRef}
          />
          <label>Remarks</label>
          <input
            className="remarks-input"
            name="remarks"
            type="text"
            onChange={handleInput}
            value={pageValues.remarks}
          />
          <label>Customer Name</label>
          <input
            className="remarks-input"
            name="customer_name"
            type="text"
            onChange={handleInput}
            value={pageValues.customer_name}
          />
          <br />
          <div className="second-row-date-input-label">
            <label>Date</label>

            <DatePicker
              dateFormat="dd/MM/yyyy"
              className="datePickerInputLibrary"
              selected={startDate}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              onChange={(date) => setStartDate(date)}
            />

            <label>Mark</label>
            <input
              name="shipping_mark"
              type="text"
              onChange={handleInput}
              value={pageValues.shipping_mark}
            />
          </div>
        </div>

        <div
          className="CreateEnquiry-carrier-type-container"
          onChange={handleInput}
        >
          <div>
            <input
              type="radio"
              value="container"
              name="carrier_type"
              id="carrierr-type-radio-1"
            />
            <label htmlFor="carrierr-type-radio-1">Container</label>
          </div>
          <div>
            <input
              type="radio"
              value="cargo"
              name="carrier_type"
              id="carrierr-type-radio-2"
            />
            <label htmlFor="carrierr-type-radio-2">Cargo</label>
          </div>
        </div>

        {pageValues.carrier_type == "cargo" && (
          <div className="CreateEnquiry-cargo-details-container">
            <label> Cargo Name </label>
            <input
              type="text"
              value={pageValues.cargo_name}
              name="cargo_name"
              onChange={handleInput}
            />
            <label className="contact-number-label"> Contact Number </label>
            <input
              type="number"
              value={pageValues.contact_number}
              name="contact_number"
              onChange={handleInput}
            />
          </div>
        )}

        <div className="CreateEnquiry-excel-button-container">
          <button
            onClick={addFromFavourites}
            className="add-from-favourite-button"
          >
            <img alt="add from favourites" src={icAddFromFavourites} />{" "}
            <span>Add From Favourites</span>
          </button>

          <ExcelReader getJsonDataFromExcel={getJsonDataFromExcel} />

          <button onClick={downloadToExcel}>
            <img alt="download to excel" src={icDownloadToEcel} />{" "}
            <span>Download To Excel</span>
          </button>

          <button onClick={deleteSelectedTableRows}>
            <img alt="delete selected" src={icDelete} />{" "}
            <span>Delete Selected</span>
          </button>
        </div>

        <div className="CreateEnquiry-table-container">
          <table className="CreateEnquiry-table">
            <thead>
              <tr>
                <th>Sl.No.</th>
                <th>Part Number</th>
                <th>Package</th>
                <th>Description</th>
                <th className="Create-enquiry-qty">Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody ref={tbodyRef}>
              {pageValues.table_row_values != null
                ? pageValues.table_row_values.map((item, index) => {
                    return (
                      <CreateEnquiryTableRow
                        key={index}
                        rowValues={item}
                        showHideSupportedItemsPopup={
                          showHideSupportedItemsPopup
                        }
                        handleInputFromRow={handleInputFromRow}
                        handleCheckbox={handleCheckbox}
                        isUserSearching={isUserSearching}
                        currentCodeInputBox={currentCodeInputBox}
                        typingCharacter={userSearchText}
                        handleKeyboardArrowDown={handleKeyboardArrowDown}
                        handleQtykeyDown={handleQtykeyDown}
                        saveSearchListRef={saveSearchListRef}
                        handleListItemClick={handleListItemClick}
                        checkWhetherValidCode={checkWhetherValidCode}
                        isValidCodeState={isValidCodeState}
                      />
                    );
                  })
                : "zero array size length"}
            </tbody>
          </table>
          <div className="CreateEnquiry-total-amount-container">
            <span className="CreateEnquiry-total-label">Total</span>{" "}
            <span
              className="CreateEnquiry-total-value"
              ref={totalAmountRef}
            ></span>
          </div>
        </div>
        <button
          className="CreateEnquiry-add-another-item-button"
          onClick={addTableRow}
          ref={addItemRef}
        >
          <span className="CreateEnquiry-add-another-item-button-span">A</span>
          dd Another Item
        </button>

        {/* <p>{JSON.stringify(pageValues)}</p> */}

        <BackgroundImage />
      </div>

      <div className="CreateEnquiry-enquiry-button-container">
        <button
          className="CreateEnquiry-button"
          onClick={draftEnquiry}
          ref={draftEnquiryRef}
        >
          <span className="CreateEnquiry-button-span">D</span>raft Enquiry
        </button>{" "}
        <span>Or </span>
        <button
          className="CreateEnquiry-button"
          onClick={() => showHideConfirmationPopup("Sent Enquiry")}
          ref={sentEnquiryRef}
        >
          <span className="CreateEnquiry-button-span">S</span>ent Enquiry
        </button>
      </div>

      {showSupporteditemsComponent && (
        <SupportedItemsPopup
          showHideSupportedItemsPopup={showHideSupportedItemsPopup}
        />
      )}

      {showConfirmationComponent && (
        <ConfirmationPopup
          showHideConfirmationPopup={showHideConfirmationPopup}
          confirmedSentEnquiry={confirmedSentEnquiry}
          popupDetail={popupTextState}
        />
      )}

      {showSuccessComponent && (
        <SuccessPopup
          showHideSuccessPopup={showHideSuccessPopup}
          popupDetail={popupTextState}
        />
      )}
    </div>
  );
}

export default CreateEnquiry;
