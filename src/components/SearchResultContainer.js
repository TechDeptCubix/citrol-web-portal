import axios from "axios";
import { useEffect, useState, useRef } from "react";
import "../css/SearchResultContainer.css";
import item_not_found from "../img/item_not_found.png";

function SearchResultContainer(props) {
  let calledApi = false;

  const liArrayPositionRef = new Array();
  const { handleListItemClick, saveSearchListRef } = props;

  const [searchResultList, setSearchResultList] = useState([]);

  const [internalState, setInternalState] = useState(props.typingCharacter);
  const [previousValue, setPreviousValue] = useState();

  const timeoutRef = useRef(null);

  const callApi = () => {
    calledApi = true;
    const apiUrl = `http://citrolho.dyndns.org:28/api/cubixitems/${internalState}`;

    axios
      .get(apiUrl)
      .then((res) => {
        calledApi = false;
        //console.log("SearchResultContainer item search response is ", res.data);

        setSearchResultList(res.data);
      })
      .catch(() => {
        calledApi = false;
        //console.log(" SearchResultContainer error on item search API");
      });
  };
  function validate() {
    //console.log(
    //  "Validating after 500ms... call Api search text is ",
    // internalState
    //);
    if (calledApi) {
      //console.log("Already called API no need to call again");
    } else {
      callApi();
    }
  }

  if (props.typingCharacter !== previousValue) {
    setInternalState(props.typingCharacter);
    setPreviousValue(props.typingCharacter);
  }

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      if (internalState != "") {
        validate();
      }
    }, 500);
  }, [internalState]);

  useEffect(() => {
    //console.log(
    // "reference list array is SearchResultContainer.js before sending to parent",
    // liArrayPositionRef
    // );

    if (liArrayPositionRef.length > 0) {
      // pass reference array of li elements to parent so on keydown add selectedItem className to current li element
      saveSearchListRef(liArrayPositionRef);
    }
  }, [searchResultList]);

  return (
    <div className="SearchResultContainer-main">
      {
        //after setting state , clear any previous li reference from the array
        liArrayPositionRef.length > 0
          ? (liArrayPositionRef = new Array())
          : null
      }

      <ul>
        {searchResultList.map((item, index) => {
          return (
            <li
              key={index}
              onClick={handleListItemClick}
              data-code={item.code}
              data-group={item.group}
              data-description={item.description}
              data-price={item.price}
              ref={(ref) => liArrayPositionRef.push(ref)}
            >
              <div>{item.code}</div>
              <div>{item.description}</div>
            </li>
          );
        })}
      </ul>
      {/* {console.log(" props.isValidCodeState is ", props.isValidCodeState)} */}
      {props.isValidCodeState ? null : (
        <div className="SearchResultContainer-invalid-code">
          <img src={item_not_found} />
          <span>Invalid Code</span>
        </div>
      )}
    </div>
  );
}

export default SearchResultContainer;
